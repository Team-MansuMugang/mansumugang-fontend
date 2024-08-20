import {
  HttpResponseError,
  NotValidAccessTokenError,
  UserNotFoundError,
  AccessDeniedError,
  ExpiredAccessTokenError,
  RecordInfoNotFound,
  RecordDeleteError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const deleteVoiceMessage = async (params) => {
  validateParameters(params, ['recordId']);

  const response = await fetch(`${baseURL}/api/record/delete/${params.recordId}`, {
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
    if (result.errorType === 'UserRecordInfoNotFoundError') throw new RecordInfoNotFound();
    if (result.errorType === 'RecordDeleteError') throw new RecordDeleteError();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default deleteVoiceMessage;
