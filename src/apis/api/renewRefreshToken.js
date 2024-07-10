import { HttpResponseError } from '../utility/errors.js';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 서버에 액세스 토큰과 리프레시 토큰을 이용하여 새로운 액세스 토큰을 요청합니다.
 *
 * @returns {Promise<void>} 성공적으로 토큰을 갱신했을 경우 아무 값도 반환하지 않습니다.
 * @throws {HttpResponseError} 토큰 갱신 요청에 실패하거나 서버로부터 예상치 못한 응답을 받았을 경우 HttpResponseError를 발생시킵니다.
 *
 * 이 함수는 서버의 "/api/auth/refreshToken" 엔드포인트에 POST 요청을 보내어
 * 새로운 액세스 토큰을 받습니다. 요청은 로컬 스토리지에 저장된 액세스 토큰과 리프레시 토큰을
 * 헤더에 포함하여 보내며, 서버로부터 받은 새로운 액세스 토큰은 로컬 스토리지에 저장합니다.
 * 응답이 정상적이지 않을 경우, 서버에서 받은 에러 메시지와 상태 코드를
 * 사용하여 HttpResponseError 예외를 생성하고 던집니다.
 */
const renewRefreshToken = async () => {
  const response = await fetch(`${baseURL}/api/auth/refreshToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('accessToken'),
      'Authorization-refresh': localStorage.getItem('refreshToken'),
    },
  });
  const result = await response.json();

  if (!response.ok) {
    throw new HttpResponseError(response.status, result.message);
  }

  localStorage.setItem('accessToken', result.accessToken);
};
export default renewRefreshToken;
