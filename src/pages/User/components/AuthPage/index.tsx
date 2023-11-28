import { Footer } from '@/components';
import { LoginForm } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, SelectLang, useIntl } from '@umijs/max';
import { Alert } from 'antd';
import React from 'react';
import Settings from '../../../../../config/defaultSettings';

type LoginFormProps = React.ComponentProps<typeof LoginForm>;

// inherits LoginFormProps and use Omit to avoid duplicating key names
interface AuthPageProps extends Omit<LoginFormProps, 'childrenOfLoginForm' | 'title'> {
  children?: React.ReactNode;
  title: string;
}

export const ErrorMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

/**
 * Authentication page, a layout used for both login and register
 */
export function AuthPage({ children, title, ...restProps }: AuthPageProps): React.ReactNode {
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {title} - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.png" />}
          title="NanoRes Cloud"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          // pass on the rest of the props
          {...restProps}
        >
          {children}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
}
