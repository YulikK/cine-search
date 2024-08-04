export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('ru-RU').format(number);
};
