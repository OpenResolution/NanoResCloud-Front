// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get Files GET /api/files */
export async function getFiles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFilesParams,
  options?: { [key: string]: any },
) {
  return request<API.FileItem[]>('/api/files', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create File POST /api/files */
export async function createFile(options?: { [key: string]: any }) {
  return request<API.SuccessResponse>('/api/files', {
    method: 'POST',
    ...(options || {}),
  });
}
