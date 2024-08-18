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

const addMedicine = async (params, imageFile) => {
  validateParameters(params, [
    'patientId',
    'medicineName',
    'hospitalName',
    'medicineDescription',
    'medicineIntakeTimes',
    'medicineIntakeDays',
    'medicineIntakeStopDay',
  ]);

  const formData = new FormData();
  formData.append('medicine', new Blob([JSON.stringify(params)], { type: 'application/json' }));
  if (imageFile) formData.append('image', imageFile);

  const response = await fetch(`${baseURL}/api/medicine`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: formData,
  });

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
};

export default addMedicine;
