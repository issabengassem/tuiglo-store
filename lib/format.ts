/**
 * Prices always render as "<number> DH" with Western numerals — never
 * Eastern Arabic-Indic digits, even inside Arabic text (design direction §1).
 */
export function formatPrice(amount: number): string {
  return `${amount} DH`;
}
