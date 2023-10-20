// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/* send authentication to backend */
export async function authVerify(
    params: {
      access_token: string;
      expires_at: string;
      expires_in: string;
      refresh_token: string;
      token_type: string;
      type: string;
    },
    options?: { [key: string]: any },
  ) {
    return request('/v1/verify', {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }