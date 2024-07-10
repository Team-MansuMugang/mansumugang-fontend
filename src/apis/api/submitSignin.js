import { HttpResponseError, UserNotFoundError } from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 사용자 이름과 비밀번호를 사용하여 서버에 로그인 요청을 보냅니다.
 *
 * @param {Object} params - 로그인 정보를 담은 객체로, 'username'과 'password' 필드를 포함해야 합니다.
 * @returns {Promise<void>} 로그인이 성공적으로 완료되면 아무 값도 반환하지 않습니다.
 * @throws {UserNotFoundError} 제공된 사용자 정보가 서버에 존재하지 않을 경우 발생합니다.
 * @throws {HttpResponseError} 로그인 요청이 실패하거나 서버로부터 예상치 못한 응답을 받았을 경우 발생합니다.
 *
 * 이 함수는 먼저 `validateParameters` 함수를 호출하여 필요한 파라미터가 모두 있는지 확인합니다.
 * 이후 "/api/auth/login" 엔드포인트에 POST 요청을 보내 로그인을 시도하고, 서버로부터 받은
 * 응답을 파싱하여 필요한 정보(액세스 토큰, 리프레시 토큰, 사용자 타입)를 로컬 스토리지에 저장합니다.
 * 응답이 정상적이지 않을 경우, 서버에서 받은 에러 타입에 따라 적절한 예외를 발생시킵니다.
 */
const submitSignin = async (params) => {
  validateParameters(params, ['username', 'password']);

  const response = await fetch(`${baseURL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    throw new HttpResponseError(response.status, result.message);
  }

  localStorage.setItem('accessToken', result.accessToken);
  localStorage.setItem('refreshToken', result.refreshToken);
  localStorage.setItem('userType', result.userType);
};
export default submitSignin;
