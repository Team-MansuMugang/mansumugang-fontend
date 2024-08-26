import {
  HttpResponseError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  UserNotFoundError,
  AccessDeniedError,
  NoSuchPostError,
} from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

const fetchPostDetails = async (id) => {
  const response = await fetch(`${baseURL}/api/post/${id}`, {
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

    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};

export default fetchPostDetails;
