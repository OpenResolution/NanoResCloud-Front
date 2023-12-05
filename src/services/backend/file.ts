// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Create File POST /api/file/create_file */
export async function createFile(options?: { [key: string]: any }) {
  return request<API.FileFormBackModels>('/api/file/create_file', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get User File GET /api/file/getUserFile */
export async function getUserFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserFileParams,
  options?: { [key: string]: any },
) {
  return request<API.GetFileBackModels>('/api/file/getUserFile', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
