import {
  HttpResponseError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  UserNotFoundError,
  AccessDeniedError,
  UserRecordInfoNotFoundError,
} from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

const fetchPatientList = async () => {
  const response = await fetch(`${baseURL}/api/record`, {
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
    if (result.errorType === 'UserRecordInfoNotFoundError') throw new UserRecordInfoNotFoundError();

    throw new HttpResponseError(response.status, result.message);
  }

  return result.records;
};

export default fetchPatientList;
