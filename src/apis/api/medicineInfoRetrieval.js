import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const medicineInfoRetrieval = async (params) => {
  if (!('date' in params)) {
    const today = new Date();
    const koreaTime = new Date(today.getTime() + 9 * 60 * 60 * 1000);
    console.log(koreaTime.toISOString().split('T')[0]);
    params['date'] = koreaTime.toISOString().split('T')[0];
  }
  validateParameters(params, ['date', 'patientId']);

  const response = await fetch(
    `${baseURL}/api/medicine/protector?date=${params.date}&patientId=${params.patientId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidAccessTokenError') throw new NotValidAccessTokenError();
    if (result.errorType === 'ExpiredAccessTokenError') throw new ExpiredAccessTokenError();
    if (result.errorType === 'NotValidRequestError')
      throw new NotValidRequestError(result.errorDescriptions);
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();

    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};

export default medicineInfoRetrieval;
