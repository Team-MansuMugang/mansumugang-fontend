import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
  NoSuchMedicineError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  NoSuchCommentError,
  DeletedCommentError,
  NotTheAuthorOfTheComment,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const deleteComment = async (params) => {
  validateParameters(params, ['commentId']);

  const response = await fetch(`${baseURL}/api/post/comment/${params.commentId}/delete`, {
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
    if (result.errorType === 'NoSuchMedicineError') throw new NoSuchCommentError();
    if (result.errorType === 'NoSuchMedicineError') throw new DeletedCommentError();
    if (result.errorType === 'NoSuchMedicineError') throw new NotTheAuthorOfTheComment();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default deleteComment;
