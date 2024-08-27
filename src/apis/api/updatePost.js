import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
  NotValidAccessTokenError,
  ExpiredAccessTokenError,
  NoSuchCategoryError,
  NoImageFileError,
  ImageSaveError,
} from '../utility/errors.js';
import { validateParameters } from '../utility/validate.js';

const baseURL = 'http://minnnisu.iptime.org';

const updatePost = async (params, imageFiles) => {
  validateParameters(params, ['postId', 'title', 'content', 'categoryCode']);

  const formData = new FormData();
  formData.append('post', new Blob([JSON.stringify(params)], { type: 'application/json' }));
  if (imageFiles && imageFiles.length > 0) {
    await Promise.all(
      imageFiles.map(async (file) => {
        const blob = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(new Blob([reader.result], { type: file.type }));
          reader.readAsArrayBuffer(file);
        });
        formData.append('imageFiles', blob, file.name);
      }),
    );
  }

  const response = await fetch(`${baseURL}/api/post`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    if (result.errorType === 'NotValidAccessTokenError') throw new NotValidAccessTokenError();
    if (result.errorType === 'ExpiredAccessTokenError') throw new ExpiredAccessTokenError();
    if (result.errorType === 'NotValidRequestError')
      throw new NotValidRequestError(result.errorDescriptions);
    if (result.errorType === 'UserNotFoundError') throw new UserNotFoundError();
    if (result.errorType === 'AccessDeniedError') throw new AccessDeniedError();
    if (result.errorType === 'NoSuchCategoryError') throw new NoSuchCategoryError();
    if (result.errorType === 'NoImageFileError') throw new NoImageFileError();
    if (result.errorType === 'ImageSaveError') throw new ImageSaveError();

    throw new HttpResponseError(response.status, result.message);
  }
};

export default updatePost;
