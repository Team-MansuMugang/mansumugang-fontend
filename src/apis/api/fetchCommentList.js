import {
  HttpResponseError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  UserNotFoundError,
  AccessDeniedError,
  NoSuchPostError,
  NoSuchCommentError,
} from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

const fetchPostDetail = async (postId, cursor) => {
  let apiURL = `${baseURL}/api/post/comment?postId=${postId}`;
  if (cursor) apiURL += `&cursor=${cursor}`;

  const response = await fetch(apiURL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidAccessTokenError') throw new NotValidAccessTokenError();
    if (result.errorType === 'ExpiredAccessTokenError') throw new ExpiredAccessTokenError();
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'NoSuchPostError') throw new NoSuchPostError();
    if (result.errorType === 'NoSuchCommentError') throw new NoSuchCommentError();

    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};

export default fetchPostDetail;
