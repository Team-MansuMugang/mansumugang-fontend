const validateId = (value) => {
  const regex = /^[A-Za-z0-9]+$/;
  if (value === '') return { status: 'default', description: '' };

  if (!regex.test(value))
    return { status: 'warning', description: '영어 소/대문자 혹은 숫자로 입력해주세요' };

  if (value.length < 4 || value.length > 16)
    return { status: 'warning', description: '4자 이상 16자 이하로 입력해주세요' };

  return { status: 'default', description: '' };
};

const validatePassword = (value) => {
  const hasAlphabet = /[A-Za-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(value);

  if (value === '') return { status: 'default', description: '' };
  if (!hasAlphabet || !hasNumber || !hasSpecialChar)
    return {
      status: 'warning',
      description: '알파벳, 숫자 및 특수 문자를 하나 이상 포함시켜주세요',
    };
  if (value.length < 8 || value.length > 20)
    return { status: 'warning', description: '8자 이상 20자 이하로 입력해주세요' };

  return { status: 'success', description: '' };
};

const validName = (value) => {
  if (value === '') return { status: 'default', description: '' };
  if (value.length < 2 || value.length > 20)
    return { status: 'warning', description: '2자 이상 20자 이하로 입력해주세요' };

  return { status: 'success', description: '' };
};

const validPhoneNumber = (value) => {
  const onlyNumberValue = value.match(/\d/g);
  if (onlyNumberValue == null) return { status: 'default', description: '' };
  if (onlyNumberValue.length < 11)
    return { status: 'warning', description: '전화번호를 끝까지 입력해주세요' };

  return { status: 'success', description: '' };
};

export { validateId, validatePassword, validName, validPhoneNumber };
