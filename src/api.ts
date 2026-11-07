import axios, { type AxiosResponse, type AxiosRequestConfig } from "axios";

import { API_URL } from "src/constants";

const apiClient = axios.create({
  baseURL: API_URL,
});

export async function fetchDelete<T = void>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.delete<T>(url, config);
  return response.data;
}

export async function fetchGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.get<T>(url, config);
  return response.data;
}

export async function fetchPost<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.post<T>(url, body, config);
  return response.data;
}
