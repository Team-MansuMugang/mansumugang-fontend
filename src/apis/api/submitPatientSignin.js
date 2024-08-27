import {
  HttpResponseError,
  UserNotFoundError,
  ProtectorLoginNotAllowedError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 사용자 이름과 비밀번호를 사용하여 서버에 로그인 요청을 보냅니다.
 *
 * @param {Object} params - 로그인 정보를 담은 객체로, 'username'과 'password' 필드를 포함해야 합니다.
 * @returns {Promise<void>} 로그인이 성공적으로 완료되면 아무 값도 반환하지 않습니다.
 * @throws {UserNotFoundError} 제공된 사용자 정보가 서버에 존재하지 않을 경우 발생합니다.
 * @throws {ProtectorLoginNotAllowedError} 보호자가 로그인을 시도한 경우 발생합니다.
 * @throws {HttpResponseError} 로그인 요청이 실패하거나 서버로부터 예상치 못한 응답을 받았을 경우 발생합니다.
 */
const submitPatientSignin = async (params) => {
  validateParameters(params, ['username', 'password']);

  const response = await fetch(`${baseURL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const result = await response.json();

  if (result.userType === 'USER_PROTECTOR') throw new ProtectorLoginNotAllowedError();

  if (!response.ok) {
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    throw new HttpResponseError(response.status, result.message);
  }

  localStorage.setItem('accessToken-patient', result.accessToken);
  localStorage.setItem('refreshToken-patient', result.refreshToken);
  localStorage.setItem('userType-patient', result.userType);
};
export default submitPatientSignin;
