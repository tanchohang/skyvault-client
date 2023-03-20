import { skyvaultApi, fileEndpoint } from './endpoint';

export const uploadFiles = async ({ files }: any) => {
  const response = await skyvaultApi.post(fileEndpoint, files);
  return response;
};
