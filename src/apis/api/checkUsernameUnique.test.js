import checkUsernameUnique from './checkUsernameUnique';
import { NotValidRequestError } from '../utility/errors';

// {
//     "username" : "testProtector1",
//     "password" : "wjd603905!",
//     "passwordCheck" : "wjd603905!",
//     "name" : "테스트용",
//     "birthdate" : "2000-09-05",
//     "email" : "2000tjdgns@naver.com",
//     "nickname" : "kkOma_fan"
// }

it('ID가 고유하면 true를 반환', async () => {
  const result = await checkUsernameUnique('uniqueId');
  expect(result).toBe(true);
});

it('ID가 중복이면 false를 반환', async () => {
  const result = await checkUsernameUnique('testProtector1');
  expect(result).toBe(false);
});

it('ID가 공백이면 NotValidRequestError', async () => {
  try {
    const result = await checkUsernameUnique('');
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

it('ID가 4자리 미만이면 NotValidRequestError', async () => {
  try {
    const result = await checkUsernameUnique('Ab1');
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
    const result = await checkUsernameUnique('Abcdefghijklmnopqrstuvwxyz1');
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
    const result = await checkUsernameUnique('한글입력함');
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
