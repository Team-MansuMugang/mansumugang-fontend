import {
  HttpResponseError,
  UserNotFoundError,
  AccessDeniedError,
  NoSuchMedicineError,
} from '../utility/errors.js';

const baseURL = 'http://minnnisu.iptime.org';

const medicineDetailRetrieval = async (medicineId) => {
  const response = await fetch(`${baseURL}/api/medicine/${medicineId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'NoSuchMedicineError') throw new NoSuchMedicineError();

    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};

export default medicineDetailRetrieval;