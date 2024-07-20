const formatPhoneNumber = (inputValue) => {
  let numbersOnly = inputValue.replace(/[^0-9]/g, '');
  numbersOnly = numbersOnly.slice(0, 11);

  return numbersOnly
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1 $2 $3')
    .replace(/(\s{1,2})$/g, '');
};

export { formatPhoneNumber };
