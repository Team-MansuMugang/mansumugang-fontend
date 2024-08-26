import {
  HttpResponseError,
  UserNotFoundError,
  AccessDeniedError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  NoUserProfileImageError,
} from '../utility/errors.js';

const baseURL = 'http://minnnisu.iptime.org';

const updateMedicine = async () => {
  const response = await fetch(`${baseURL}/api/user/protector/profileImage`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidAccessTokenError') throw new NotValidAccessTokenError();
    if (result.errorType === 'ExpiredAccessTokenError') throw new ExpiredAccessTokenError();
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'NoUserProfileImageError') throw new NoUserProfileImageError();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default updateMedicine;
