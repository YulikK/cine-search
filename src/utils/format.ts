export const formatNumber = (number: number): string =>
  new Intl.NumberFormat('ru-RU').format(number);
