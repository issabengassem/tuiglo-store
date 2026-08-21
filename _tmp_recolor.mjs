import sharp from "sharp";

const [, , inputPath, targetHex, outputPath, ...flags] = process.argv;
if (!inputPath || !targetHex || !outputPath) {
  console.error("usage: node _tmp_recolor.mjs <input.png> <#targetHex> <output.png> [--no-hw] [--no-red]");
  process.exit(1);
}
// --no-hw: skip dark-pixel "hardware" detection entirely (treat every
// non-transparent, non-white/red/gold pixel as fabric). Use for products
// where there's no separately-colored hardware to protect and the run-length
// heuristic misfires on fine stitching/texture (scattered dark patches
// instead of clean wide runs), producing a blotchy recolor.
const skipHardware = flags.includes("--no-hw");
// --no-red: skip red-branding protection. The red-hue window is meant to
// protect logo text/outlines, but a PINK or RED fabric's own hue falls in
// that same window — without this flag the entire fabric would get
// "protected" (left unrecolored) instead of shifted to the target hue.
const skipRed = flags.includes("--no-red");

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) {
    h = 0; s = 0;
  } else {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s, l, max, min, d };
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r1, g1, b1;
  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

const target = hexToRgb(targetHex);
const targetHsl = rgbToHsl(target.r, target.g, target.b);

const img = sharp(inputPath).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// A dark pixel (maxC<60) is only real "hardware" (zipper/cord/handle/logo
// backing) if it's part of a NARROW feature. Shadowed fabric (e.g. the
// bag's darker base panel) can get just as dark, but forms a WIDE
// contiguous band across a row — recoloring must not skip it. Measure, for
// every pixel, the width of the contiguous horizontal run of dark pixels it
// belongs to, so classify() can tell "thin hardware" from "broad shadow".
const RUN_THRESHOLD = 200;
const darkRunWidth = new Uint16Array(width * height);
for (let y = 0; y < height; y++) {
  let runStart = -1;
  for (let x = 0; x <= width; x++) {
    const idx = y * width + x;
    const i = idx * channels;
    const isDark = x < width && data[i + 3] > 0 && Math.max(data[i], data[i + 1], data[i + 2]) < 60;
    if (isDark) {
      if (runStart === -1) runStart = x;
    } else if (runStart !== -1) {
      const runLen = Math.min(x, width) - runStart;
      for (let rx = runStart; rx < x; rx++) darkRunWidth[y * width + rx] = Math.min(runLen, 65535);
      runStart = -1;
    }
  }
}

function classify(r, g, b, a, runWidth) {
  if (a === 0) return "transparent";
  const maxC = Math.max(r, g, b), minC = Math.min(r, g, b);
  const chroma = maxC - minC;
  const { h, s, l } = rgbToHsl(r, g, b);
  if (maxC < 60) return (skipHardware || runWidth >= RUN_THRESHOLD) ? "fabric" : "hardware";
  if (maxC > 205 && chroma < 25) return "white";
  if (!skipRed && (h <= 20 || h >= 335) && s > 0.35 && l > 0.25 && l < 0.75) return "red";
  // Gold/brass hardware (e.g. a metal badge) — a fixed brand-color accent
  // that should stay gold in every fabric-color variant, not get recolored.
  if (h >= 15 && h <= 65 && s > 0.15) return "gold";
  return "fabric";
}

// Pass 1: find the fabric's average lightness (the "flat" baseline tone under
// this lighting), so pass 2 can shift the baseline to the target's lightness
// while preserving each pixel's shading delta (fold highlights/shadows).
let sumL = 0, fabricCount = 0;
for (let i = 0, p = 0; i < data.length; i += channels, p++) {
  const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
  if (classify(r, g, b, a, darkRunWidth[p]) !== "fabric") continue;
  sumL += rgbToHsl(r, g, b).l;
  fabricCount++;
}
const avgL = fabricCount > 0 ? sumL / fabricCount : 0.5;

let recoloredCount = 0, protectedHardware = 0, protectedWhite = 0, protectedRed = 0, protectedGold = 0, transparentCount = 0;

for (let i = 0, p = 0; i < data.length; i += channels, p++) {
  const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
  const cls = classify(r, g, b, a, darkRunWidth[p]);
  if (cls === "transparent") { transparentCount++; continue; }
  if (cls === "hardware") {
    // At this resolution the zipper cord is only a few px wide, so many of
    // its "dark" pixels are anti-aliased blends with the fabric hue next to
    // them (still <60 maxC, but tinted with the fabric's color). Leaving
    // those untouched bakes a fixed fabric-colored fringe into every color
    // variant. Desaturate only the tinted ones toward neutral gray
    // (preserving lightness) instead of recoloring to the target hue — a
    // real zipper stays black/gray-ish regardless of the bag's fabric color.
    const { s: hwS, l: hwL } = rgbToHsl(r, g, b);
    if (hwS > 0.12) {
      const gray = Math.round(hwL * 255);
      data[i] = gray; data[i + 1] = gray; data[i + 2] = gray;
    }
    protectedHardware++; continue;
  }
  if (cls === "white") { protectedWhite++; continue; }
  if (cls === "red") { protectedRed++; continue; }
  if (cls === "gold") { protectedGold++; continue; }

  const { l } = rgbToHsl(r, g, b);
  const deltaL = l - avgL;
  const newL = Math.min(1, Math.max(0, targetHsl.l + deltaL));
  const { r: nr, g: ng, b: nb } = hslToRgb(targetHsl.h, targetHsl.s, newL);
  data[i] = nr; data[i + 1] = ng; data[i + 2] = nb;
  recoloredCount++;
}

await sharp(data, { raw: { width, height, channels } }).png().toFile(outputPath);

console.log(JSON.stringify({
  outputPath, width, height, avgL: Number(avgL.toFixed(3)), targetL: Number(targetHsl.l.toFixed(3)),
  recoloredCount, protectedHardware, protectedWhite, protectedRed, protectedGold, transparentCount,
}, null, 2));
