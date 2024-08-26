import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  DeletedReplyError,
  NoSuchReplyError,
  NotTheAuthorOfTheReply,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const deleteReply = async (params) => {
  validateParameters(params, ['replyId']);

  const response = await fetch(`${baseURL}/api/post/comment/reply/${params.replyId}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidAccessTokenError') throw new NotValidAccessTokenError();
    if (result.errorType === 'ExpiredAccessTokenError') throw new ExpiredAccessTokenError();
    if (result.errorType === 'NotValidRequestError')
      throw new NotValidRequestError(result.errorDescriptions);
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'NoSuchMedicineError') throw new NoSuchReplyError();
    if (result.errorType === 'NoSuchMedicineError') throw new DeletedReplyError();
    if (result.errorType === 'NoSuchMedicineError') throw new NotTheAuthorOfTheReply();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default deleteReply;
