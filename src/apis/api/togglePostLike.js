import {
  HttpResponseError,
  NotValidRequestError,
  NotValidAccessTokenError,
  UserNotFoundError,
  AccessDeniedError,
  NoSuchPostError,
} from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

const togglePostLike = async (postId) => {
  const response = await fetch(`${baseURL}/api/post/${postId}/like`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  if (!response.ok) {
    const errorResult = await response.json();

    if (errorResult.errorType === 'NotValidAccessTokenError') throw new NotValidAccessTokenError();
    if (errorResult.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (errorResult.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (errorResult.errorType === 'NoSuchPostError') throw new NoSuchPostError();
    if (errorResult.errorType === 'NotValidRequestError')
      throw new NotValidRequestError(errorResult.errorDescriptions);
    if (errorResult.errorType === 'DuplicatedNicknameError') return false;

    throw new HttpResponseError(response.status, errorResult.message);
  }

  const result = await response.json();

  return result.message === '게시물에 좋아요를 누르셨습니다.';
};

export default togglePostLike;
