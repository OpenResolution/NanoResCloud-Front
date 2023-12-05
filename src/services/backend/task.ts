// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Create Task POST /api/task/create_task */
export async function createTask(options?: { [key: string]: any }) {
  return request<any>('/api/task/create_task', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get Tasks GET /api/task/tasks */
export async function getTasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTasksParams,
  options?: { [key: string]: any },
) {
  return request<API.GetConfigBackModels>('/api/task/tasks', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
