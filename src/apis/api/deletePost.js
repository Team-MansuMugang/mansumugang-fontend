import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  NoSuchPostError,
  S3_DELETE_OBJECT_ERROR,
  ImageDeleteError,
  NotTheAuthorOfThePost,
} from '../utility/errors.js';

const baseURL = 'http://minnnisu.iptime.org';

const deletePost = async (id) => {
  const response = await fetch(`${baseURL}/api/post/${id}/delete`, {
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
    if (result.errorType === 'NoSuchPostError') throw new NoSuchPostError();
    if (result.errorType === 'NotTheAuthorOfThePost') throw new NotTheAuthorOfThePost();
    if (result.errorType === 'S3_DELETE_OBJECT_ERROR') throw new S3_DELETE_OBJECT_ERROR();
    if (result.errorType === 'ImageDeleteError') throw new ImageDeleteError();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default deletePost;
