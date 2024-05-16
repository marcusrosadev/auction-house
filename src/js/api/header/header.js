import { storage } from '../../utils/storage/storage';
import { API_KEY } from '../../config/config';

export const fetchWithHeaders = async (url, method, body) => {
  const accessToken = storage.getItem('accessToken');
  console.log(accessToken)
  console.log(API_KEY)

  const headers = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
    headers['X-Noroff-API-Key'] = API_KEY;
  }
  const options = {
    method,
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  await handleErrors(response);
  return response.json();
};

const handleErrors = async (response) => {
  if (response.ok) return response;

  const errorContent = await response.text(); // Using text to avoid issues if the body is not JSON
  let errorMessage;
  try {
    const errorData = JSON.parse(errorContent);
    errorMessage =
      errorData.errors && errorData.errors.length > 0
        ? errorData.errors[0].message
        : errorContent; // Default to raw text if parsing fails
  } catch {
    errorMessage = errorContent;
  }
  throw new Error(`${response.status}: ${errorMessage}`);
};
