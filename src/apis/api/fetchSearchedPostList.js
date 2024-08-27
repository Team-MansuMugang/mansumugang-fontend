import {
  HttpResponseError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  UserNotFoundError,
  AccessDeniedError,
  InvalidQueryError,
} from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

const fetchSearchedPostList = async (search = '', page = 0) => {
  const response = await fetch(`${baseURL}/api/community?search=${search}&page=${page}`, {
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
    if (result.errorType === 'InvalidQueryError') throw new InvalidQueryError();

    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};

export default fetchSearchedPostList;
