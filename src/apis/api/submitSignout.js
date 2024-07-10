import { HttpResponseError } from '../utility/errors.js';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 서버에 로그아웃 요청을 보내고 관련 사용자 정보를 로컬 스토리지에서 제거합니다.
 *
 * @returns {Promise<void>} 로그아웃이 성공적으로 완료되면 아무 값도 반환하지 않습니다.
 * @throws {HttpResponseError} 로그아웃 요청이 실패하거나 서버로부터 예상치 못한 응답을 받았을 경우 발생합니다.
 *
 * 이 함수는 "/api/auth/logout" 엔드포인트에 POST 요청을 보내 로그아웃을 시도합니다.
 * 요청은 리프레시 토큰을 헤더에 포함하여 보내며, 서버로부터의 응답을 확인하여
 * 성공적으로 로그아웃되었는지 검증합니다. 응답이 정상적이지 않을 경우, 서버에서 받은 에러 타입에 따라
 * 적절한 예외를 발생시킵니다. 로그아웃이 성공적으로 처리되면, 액세스 토큰, 리프레시 토큰,
 * 사용자 타입을 로컬 스토리지에서 제거합니다.
 */
const submitSignout = async () => {
  const response = await fetch(`${baseURL}/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization-refresh': localStorage.getItem('refreshToken'),
    },
  });
  const result = await response.json();

  if (!response.ok) {
    throw new HttpResponseError(response.status, result.message);
  }

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userType');
};
export default submitSignout;
