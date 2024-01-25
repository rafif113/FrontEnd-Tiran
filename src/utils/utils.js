// File: utils.js (atau nama file sesuai kebutuhan)
export const formatRupiah = (number) => {
  const formattedNumber = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);

  return formattedNumber;
};
