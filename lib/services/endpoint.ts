import axios from 'axios';

export const skyvaultApi = axios.create({
  baseURL: 'https://api.skyvault.tanchohang.dev/',
});

export const signupEndpoint = '/signup';
export const loginEndpoint = '/login';
export const fileEndpoint = '/file';
