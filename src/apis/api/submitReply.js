import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  NotValidAccessTokenError,
  AccessDeniedError,
  ExpiredAccessTokenError,
  NoSuchCommentError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const submitReply = async (params) => {
  validateParameters(params, ['commentId', 'content']);

  const response = await fetch(`${baseURL}/api/post/comment/reply/save`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidAccessTokenError') throw new NotValidAccessTokenError();
    if (result.errorType === 'ExpiredAccessTokenError') throw new ExpiredAccessTokenError();
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'NotValidRequestError') throw new NotValidRequestError();
    if (result.errorType === 'NoSuchPostError') throw new NoSuchCommentError();

    throw new HttpResponseError(response.status, result.message);
  }
};
export default submitReply;
