export const formatNumberWithCommas = (number) => {
  return new Intl.NumberFormat("en-IN").format(number);
};
