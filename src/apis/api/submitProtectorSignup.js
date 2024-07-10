import {
  HttpResponseError,
  PasswordMismatchError,
  DuplicatedUsernameError,
  DuplicatedNicknameError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

//!: 정상적인 케이스만 동작함. 아직 예외처리 로직 정상 동작 안함.
//TODO: 백엔드 예외처리 로직 반영되면 throw Error 수정 필요
/**
 * 보호자 회원가입을 위해 서버에 요청을 보냅니다.
 *
 * @param {Object} params - 회원가입 정보를 담은 객체로, 'username', 'password', 'passwordCheck', 'name', 'birthdate', 'email', 'nickname' 필드를 포함해야 합니다.
 * @returns {Promise<Object>} 회원가입이 성공적으로 완료되면 서버에서 반환된 데이터를 반환합니다.
 * @throws {PasswordMismatchError} 제출된 비밀번호와 비밀번호 확인 값이 일치하지 않을 때 발생합니다.
 * @throws {DuplicatedUsernameError} 사용자 이름이 이미 사용 중일 때 발생합니다.
 * @throws {DuplicatedNicknameError} 닉네임이 이미 사용 중일 때 발생합니다.
 * @throws {HttpResponseError} 회원가입 요청이 실패하거나 서버로부터 예상치 못한 응답을 받았을 경우 발생합니다.
 *
 * 이 함수는 먼저 `validateParameters` 함수를 호출하여 필요한 파라미터가 모두 있는지 확인합니다.
 * "/api/auth/signup/protector" 엔드포인트에 POST 요청을 보내 회원가입을 시도하고, 서버로부터 받은
 * 응답을 확인하여 회원가입의 성공 여부를 검증합니다. 응답이 정상적이지 않을 경우, 서버에서 받은 에러 타입에 따라
 * 적절한 예외를 발생시킵니다.
 */
const submitProtectorSignup = async (params) => {
  validateParameters(params, [
    'username',
    'password',
    'passwordCheck',
    'name',
    'birthdate',
    'email',
    'nickname',
  ]);
  console.log(`${baseURL}/api/auth/signup/protector`);
  console.log(JSON.stringify(params));

  const response = await fetch(`${baseURL}/api/auth/signup/protector`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotEqualPasswordAndPasswordCheck') throw new PasswordMismatchError();
    if (result.errorType === 'DuplicatedUsernameError') throw new DuplicatedUsernameError();
    if (result.errorType === 'DuplicatedNicknameError') throw new DuplicatedNicknameError();
    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};
export default submitProtectorSignup;
