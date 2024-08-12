import {
  HttpResponseError,
  UserNotFoundError,
  AccessDeniedError,
  UserLocationInfoNotFoundError,
} from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

const fetchPatientList = async (patientId) => {
  const response = await fetch(`${baseURL}/api/location/user/${patientId} `, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'UserLocationInfoNotFoundError')
      throw new UserLocationInfoNotFoundError();

    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};

export default fetchPatientList;
