export function formatterPrices(value: number) {
  const format = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return format;
}
