import {
  HttpResponseError,
  UserNotFoundError,
  AccessDeniedError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const updateMyInfo = async (params) => {
  validateParameters(params, ['userId', 'name', 'birthdate', 'telephone', 'email', 'nickname']);

  const { userId } = params;
  delete params.userId; // userId JSON에 추가하지 않음

  const response = await fetch(`${baseURL}/api/user/protector/${userId}`, {
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
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default updateMyInfo;
