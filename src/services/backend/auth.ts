// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Send Email Verification POST /api/auth/email-verification */
export async function sendEmailVerification(body: API.Email, options?: { [key: string]: any }) {
  return request<API.SuccessResponse>('/api/auth/email-verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Forgot Password POST /api/auth/forgot-password */
export async function forgotPassword(body: API.Email, options?: { [key: string]: any }) {
  return request<API.SuccessResponse>('/api/auth/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Login POST /api/auth/login */
export async function login(body: API.LoginFields, options?: { [key: string]: any }) {
  return request<API.UserInfo>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Logout POST /api/auth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.SuccessResponse>('/api/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
