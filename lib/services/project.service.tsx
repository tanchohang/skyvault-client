import { getSession } from 'next-auth/react';
import { projectEndpoint, skyvaultApi } from './endpoint';

export const getAllProject = async () => {
  const session = await getSession();
  const response = await skyvaultApi.get(projectEndpoint, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};

export const getProjectById = async ({ id }: { id: string }) => {
  const session = await getSession();

  const response = await skyvaultApi.get(`${projectEndpoint}/${id}`, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};
export const getProjectByName = async ({ name }: { name: string }) => {
  const session = await getSession();

  const response = await skyvaultApi.get(`${projectEndpoint}/${name}`, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};
export const createProject = async ({ name }: { name: string }) => {
  const session = await getSession();

  const response = await skyvaultApi.post(projectEndpoint, { name }, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};
export const updateProject = async ({ id, name }: { id: string; name: string }) => {
  const session = await getSession();

  const response = await skyvaultApi.put(
    `${projectEndpoint}/${id}`,
    { name },
    { headers: { Authorization: `Bearer ${session?.user.access_token}` } }
  );
  return response;
};

export const deleteProject = async ({ id }: { id: string }) => {
  const session = await getSession();

  const response = await skyvaultApi.delete(`${projectEndpoint}/${id}`, { headers: { Authorization: `Bearer ${session?.user.access_token}` } });
  return response;
};
