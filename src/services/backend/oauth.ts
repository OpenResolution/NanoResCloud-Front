// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Current User 鉴权用户,从header中读取
:return: GET /api/oauth/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.UserInfoSchema>('/api/oauth/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Login POST /api/oauth/login */
export async function login(body: API.UserLoginSchema, options?: { [key: string]: any }) {
  return request<API.UserLoginBackSchema>('/api/oauth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Logout POST /api/oauth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.UserLogoutBackSchema>('/api/oauth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Register POST /api/oauth/register */
export async function register(body: API.UserRegistrationSchema, options?: { [key: string]: any }) {
  return request<API.UserRegistrationBackSchema>('/api/oauth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Register Email Verification POST /api/oauth/register/email-verification */
export async function registerEmailVerification(
  body: API.UserRegisEmailSendSchema,
  options?: { [key: string]: any },
) {
  return request<API.UserRegisEmailBackSchema>('/api/oauth/register/email-verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Reset Password POST /api/oauth/reset_password */
export async function resetPassword(
  body: API.UserResetPasswordSchema,
  options?: { [key: string]: any },
) {
  return request<API.UserResetPasswordBackSchema>('/api/oauth/reset_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Reset Password Verification POST /api/oauth/reset_password/email-verification */
export async function resetPasswordVerification(
  body: API.UserRegisEmailSendSchema,
  options?: { [key: string]: any },
) {
  return request<API.UserResetPasswordBackSchema>('/api/oauth/reset_password/email-verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
