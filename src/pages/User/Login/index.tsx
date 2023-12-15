import { login } from '@/services/backend/auth';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Link, history, useIntl, useModel } from '@umijs/max';
import { Tabs, message } from 'antd';
import React from 'react';
import { flushSync } from 'react-dom';
import { AuthPage } from '../components/AuthPage';

const Login: React.FC = () => {
  const intl = useIntl();
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

  function setUserInfo(userInfo: API.UserInfo) {
    localStorage.setItem('access_token', userInfo.access_token);
  }

  const handleSubmit = async (values: API.LoginFields) => {
    try {
      const userInfo = await login(values);
      message.success(
        intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Login successful!',
        }),
      );
      setUserInfo(userInfo);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.login.failure',
          defaultMessage: 'Login failed, please try again!',
        }),
      );
    }
  };

  return (
    <AuthPage
      title={intl.formatMessage({
        id: 'menu.login',
        defaultMessage: 'Login',
      })}
      initialValues={{
        autoLogin: true,
      }}
      actionLinks={
        <Link to="/user/register">
          {intl.formatMessage({
            id: 'pages.login.register',
            defaultMessage: 'Register Now',
          })}
        </Link>
      }
      onFinish={async (values) => {
        await handleSubmit(values as API.LoginFields);
      }}
    >
      <Tabs
        centered
        items={[
          {
            key: 'login',
            label: intl.formatMessage({
              id: 'pages.login.tab',
              defaultMessage: 'Login',
            }),
          },
        ]}
      />

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
