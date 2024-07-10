import { HttpResponseError } from '../utility/errors';

const baseURL = 'http://minnnisu.iptime.org';

const checkUsernameUnique = async (username) => {
  const response = await fetch(`${baseURL}/api/auth/check/username`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
    }),
  });

  if (!response.ok) {
    const errorResult = await response.json();
    if (errorResult.errorType === 'DuplicatedUsernameError') return false;

    throw new HttpResponseError(response.status, errorResult.message);
  }

  return true;
};

export default checkUsernameUnique;
