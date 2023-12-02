// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get Configs GET /api/config/configs */
export async function getConfigs(body: API.QueryPageModel, options?: { [key: string]: any }) {
  return request<API.GetConfigBackModels>('/api/config/configs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create Config POST /api/config/create_config */
export async function createConfig(options?: { [key: string]: any }) {
  return request<API.ConfigFormBackModels>('/api/config/create_config', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Update Config POST /api/config/update_config */
export async function updateConfig(options?: { [key: string]: any }) {
  return request<API.ConfigFormBackModels>('/api/config/update_config', {
    method: 'POST',
    ...(options || {}),
  });
}
