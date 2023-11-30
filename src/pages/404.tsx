import { history, useIntl } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => {
  const intl = useIntl();
  return (
    <Result
      status="404"
      title="404"
      subTitle={intl.formatMessage({
        id: 'pages.404.subTitle',
        defaultMessage: 'Sorry, the page you visited does not exist.',
      })}
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          {intl.formatMessage({
            id: 'pages.returnToHome',
            defaultMessage: 'Return to Home',
          })}
        </Button>
      }
    />
  );
};

export default NoFoundPage;
