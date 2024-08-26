import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  NotValidAccessTokenError,
  AccessDeniedError,
  ExpiredAccessTokenError,
  NoSuchPostError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const submitComment = async (params) => {
  validateParameters(params, ['postId', 'content']);

  const response = await fetch(`${baseURL}/api/post/comment/save`, {
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
    if (result.errorType === 'AccessDeniedError') throw new NotValidRequestError();
    if (result.errorType === 'AccessDeniedError') throw new NoSuchPostError();

    throw new HttpResponseError(response.status, result.message);
  }
};
export default submitComment;
