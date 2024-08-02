import { HttpResponseError } from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 보호자 사용자 ID가 존재하는지 확인합니다.
 *
 * @async
 * @function checkUsernameUnique
 * @param {string} username - 확인할 사용자 이름.
 * @returns {Promise<boolean>} - 사용자 이름이 고유하면 true, 그렇지 않으면 false를 반환합니다.
 * @throws {HttpResponseError} - 요청이 실패하고 'NotValidRequestError' 또는 'UserTypeDismatchError'가 아닌 경우 발생합니다.
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
    if (errorResult.errorType === 'NotValidRequestError') return false;
    if (errorResult.errorType === 'UserTypeDismatchError') return false;

    throw new HttpResponseError(response.status, errorResult.message);
  }

  return true;
};

export default checkProtectorUsername;
