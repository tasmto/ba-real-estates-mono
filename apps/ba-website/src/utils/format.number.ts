export const formatCurrency = (price?: number, currency: string = 'ZAR') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  if (!price) return '';
  return currency === 'ZAR'
    ? formatter.format(price).replaceAll('ZAR', 'R')
    : formatter.format(price);
};
