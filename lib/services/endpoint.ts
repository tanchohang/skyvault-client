import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3500/' : 'https://api.skyvault.tanchohang.dev/';

export const skyvaultApi = axios.create({
  baseURL: baseURL,

  headers: { 'Content-Type': 'application/json' },
});

export const signupEndpoint = '/signup';
export const loginEndpoint = '/login';
export const fileEndpoint = '/files';
export const projectEndpoint = '/projects';
