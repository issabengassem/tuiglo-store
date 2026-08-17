/** Arabic labels for the spec keys used in data/products/*.ts. */
const SPEC_LABELS: Record<string, string> = {
  material: "المادة",
  capacity: "السعة",
  dimensions: "الأبعاد",
  weight: "الوزن",
};

export function specLabel(key: string): string {
  return SPEC_LABELS[key] ?? key;
}
