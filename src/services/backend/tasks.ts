// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get Tasks GET /api/tasks */
export async function getTasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTasksParams,
  options?: { [key: string]: any },
) {
  return request<API.SuccessResponse>('/api/tasks', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create Task POST /api/tasks */
export async function createTask(options?: { [key: string]: any }) {
  return request<any>('/api/tasks', {
    method: 'POST',
    ...(options || {}),
  });
}
