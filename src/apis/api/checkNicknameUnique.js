import { HttpResponseError, NotValidRequestError } from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

/**
 * 주어진 닉네임이 서버에 이미 존재하는지 검사합니다.
 *
 * @param {string} nickname - 서버에 중복 검사를 요청할 사용자 닉네임입니다.
 * @returns {Promise<boolean>} 닉네임이 중복되지 않았다면 true를 반환하고, 중복되었다면 false를 반환합니다.
 * @throws {NotValidRequestError} 닉네임이 공백이거나 형식에 맞지 않은 경우 NotValidRequestError를 발생시킵니다.
 * @throws {HttpResponseError} 서버로부터 예상치 못한 응답이나 에러 응답을 받았을 경우 HttpResponseError를 발생시킵니다.
 */
const checkNicknameUnique = async (nickname) => {
  const response = await fetch(`${baseURL}/api/auth/check/nickname`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nickname,
    }),
  });

  if (!response.ok) {
    const errorResult = await response.json();
    if (errorResult.errorType === 'NotValidRequestError')
      throw new NotValidRequestError(errorResult.errorDescriptions);
    if (errorResult.errorType === 'DuplicatedNicknameError') return false;

    throw new HttpResponseError(response.status, errorResult.message);
  }

  return true;
};

export default checkNicknameUnique;
