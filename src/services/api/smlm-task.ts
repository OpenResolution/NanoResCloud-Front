// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** get tasks of current user POST/api/smlm-task-2d/getUserTask */
export async function getUserTasks(body: API.GetUserTasksParams, options?: { [key: string]: any }) {
  return request<API.GetUserTasksResult>('/api/smlm-task-2d/getUserTasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}