import {
  HttpResponseError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  UserNotFoundError,
  AccessDeniedError,
  NoSuchPostError,
  NoSuchReplyError,
} from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

const fetchReplyList = async (commentId, cursor) => {
  let apiURL = `${baseURL}/api/post/comment/reply?commentId=${commentId}`;
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
    if (result.errorType === 'NoSuchReplyError') throw new NoSuchReplyError();

    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};

export default fetchReplyList;
