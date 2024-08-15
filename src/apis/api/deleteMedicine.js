import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
  NoSuchMedicineError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const deleteMedicine = async (params) => {
  validateParameters(params, ['patientId', 'medicineId']);

  const response = await fetch(`${baseURL}/api/medicine/${params.medicineId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify({
      patientId: params.patientId,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidRequestError')
      throw new NotValidRequestError(result.errorDescriptions);
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'NoSuchMedicineError') throw new NoSuchMedicineError();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default deleteMedicine;