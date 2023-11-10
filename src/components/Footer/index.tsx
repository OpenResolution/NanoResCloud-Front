import { HomeOutlined, LinkedinOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'NanoRes LLC',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'home',
          title: <HomeOutlined />,
          href: 'https://nanoresolution.com/',
          blankTarget: true,
        },
        {
          key: 'linkedin',
          title: <LinkedinOutlined />,
          href: 'https://www.linkedin.com/company/nanores-llc/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
