import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  NotValidAccessTokenError,
  AccessDeniedError,
  ExpiredAccessTokenError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const submitFcmToken = async (params) => {
  validateParameters(params, ['fcmToken']);

  const response = await fetch(`${baseURL}/api/fcm/token/save`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidAccessTokenError') throw new NotValidAccessTokenError();
    if (result.errorType === 'ExpiredAccessTokenError') throw new ExpiredAccessTokenError();
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'AccessDeniedError') throw new NotValidRequestError();

    throw new HttpResponseError(response.status, result.message);
  }
};
export default submitFcmToken;
