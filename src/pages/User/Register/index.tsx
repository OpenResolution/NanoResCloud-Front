import { register, registerEmailVerification } from '@/services/backend/oauth';
import { LockOutlined, MailOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormCaptcha, ProFormDependency, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Link, history, useIntl } from '@umijs/max';
import { Button, Tabs, message } from 'antd';
import React from 'react';
import { AuthPage } from '../components/AuthPage';

const Register: React.FC = () => {
  const intl = useIntl();

  const passwordPattern =
    /^(?![A-z0-9]+$)(?=.[^%&',;=?$\x22])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/;
  const passwordPatternMessage = intl.formatMessage({
    id: 'pages.register.password.invalid',
    defaultMessage:
      'Password should contain 8-20 characters and include uppercase and lowercase letters, numbers, and special symbols.',
  });

  const handleGetVerificationCode = async (email: string) => {
    try {
      // use shorthand syntax for object property
      const response = await registerEmailVerification({ email } as API.UserRegisEmailSendSchema);
      console.log(response);
      message.success(
        intl.formatMessage({
          id: 'pages.register.verificationCode.send.success',
          defaultMessage: `Verification code sent to`,
        }) +
          ' ' +
          email,
      );
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.register.verificationCode.send.failure',
          defaultMessage: 'Failed to send verification code',
        }),
      );
    }
  };

  const handleSubmit = async (values: API.UserRegistrationSchema) => {
    try {
      const response = await register(values);
      if (response.status_code === 200) {
        message.success(
          intl.formatMessage({
            id: 'pages.register.success',
            defaultMessage: 'Registration successful!',
          }),
        );
        history.push('/user/login');
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.register.failure',
          defaultMessage: 'Registration failed, please try again!',
        }),
      );
    }
  };

  return (
    <AuthPage
      title={intl.formatMessage({
        id: 'menu.register',
        defaultMessage: 'Register',
      })}
      actionLinks={
        <Link to="/user/login">
          {intl.formatMessage({
            id: 'pages.register.login',
            defaultMessage: 'Login Now',
          })}
        </Link>
      }
      submitter={{
        // replace the default login button with custom (register) button
        // eslint-disable-next-line
        render: (props, doms) => {
          return [
            // "block" attribute of Button makes the button match its parent's width
            <Button type="primary" key="submit" onClick={() => props.form?.submit?.()} block>
              {intl.formatMessage({
                id: 'pages.register.submit',
                defaultMessage: 'Register',
              })}
            </Button>,
          ];
        },
      }}
      onFinish={async (values) => {
        await handleSubmit(values as API.UserRegistrationSchema);
      }}
    >
      <Tabs
        activeKey={'account'}
        centered
        items={[
          {
            key: 'account',
            label: intl.formatMessage({
              id: 'pages.register.tab',
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
          {
            type: 'email',
            message: intl.formatMessage({
              id: 'pages.register.email.invalid',
              defaultMessage: 'Please enter a valid email address!',
            }),
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
              id: 'pages.register.verificationCode.resend',
              defaultMessage: 'Resend',
            })} (${count}s)`;
          }
          return intl.formatMessage({
            id: 'pages.register.verificationCode.get',
            defaultMessage: 'Get code',
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
        onGetCaptcha={handleGetVerificationCode}
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
            // set name as undefined in order to exclude this field in submission
            name={undefined}
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.register.confirmPassword.placeholder',
              defaultMessage: 'Confirm Password',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'pages.register.confirmPassword.required',
                  defaultMessage: 'Please enter password again!',
                }),
              },
              {
                // check whether two passwords match
                validator: (rule, value) =>
                  new Promise<void>((resolve, reject) => {
                    if (password === value) {
                      resolve();
                    } else {
                      reject(
                        new Error(
                          intl.formatMessage({
                            id: 'pages.register.confirmPassword.invalid',
                            defaultMessage: 'Passwords do not match!',
                          }),
                        ),
                      );
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
