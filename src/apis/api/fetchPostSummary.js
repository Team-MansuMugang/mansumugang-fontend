import {
  HttpResponseError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  UserNotFoundError,
  AccessDeniedError,
  NoSuchCategoryError,
} from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

const fetchPostSummary = async (params) => {
  let queryParameters = '';

  if (params.category) queryParameters += `&categoryCode=${params.category}`;
  if (params.page) queryParameters += `&page=${params.page}`;
  if (queryParameters) queryParameters = `?${queryParameters.slice(1)}`;

  const response = await fetch(`${baseURL}/api/post${queryParameters}`, {
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
    if (result.errorType === 'NoSuchCategoryError') throw new NoSuchCategoryError();

    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};

export default fetchPostSummary;
