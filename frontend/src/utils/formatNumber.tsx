const formatCurrency = new Intl.NumberFormat(undefined, {
  currency: "USD",
});

export const formatValue = (value: number) => {
  return formatCurrency.format(value);
};
