import submitPatientSignup from './submitPatientSignup';
import {
  ParametersValidationError,
  HttpResponseError,
  PasswordMismatchError,
  NotValidRequestError,
  DuplicatedUsernameError,
  UserNotFoundError,
} from '../utility/errors';

it('필수 파라미터가 누락되면 ParametersValidationError', async () => {
  await expect(submitPatientSignup({})).rejects.toThrow(ParametersValidationError);
});

describe('ID', () => {
  it('ID가 공백이면 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: '',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'username',
              message: '아이디는 공백일 수 없습니다.',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('ID가 중복이면 DuplicatedUsernameError', async () => {
    await expect(
      submitPatientSignup({
        username: 'testPatient1',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      }),
    ).rejects.toThrow(DuplicatedUsernameError);
  });

  it('ID가 4자리 미만이면 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'Ab1',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'username',
              message: '아이디는 4 ~ 16자리로 입력해주세요',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('ID가 16자리를 초과하면 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'Abcdefghijklmnopqrstuvwxyz1',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'username',
              message: '아이디는 4 ~ 16자리로 입력해주세요',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('ID가 영어 소/대문자 및 숫자가 아니면 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: '한글입력함',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'username',
              message: '아이디는 영어 소/대문자 및 숫자로 이루어져야합니다.',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });
});

describe('비밀번호', () => {
  it('비밀번호가 공백이면 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'vitest1',
        password: '',
        passwordCheck: '',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'password',
              message: '비밀번호는 공백일 수 없습니다.',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('비밀번호가 4자리 미만이면 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'vitest1',
        password: 'a1!',
        passwordCheck: 'a1',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'password',
              message: '비밀번호는 8 ~ 20자리로 입력해주세요',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('비밀번호가 16자리를 초과하면 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'vitest1',
        password: 'Abcdefghijklmnopqrstuvwxyz1!',
        passwordCheck: 'Abcdefghijklmnopqrstuvwxyz1!',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'password',
              message: '비밀번호는 8 ~ 20자리로 입력해주세요',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('비밀번호가 영어 소/대문자 및 숫자가 아니면 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'vitest1',
        password: '한글비밀번호입니다여러분',
        passwordCheck: '한글비밀번호입니다여러분',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'password',
              message: '비밀번호는 하나 이상의 알파벳, 숫자 및 특수문자로 구성되어야합니다.',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('비밀번호 2차가 공백이면 PasswordMismatchError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'vitest1',
        password: 'wjd603905!',
        passwordCheck: '',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'passwordCheck',
              message: '비밀번호는 공백일 수 없습니다.',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('비밀번호 2차 확인이 불일치면 PasswordMismatchError', async () => {
    await expect(
      submitPatientSignup({
        username: 'vitest1',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905',
        name: '환자6',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      }),
    ).rejects.toThrow(PasswordMismatchError);
  });
});

describe('이름', () => {
  it('이름이 공백인 경우 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'vitest1',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'name',
              message: '이름은 공백일 수 없습니다.',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('이름이 2자리 미만이면 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'vitest1',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '헬',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'name',
              message: '이름이 너무 짧거나 깁니다.',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('이름이 20자리를 초과하면 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'vitest1',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '한둘셋넷다여일여아열한둘셋넷다여일여아열한',
        birthdate: '2000-09-05',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'name',
              message: '이름이 너무 짧거나 깁니다.',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });
});

describe('생년월일', () => {
  it('생년월일이 공백이거나 포맷이 잘못된 경우 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'vitest1',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '테스트용환자',
        birthdate: '',
        protectorUsername: 'testProtector1',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'birthdate',
              message: '올바른 생년월일 형식은 yyyy-MM-dd 입니다.',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });
});

describe('보호자 ID', () => {
  it('보호자 ID가 공백인 경우 NotValidRequestError', async () => {
    try {
      const result = await submitPatientSignup({
        username: 'vitest1',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '테스트용환자',
        birthdate: '2000-09-05',
        protectorUsername: '',
      });
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        expect(error.errorDescriptions).toEqual(
          expect.arrayContaining([
            {
              field: 'protectorUsername',
              message: '아이디는 공백일 수 없습니다.',
            },
          ]),
        );
      } else {
        throw error;
      }
    }
  });

  it('보호자 ID를 찾을 수 없을 경우 UserNotFoundError', async () => {
    await expect(
      submitPatientSignup({
        username: 'vitest',
        password: 'wjd603905!',
        passwordCheck: 'wjd603905!',
        name: '환자6',
        birthdate: '2000-09-05',
        protectorUsername: 'aa',
      }),
    ).rejects.toThrow(UserNotFoundError);
  });
});
