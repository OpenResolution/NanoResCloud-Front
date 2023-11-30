// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get user tasks GET /api/task */
export async function getUserTasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserTasksParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskList>('/api/task', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
