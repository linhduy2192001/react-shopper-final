export const currency = (numb = 0) => {
  return new Intl.NumberFormat().format(numb);
};
