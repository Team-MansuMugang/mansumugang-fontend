const formatPhoneNumber = (inputValue) => {
  let numbersOnly = inputValue.replace(/[^0-9]/g, '');
  numbersOnly = numbersOnly.slice(0, 11);

  return numbersOnly
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/(-{1,2})$/g, '');
};

const formatBirthYear = (inputValue) => {
  const numbersOnly = inputValue.replace(/\D/g, '');
  return numbersOnly.substring(0, 4);
};

const formatBirthMonth = (inputValue) => {
  if (inputValue === null) return null;

  const numbersOnly = inputValue.replace(/\D/g, '');
  if (numbersOnly == '') return '';

  const number = parseInt(numbersOnly, 10);
  if (isNaN(number)) return 1; // 숫자 변환 실패 시 기본값 1 설정
  if (number < 1) return 1;
  if (number > 12) return 12;

  return number;
};

const formatBirthDay = (year, month, inputValue) => {
  if (inputValue === null) return null;

  let numbersOnly = String(inputValue).replace(/\D/g, '');
  if (numbersOnly == '') return '';

  if (numbersOnly < 1) numbersOnly = '1';
  if (numbersOnly > 31) numbersOnly = '31';

  if (year === null || month === null || numbersOnly === null) return numbersOnly;
  if (year.length !== 4) return numbersOnly;
  if (1 > month || month > 12) return numbersOnly;

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInMonths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const lastDay = daysInMonths[month - 1];

  const number = parseInt(numbersOnly, 10);
  if (isNaN(number)) return 1; // 숫자 변환 실패 시 기본값 1 설정
  if (number < 1) return 1;
  if (number > lastDay) return lastDay;

  return number;
};

export { formatPhoneNumber, formatBirthYear, formatBirthMonth, formatBirthDay };
