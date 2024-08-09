import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const medicineInfoRetrieval = async (params) => {
  if (!('date' in params)) {
    const today = new Date();
    params['date'] = today.toISOString().split('T')[0];
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
    if (result.errorType === 'NotValidRequestError')
      throw new NotValidRequestError(result.errorDescriptions);
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();

    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};

export default medicineInfoRetrieval;
