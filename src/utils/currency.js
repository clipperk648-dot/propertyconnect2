export const formatCurrency = (value, opts = {}) => {
  if (value == null || value === '') return '';
  const { monthly = false } = opts;
  try {
    const formatted = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(Number(value));

    return monthly ? `${formatted}/month` : formatted;
  } catch (e) {
    return `${value}`;
  }
};
