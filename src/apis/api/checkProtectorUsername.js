import { HttpResponseError, UserNotFoundError } from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 보호자 사용자 ID가 존재하는지 확인합니다.
 *
 * @async
 * @function checkProtectorUsername
 * @param {string} username - 확인할 사용자 이름.
 * @returns {Promise<boolean>} - 사용자 ID가 보호자이면 true, 환자 ID이면 false를 반환합니다.
 * @throws {UserNotFoundError} - 존재하지 않는 사용자 이름일 경우 UserNotFoundError를 발생시킵니다.
 * @throws {HttpResponseError} - 서버로부터 예상치 못한 응답이나 에러 응답을 받았을 경우 HttpResponseError를 발생시킵니다.
 */
const checkProtectorUsername = async (username) => {
  const response = await fetch(`${baseURL}/api/auth/check/protectorUsername`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
    }),
  });

  if (!response.ok) {
    const errorResult = await response.json();
    if (errorResult.errorType === 'UserTypeDismatchError') return false;

    if (errorResult.errorType === 'NotValidRequestError') throw new UserNotFoundError();
    if (errorResult.errorType === 'UserNotFoundError') throw new UserNotFoundError();

    throw new HttpResponseError(response.status, errorResult.message);
  }

  return true;
};

export default checkProtectorUsername;
