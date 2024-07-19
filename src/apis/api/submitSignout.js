import { HttpResponseError } from '../utility/errors.js';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 서버에 로그아웃 요청을 보내고 관련 사용자 정보를 로컬 스토리지에서 제거합니다.
 *
 * @returns {Promise<void>} 로그아웃이 성공적으로 완료되면 아무 값도 반환하지 않습니다.
 * @throws {HttpResponseError} 로그아웃 요청이 실패하거나 서버로부터 예상치 못한 응답을 받았을 경우 발생합니다.
 */
const submitSignout = async () => {
  const response = await fetch(`${baseURL}/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization-refresh': `Bearer ${localStorage.getItem('refreshToken')}`,
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
