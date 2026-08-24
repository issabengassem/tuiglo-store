import sharp from "sharp";
import fs from "fs";
import path from "path";

const SOURCE_DIR = path.join(process.cwd(), "public", "products");
const OUTPUT_DIR = path.join(process.cwd(), "public", "products", "_optimized");

function getPngFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getPngFiles(fullPath));
    } else if (entry.name.toLowerCase().endsWith(".png")) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeFile(inputPath: string, outputPath: string) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;

    // Optimize: strip metadata, optimize compression, ensure baseline RGB
    const optimized = sharp(inputPath)
      .png({ compressionLevel: 9, effort: 4 })
      .rotate()
      .ensureAlpha()
      .toFormat("png");

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // Write optimized file
    await optimized.toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const optimizedSize = outputStats.size;
    const reduction = ((originalSize - optimizedSize) / originalSize) * 100;

    console.log(
      `${path.basename(inputPath)}: ${originalSize.toLocaleString()} → ${optimizedSize.toLocaleString()} bytes (${reduction.toFixed(
        1
      )}% reduction)`
    );
  } catch (err) {
    console.error(`FAILED ${path.basename(inputPath)}:`, err);
  }
}

async function main() {
  const pngFiles = getPngFiles(SOURCE_DIR);
  console.log(`Found ${pngFiles.length} PNG files in ${SOURCE_DIR}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const file of pngFiles) {
    const relative = path.relative(SOURCE_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, relative);
    await optimizeFile(file, outputPath);
  }

  console.log("\nOptimization complete. Optimized files are in:", OUTPUT_DIR);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});