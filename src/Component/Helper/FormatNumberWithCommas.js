export const formatNumberWithCommas = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};
