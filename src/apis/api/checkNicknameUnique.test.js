import checkNicknameUnique from './checkNicknameUnique';
import { NotValidRequestError } from '../utility/errors';

// {
//   "username" : "testProtector1",
//   "password" : "wjd603905!",
//   "passwordCheck" : "wjd603905!",
//   "name" : "테스트용",
//   "birthdate" : "2000-09-05",
//   "email" : "2000tjdgns@naver.com",
//   "nickname" : "kkOma_fan"
// }

it('닉네임이 고유하면 true를 반환', async () => {
  const result = await checkNicknameUnique('uniqueNickname');
  expect(result).toBe(true);
});

it('닉네임이 중복이면 false를 반환', async () => {
  const result = await checkNicknameUnique('kkOma_fan');
  expect(result).toBe(false);
});

it('닉네임이 공백이면 NotValidRequestError', async () => {
  try {
    const result = await checkNicknameUnique('');
    expect(result).toBe(false);
  } catch (error) {
    if (error instanceof NotValidRequestError) {
      expect(error.errorDescriptions).toEqual(
        expect.arrayContaining([
          {
            field: 'nickname',
            message: '닉네임은 공백일 수 없습니다.',
          },
        ]),
      );
    } else {
      throw error;
    }
  }
});
