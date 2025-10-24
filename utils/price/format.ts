export function formatCurrency(
  value: string | number,
  locale: string = 'es-CO',
  currency: string = 'COP'
): string {
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^0-9.-]+/g, ''))
    : value;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(numericValue);
}
