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
export async function getTasks(body: API.QueryPageModel, options?: { [key: string]: any }) {
  return request<API.GetConfigBackModels>('/api/task/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
