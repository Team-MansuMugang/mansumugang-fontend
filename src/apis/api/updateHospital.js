import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  NoSuchHospitalError,
  NeedLatitudeAndLongitudeError,
  OutOfBoundaryError,
  DuplicatedHospitalVisitingTimeError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const addMedicine = async (params) => {
  validateParameters(params, [
    'hospitalId',
    'hospitalName',
    'hospitalAddress',
    'latitude',
    'longitude',
    'hospitalVisitingTime',
  ]);

  const { hospitalId } = params;
  delete params.hospitalId; // hospitalId JSON에 추가하지 않음

  const response = await fetch(`${baseURL}/api/hospital/${hospitalId}`, {
    method: 'PATCH',
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
    if (result.errorType === 'NoSuchHospitalError') throw new NoSuchHospitalError();
    if (result.errorType === 'NeedLatitudeAndLongitudeError')
      throw new NeedLatitudeAndLongitudeError();
    if (result.errorType === 'OutOfBoundaryError') throw new OutOfBoundaryError();
    if (result.errorType === 'DuplicatedHospitalVisitingTimeError')
      throw new DuplicatedHospitalVisitingTimeError();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default addMedicine;
