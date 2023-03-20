import { skyvaultApi, loginEndpoint } from './endpoint';

export const loginWithEmail = async (loginDetails: {
  email: string;
  password: string;
}) => {
  const response = await skyvaultApi.post(loginEndpoint, { loginDetails });
  return response;
};
