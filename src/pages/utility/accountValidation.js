const validateId = (value) => {
  const regex = /^[A-Za-z0-9]+$/;
  if (value === '') return { status: 'default', description: '' };

  if (!regex.test(value))
    return { status: 'warning', description: '영어 소/대문자 혹은 숫자로 입력해주세요' };

  if (value.length < 4 || value.length > 16)
    return { status: 'warning', description: '4자 이상 16자 이하로 입력해주세요' };

  return { status: 'info', description: '아이디가 중복인지 확인해주세요' };
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
  if (/[^a-zA-Z가-힣 ]/.test(value))
    return {
      status: 'warning',
      description: '이름은 영문자, 한글 음절, 공백만 포함할 수 있습니다.',
    };
  if (value.length < 2 || value.length > 20)
    return { status: 'warning', description: '2자 이상 20자 이하로 입력해주세요' };

  return { status: 'success', description: '' };
};

const validNickname = (value) => {
  if (value === '') return { status: 'default', description: '' };
  if (value.length > 20) return { status: 'warning', description: '20자 이하로 입력해주세요' };
  return { status: 'info', description: '닉네임이 중복인지 확인해주세요' };
};

const validPhoneNumber = (value) => {
  const onlyNumberValue = value.match(/\d/g);
  if (onlyNumberValue == null) return { status: 'default', description: '' };
  if (onlyNumberValue.length < 11)
    return { status: 'warning', description: '전화번호를 끝까지 입력해주세요' };

  return { status: 'success', description: '' };
};

const validBirthYear = (value) => {
  if (value === '') return { status: 'default', description: '' };
  if (value.length !== 4) return { status: 'warning', description: '년도를 정확히 입력해주세요' };

  return { status: 'success', description: '' };
};

const validBirthMonth = (value) => {
  if (value === '') return { status: 'default', description: '' };
  if (value < 1 || value > 12)
    return { status: 'warning', description: '월을 정확히 입력해주세요' };

  return { status: 'success', description: '' };
};

const validBirthDay = (value) => {
  if (value === '') return { status: 'default', description: '' };
  if (value < 1 || value > 31)
    return { status: 'warning', description: '일을 정확히 입력해주세요' };

  return { status: 'success', description: '' };
};

const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === '') return { status: 'default', description: '' };
  if (!emailRegex.test(value))
    return {
      status: 'warning',
      description: '유효한 이메일 주소를 입력해주세요',
    };

  return { status: 'success', description: '' };
};

const validGuardianId = (value) => {
  if (value === '') return { status: 'default', description: '' };
  return { status: 'info', description: '아이디가 유효한지 확인해주세요' };
};

export {
  validateId,
  validatePassword,
  validName,
  validNickname,
  validPhoneNumber,
  validBirthYear,
  validBirthMonth,
  validBirthDay,
  validateEmail,
  validGuardianId,
};
