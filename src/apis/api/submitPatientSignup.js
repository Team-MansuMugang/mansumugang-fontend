import {
  HttpResponseError,
  NotValidRequestError,
  PasswordMismatchError,
  DuplicatedUsernameError,
  UserNotFoundError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 환자 회원가입을 위해 서버에 요청을 보냅니다.
 * 회원가입에 성공하더라도 return값은 없습니다.
 *
 * @param {Object} params - 회원가입 정보를 담은 객체로, 'username', 'password', 'passwordCheck', 'name', 'birthdate', 'protectorUsername'필드를 포함해야 합니다.
 * @returns {Promise<void>} 회원가입이 성공적으로 완료되면 아무 값도 반환하지 않습니다.
 * @throws {NotValidRequestError} params의 값들이 공백이거나 형식에 맞지 않을 때 발생합니다.
 * @throws {PasswordMismatchError} 제출된 비밀번호와 비밀번호 확인 값이 일치하지 않을 때 발생합니다.
 * @throws {DuplicatedUsernameError} 사용자 이름이 이미 사용 중일 때 발생합니다.
 * @throws {UserNotFoundError} 보호자의 사용자 이름이 존재하지 않을 때 발생합니다.
 * @throws {HttpResponseError} 회원가입 요청이 실패하거나 서버로부터 예상치 못한 응답을 받았을 경우 발생합니다.
 */
const submitPatientSignup = async (params) => {
  validateParameters(params, [
    'username',
    'password',
    'passwordCheck',
    'name',
    'birthdate',
    'protectorUsername',
  ]);

  const response = await fetch(`${baseURL}/api/auth/signup/patient`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotEqualPasswordAndPasswordCheck') throw new PasswordMismatchError();
    if (result.errorType === 'DuplicatedUsernameError') throw new DuplicatedUsernameError();
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'NotValidRequestError')
      throw new NotValidRequestError(result.errorDescriptions);

    throw new HttpResponseError(response.status, result.message);
  }
};
export default submitPatientSignup;
