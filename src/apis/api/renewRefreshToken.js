import { HttpResponseError } from '../utility/errors.js';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 서버에 액세스 토큰과 리프레시 토큰을 이용하여 새로운 액세스 토큰을 요청합니다.
 * return값이 없고 성공적으로 토큰을 갱신한 경우 localStorage에 새로운 액세스 토큰을 저장합니다.
 *
 * @returns {Promise<void>} 성공적으로 토큰을 갱신했을 경우 아무 값도 반환하지 않습니다.
 * @throws {HttpResponseError} 토큰 갱신 요청에 실패하거나 서버로부터 예상치 못한 응답을 받았을 경우 HttpResponseError를 발생시킵니다.
 */
const renewRefreshToken = async () => {
  const response = await fetch(`${baseURL}/api/auth/refreshToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Authorization-refresh': `Bearer ${localStorage.getItem('refreshToken')}`,
    },
  });
  const result = await response.json();

  if (!response.ok) {
    throw new HttpResponseError(response.status, result.message);
  }

  localStorage.setItem('accessToken', result.accessToken);
};
export default renewRefreshToken;
