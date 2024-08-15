import {
  HttpResponseError,
  NotValidAccessTokenError,
  AccessDeniedError,
  UserLocationInfoWithinRangeNotFoundError,
  UserNotFoundError,
} from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

const fetchPatientList = async (patientId, time) => {
  const response = await fetch(
    `${baseURL}/api/location/user?patient_id=${patientId}&time=${time}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidAccessTokenError') throw new NotValidAccessTokenError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'UserLocationInfoWithinRangeNotFoundError')
      throw new UserLocationInfoWithinRangeNotFoundError();
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();

    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};

export default fetchPatientList;