import { skyvaultApi, signupEndpoint } from './endpoint';

export const signupWithEmail = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await skyvaultApi.post(signupEndpoint, {
    name,
    email,
    password,
  });
  return response;
};
