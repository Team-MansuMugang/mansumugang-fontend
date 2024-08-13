import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

// TODO: 이미지 파일 추가 기능 구현

const addMedicine = async (params) => {
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
  formData.append('medicine', JSON.stringify(params)); // JSON 데이터를 문자열로 변환하여 추가
  // formData.append('image', imageFile); // 이미지 파일 추가

  const response = await fetch(`${baseURL}/api/medicine`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidRequestError')
      throw new NotValidRequestError(result.errorDescriptions);
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default addMedicine;
