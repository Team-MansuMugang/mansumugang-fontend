import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  OutOfBoundaryError,
  DuplicatedHospitalVisitingTimeError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const addMedicine = async (params) => {
  validateParameters(params, [
    'patientId',
    'hospitalName',
    'hospitalAddress',
    'latitude',
    'longitude',
    'hospitalVisitingTime',
  ]);

  const response = await fetch(`${baseURL}/api/hospital`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(params),
  });

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidAccessTokenError') throw new NotValidAccessTokenError();
    if (result.errorType === 'ExpiredAccessTokenError') throw new ExpiredAccessTokenError();
    if (result.errorType === 'NotValidRequestError')
      throw new NotValidRequestError(result.errorDescriptions);
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'OutOfBoundaryError') throw new OutOfBoundaryError();
    if (result.errorType === 'DuplicatedHospitalVisitingTimeError')
      throw new DuplicatedHospitalVisitingTimeError();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default addMedicine;
