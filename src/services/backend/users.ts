// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Register POST /api/users */
export async function register(body: API.RegisFields, options?: { [key: string]: any }) {
  return request<API.SuccessResponse>('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Me 鉴权用户,从header中读取
:return: GET /api/users/me */
export async function me(options?: { [key: string]: any }) {
  return request<API.UserInfo>('/api/users/me', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Check Email Token GET /api/users/password */
export async function checkEmailToken(options?: { [key: string]: any }) {
  return request<any>('/api/users/password', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update Password POST /api/users/password */
export async function updatePassword(options?: { [key: string]: any }) {
  return request<any>('/api/users/password', {
    method: 'POST',
    ...(options || {}),
  });
}
