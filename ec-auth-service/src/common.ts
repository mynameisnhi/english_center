import axios from 'axios';
import { nanoid } from 'nanoid';

export const generateID = (
  ids: string[] = [],
  size = 5,
  options: { prefix?: string } = {},
): string => {
  const id = `${options?.prefix ?? ''}${nanoid(size)}`;
  if (ids.includes(id)) return generateID(ids, size, options);
  return id;
};

export const callAPI = async (
  url: string,
  params?: any,
  method: 'GET' | 'POST' | 'PUT' = 'GET',
) => {
  try {
    if (method === 'POST') {
      const response = await axios.post(url, params, {
        baseURL: process.env.API_URL,
        withCredentials: true,
      });
      const data = response.data;
      return data;
    }
    if (method === 'PUT') {
      const response = await axios.put(url, params, {
        baseURL: process.env.API_URL,
        withCredentials: true,
      });
      const data = response.data;
      return data;
    }
    const response = await axios.get(url, {
      baseURL: process.env.API_URL,
      withCredentials: true,
      params,
    });
    if (response.status !== 200) return null;
    const data = response.data;
    return data;
  } catch {
    return null;
  }
};
