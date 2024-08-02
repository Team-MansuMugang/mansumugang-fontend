import submitSignin from './submitSignin';
import submitSignout from './submitSignout';
import renewRefreshToken from './renewRefreshToken';

beforeAll(async () => {
  await submitSignin({
    username: 'testProtector1',
    password: 'wjd603905!',
  });
});

afterAll(() => {
  localStorage.clear();
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms * 1000));
}

it('로그인 후 localStorage 토큰 저장', () => {
  expect(localStorage.getItem('accessToken')).not.toBeNull();
  expect(localStorage.getItem('refreshToken')).not.toBeNull();
  expect(localStorage.getItem('userType')).not.toBeNull();
});

// it(
//   '토큰 재발행 후 localStorage 토큰 수정',
//   async () => {
//     await delay(35);

//     const oldAccessToken = localStorage.getItem('accessToken');
//     await renewRefreshToken();
//     const newAccessToken = localStorage.getItem('accessToken');

//     expect(newAccessToken).not.toBe(oldAccessToken);
//   },
//   40 * 1000,
// );

it('로그아웃 후 localStorage 토큰 제거', async () => {
  await submitSignout();

  expect(localStorage.getItem('accessToken')).toBeNull();
  expect(localStorage.getItem('refreshToken')).toBeNull();
  expect(localStorage.getItem('userType')).toBeNull();
});
