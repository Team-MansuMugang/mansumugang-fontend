import {
  HttpResponseError,
  NotValidAccessTokenError,
  UserNotFoundError,
  AccessDeniedError,
  S3_DELETE_OBJECT_ERROR,
  ImageDeleteError,
  RecordDeleteError,
  InternalSeverError, // 알 수 없는 오류로 사용
} from '../utility/errors.js';

const baseURL = 'http://minnnisu.iptime.org';

const deleteGuardian = async (protectorId) => {
  try {
    // DELETE 요청 수행
    const response = await fetch(`${baseURL}/api/user/protector${protectorId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // 엑세스 토큰 헤더에 포함
      },
    });

    // 응답을 JSON 형식으로 파싱
    const result = await response.json();

    // 응답이 성공적이지 않은 경우, 오류 처리
    if (!response.ok) {
      if (result.errorType === 'NotValidAccessTokenError') {
        throw new NotValidAccessTokenError();
      }
      if (result.errorType === 'UserNotFoundError') {
        throw new UserNotFoundError();
      }
      if (result.errorType === 'AccessDeniedError') {
        throw new AccessDeniedError();
      }
      if (result.errorType === 'S3_DELETE_OBJECT_ERROR') {
        throw new S3_DELETE_OBJECT_ERROR();
      }
      if (result.errorType === 'ImageDeleteError') {
        throw new ImageDeleteError();
      }
      if (result.errorType === 'RecordDeleteError') {
        throw new RecordDeleteError();
      }
      throw new HttpResponseError(response.status, result.message);
    }

    // 요청이 성공적인 경우, 응답 데이터를 반환하거나 별도 처리를 수행
    return result;
  } catch (error) {
    // 네트워크 또는 기타 오류 처리
    throw new InternalSeverError(`알 수 없는 오류가 발생했습니다. ${error.message}`);
  }
};

export default deleteGuardian;
