import {
  HttpResponseError,
  PasswordMismatchError,
  DuplicatedUsernameError,
  DuplicatedNicknameError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const submitProtectorSignup = async (params) => {
  validateParameters(params, ['username', 'password', 'passwordCheck', 'name', 'birthdate']);

  const response = await fetch(`${baseURL}/api/auth/signup/protector`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotEqualPasswordAndPasswordCheck') throw new PasswordMismatchError();
    if (result.errorType === 'DuplicatedUsernameError') throw new DuplicatedUsernameError();
    if (result.errorType === 'DuplicatedNicknameError') throw new DuplicatedNicknameError();
    throw new HttpResponseError(response.status, result.message);
  }

  return result;
};
export default submitProtectorSignup;
