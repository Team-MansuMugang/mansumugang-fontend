import {
  HttpResponseError,
  PasswordMismatchError,
  DuplicatedUsernameError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const submitPatientSignup = async (params) => {
  validateParameters(params, ['username', 'password', 'passwordCheck', 'name', 'birthdate']);

  const response = await fetch(`${baseURL}/api/auth/signup/patient`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotEqualPasswordAndPasswordCheck') throw new PasswordMismatchError();
    if (result.errorType === 'DuplicatedUsernameError') throw new DuplicatedUsernameError();
    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};
export default submitPatientSignup;
