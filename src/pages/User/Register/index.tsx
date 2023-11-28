import { LockOutlined, MailOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormCaptcha, ProFormDependency, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Link, useIntl } from '@umijs/max';
import { Button, Divider, Tabs } from 'antd';
import React from 'react';
import { AuthPage } from '../components/AuthPage';

const Register: React.FC = () => {
  const passwordPattern =
    /^(?![A-z0-9]+$)(?=.[^%&',;=?$\x22])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/;
  const passwordPatternMessage =
    'Password should contain 8-20 characters and include uppercase and lowercase letters, numbers, and special symbols.';

  const intl = useIntl();

  return (
    <AuthPage
      title={intl.formatMessage({
        id: 'menu.register',
        defaultMessage: 'Register',
      })}
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
              OR
            </span>
          </Divider>
          <Link to="/user/login">Login Now</Link>
        </div>
      }
      submitter={{
        // replace the default login button with custom (register) button
        // eslint-disable-next-line
        render: (props, doms) => {
          return [
            // "block" attribute of Button makes the button match its parent's width
            <Button type="primary" key="submit" onClick={() => props.form?.submit?.()} block>
              Register
            </Button>,
          ];
        },
      }}
    >
      <Tabs
        activeKey={'account'}
        centered
        items={[
          {
            key: 'account',
            label: intl.formatMessage({
              id: 'pages.register.accountRegister.tab',
              defaultMessage: 'Register',
            }),
          },
        ]}
      />
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
        }}
        placeholder={intl.formatMessage({
          id: 'pages.register.username.placeholder',
          defaultMessage: 'Username',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.register.username.required"
                defaultMessage="Please enter username!"
              />
            ),
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
          id: 'pages.register.email.placeholder',
          defaultMessage: 'Email',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.register.email.required"
                defaultMessage="Please enter email!"
              />
            ),
          },
        ]}
      />
      <ProFormCaptcha
        phoneName="email"
        fieldProps={{
          size: 'large',
          prefix: <SafetyOutlined />,
        }}
        captchaProps={{
          size: 'large',
        }}
        placeholder={intl.formatMessage({
          id: 'pages.register.verificationCode.placeholder',
          defaultMessage: 'Verification code',
        })}
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${intl.formatMessage({
              id: 'pages.register.resend',
              defaultMessage: 'Resend',
            })} (${count}s)`;
          }
          return intl.formatMessage({
            id: 'pages.register.verificationCode.get',
            defaultMessage: 'Get Code',
          });
        }}
        name="verification_code"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.register.verificationCode.required"
                defaultMessage="Please enter verification code!"
              />
            ),
          },
        ]}
        onGetCaptcha={async (verificationCode) => {}} // eslint-disable-line
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder={intl.formatMessage({
          id: 'pages.register.password.placeholder',
          defaultMessage: 'Password',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.register.password.required"
                defaultMessage="Please enter password!"
              />
            ),
          },
          { pattern: passwordPattern, message: passwordPatternMessage },
        ]}
      />
      <ProFormDependency name={['password']}>
        {({ password }) => (
          <ProFormText.Password
            name="confirm_password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="Confirm password"
            rules={[
              { required: true },
              {
                // check whether two passwords match
                validator: (rule, value) =>
                  new Promise<void>((resolve, reject) => {
                    if (password === value) {
                      resolve();
                    } else {
                      reject(new Error('Passwords do not match!'));
                    }
                  }),
              },
            ]}
          />
        )}
      </ProFormDependency>
    </AuthPage>
  );
};

export default Register;
