import { login } from '@/services/nanores-cloud/login';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Link, history, useIntl, useModel } from '@umijs/max';
import { Divider, Tabs, message } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { AuthPage, ErrorMessage } from '../components/AuthPage';

const Login: React.FC = () => {
  const intl = useIntl();
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, type: 'account' });
      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Login successful!',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.frontendErrorMessage',
        defaultMessage: 'Login failed, please try again!',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status } = userLoginState;

  return (
    <AuthPage
      title={intl.formatMessage({
        id: 'menu.login',
        defaultMessage: 'Login',
      })}
      initialValues={{
        autoLogin: true,
      }}
      actions={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Divider plain>
            <span
              style={{
                fontWeight: 'normal',
                fontSize: 14,
              }}
            >
              {intl.formatMessage({
                id: 'pages.login.or',
                defaultMessage: 'OR',
              })}
            </span>
          </Divider>
          <Link to="/user/register">
            {intl.formatMessage({
              id: 'pages.login.register',
              defaultMessage: 'Register Now',
            })}
          </Link>
        </div>
      }
      onFinish={async (values) => {
        await handleSubmit(values as API.LoginParams);
      }}
    >
      <Tabs
        centered
        items={[
          {
            key: 'account',
            label: intl.formatMessage({
              id: 'pages.login.tab',
              defaultMessage: 'Login',
            }),
          },
        ]}
      />

      {status === 'error' && (
        <ErrorMessage
          content={intl.formatMessage({
            id: 'pages.login.backendErrorMessage',
            defaultMessage: 'Incorrect email or password',
          })}
        />
      )}

      <ProFormText
        name="email"
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined />,
        }}
        placeholder={intl.formatMessage({
          id: 'pages.login.email.placeholder',
          defaultMessage: 'Email',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.login.email.required"
                defaultMessage="Please enter email!"
              />
            ),
          },
          {
            // validate email format
            type: 'email',
            message: intl.formatMessage({
              id: 'pages.login.email.invalid',
              defaultMessage: 'Please enter a valid email address!',
            }),
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder={intl.formatMessage({
          id: 'pages.login.password.placeholder',
          defaultMessage: 'Password',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.login.password.required"
                defaultMessage="Please enter password!"
              />
            ),
          },
        ]}
      />
      <div
        style={{
          marginBottom: 24,
        }}
      >
        <ProFormCheckbox noStyle name="autoLogin">
          <FormattedMessage id="pages.login.rememberMe" defaultMessage="Remember me" />
        </ProFormCheckbox>
        <a
          style={{
            float: 'right',
          }}
        >
          <FormattedMessage id="pages.login.forgotPassword" defaultMessage="Forgot password?" />
        </a>
      </div>
    </AuthPage>
  );
};

export default Login;
