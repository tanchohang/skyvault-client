import { getSession } from 'next-auth/react';
import { skyvaultApi, fileEndpoint } from './endpoint';

export const getAllFiles = async () => {
  const session = await getSession();

  const response = await skyvaultApi.get(`${fileEndpoint}`, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};

export const getAllFilesByProject = async ({ pid }: { pid: string }) => {
  const session = await getSession();

  const response = await skyvaultApi.get(`${fileEndpoint}/project/${pid}`, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};

export const getTrashedFiles = async ({ pid }: { pid: string }) => {
  const session = await getSession();

  const response = await skyvaultApi.get(`${fileEndpoint}/trash/${pid}`, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};

export const uploadFiles = async ({ formData }: { formData: FormData }) => {
  const session = await getSession();
  const response = await skyvaultApi.post(`${fileEndpoint}`, formData, {
    headers: { Authorization: `Bearer ${session?.user.access_token}`, 'content-type': 'multipart/form-data' },
  });
  return response;
};

export const updateFile = async ({ id, name }: { id: string; name: string }) => {
  const session = await getSession();

  const response = await skyvaultApi.put(`${fileEndpoint}/${id}`, { name }, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};

export const restoreFile = async ({ id }: { id: string }) => {
  const session = await getSession();
  const response = await skyvaultApi.put(
    `${fileEndpoint}/trash/${id}`,
    { id },
    { headers: { authorization: `Bearer ${session?.user.access_token}` } }
  );

  return response;
};

export const trashFile = async ({ id }: { id: string }) => {
  const session = await getSession();
  const response = await skyvaultApi.delete(`${fileEndpoint}/trash/${id}`, { headers: { authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};

export const deleteFile = async ({ id }: { id: string }) => {
  const session = await getSession();

  const response = await skyvaultApi.delete(`${fileEndpoint}/${id}`, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};

export const emptyTrash = async () => {
  const session = await getSession();

  const response = await skyvaultApi.delete(`${fileEndpoint}/trash`, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};
