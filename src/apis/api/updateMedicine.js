import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
  NoSuchMedicineError,
  AlreadyExistMedicineIntakeTimeError,
  NoSuchMedicineIntakeTimeError,
  AlreadyExistMedicineIntakeDayError,
  NoSuchMedicineIntakeDayError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

// TODO: 이미지 파일 추가 기능 구현

/**
 * @param {Object} params - 약 정보를 업데이트하기 위한 매개변수.
 * @param {string} params.medicineId - 약 ID.
 * @param {string} params.medicineName - 약 이름.
 * @param {string} params.hospitalName - 병원 이름.
 * @param {string} params.medicineDescription - 메모 또는 약 설명.
 * @param {Array<string>} params.medicineIntakeTimeToAdd - 추가할 약 복용 시간 배열.
 * @param {Array<string>} params.medicineIntakeTimeToDelete - 삭제할 약 복용 시간 배열.
 * @param {Array<string>} params.medicineIntakeDayToAdd - 추가할 약 복용 요일 배열.
 * @param {Array<string>} params.medicineIntakeDayToDelete - 삭제할 약 복용 요일 배열.
 * @param {string} params.medicineIntakeStopDay - 약 복용 중단일.
 * @throws {NotValidRequestError} 요청 매개변수가 유효하지 않은 경우.
 * @throws {UserNotFoundError} 사용자를 찾을 수 없는 경우.
 * @throws {AccessDeniedError} 접근이 거부된 경우.
 * @throws {NoSuchMedicineError} 약을 찾을 수 없는 경우.
 * @throws {AlreadyExistMedicineIntakeTimeError} 이미 존재하는 약 복용 시간인 경우.
 * @throws {NoSuchMedicineIntakeTimeError} 존재하지 않는 약 복용 시간인 경우.
 * @throws {AlreadyExistMedicineIntakeDayError} 이미 존재하는 약 복용 요일인 경우.
 * @throws {NoSuchMedicineIntakeDayError} 존재하지 않는 약 복용 요일인 경우.
 * @throws {HttpResponseError} HTTP 응답 오류가 발생한 경우.
 */
const updateMedicine = async (params) => {
  validateParameters(params, ['medicineId']);

  const { medicineId } = params;
  delete params.medicineId; // medicineId는 JSON에 추가하지 않음

  const formData = new FormData();
  formData.append('medicine', JSON.stringify(params)); // JSON 데이터를 문자열로 변환하여 추가
  // formData.append('image', imageFile); // 이미지 파일 추가

  const response = await fetch(`${baseURL}/api/medicine/${medicineId}`, {
    method: 'PATCH',
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
    if (result.errorType === 'NoSuchMedicineError') throw new NoSuchMedicineError();
    if (result.errorType === 'AlreadyExistMedicineIntakeTimeError')
      throw new AlreadyExistMedicineIntakeTimeError();
    if (result.errorType === 'NoSuchMedicineIntakeTimeError')
      throw new NoSuchMedicineIntakeTimeError();
    if (result.errorType === 'AlreadyExistMedicineIntakeDayError')
      throw new AlreadyExistMedicineIntakeDayError();
    if (result.errorType === 'NoSuchMedicineIntakeDayError')
      throw new NoSuchMedicineIntakeDayError();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default updateMedicine;
