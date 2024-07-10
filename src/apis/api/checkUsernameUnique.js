import { HttpResponseError } from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 주어진 사용자 이름이 서버에 이미 존재하는지 검사합니다.
 *
 * @param {string} username - 서버에 중복 검사를 요청할 사용자 이름입니다.
 * @returns {Promise<boolean>} 사용자 이름이 중복되지 않았다면 true를 반환하고, 중복되었다면 false를 반환합니다.
 * @throws {HttpResponseError} 서버로부터 예상치 못한 응답이나 에러 응답을 받았을 경우 HttpResponseError를 발생시킵니다.
 *
 * 이 함수는 서버의 "/api/auth/check/username" 엔드포인트에 POST 요청을 보내어
 * 사용자 이름의 중복 여부를 확인합니다. 응답이 정상적이지 않을 경우, 서버에서 받은 에러 메시지와 상태 코드를
 * 사용하여 HttpResponseError 예외를 생성하고 던집니다.
 */
const checkUsernameUnique = async (username) => {
  const response = await fetch(`${baseURL}/api/auth/check/username`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
    }),
  });

  if (!response.ok) {
    const errorResult = await response.json();
    if (errorResult.errorType === 'DuplicatedUsernameError') return false;

    throw new HttpResponseError(response.status, errorResult.message);
  }

  return true;
};

export default checkUsernameUnique;
