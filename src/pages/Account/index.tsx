import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Form, Input, Layout, List, Menu, Modal, Space, message } from 'antd';
import { useRef, useState } from 'react';

type ActiveTab = 'basic' | 'security';
type FormFields = {
  name: string;
  email: string;
};

const Basic: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const formRef = useRef<ProFormInstance<FormFields>>();
  return (
    <ProForm<FormFields>
      onFinish={async (values) => {
        // Handle the basic info update logic here
        console.log(values);
        const val1 = await formRef.current?.validateFields();
        console.log('validateFields:', val1);
        const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
        console.log('validateFieldsReturnFormatValue:', val2);
        message.success('Submitted successfully');
      }}
      formRef={formRef}
      formKey="account-form"
      request={async () => {
        return {
          name: currentUser?.name,
          email: currentUser?.email,
        };
      }}
      autoFocusFirstInput
    >
      <ProFormText
        width="md"
        name="name"
        label="Username"
        placeholder="Please enter an user name"
      />
      <ProFormText
        width="md"
        name="email"
        fieldProps={{ disabled: true }}
        label="Email"
        placeholder="Please enter an email address"
      />
    </ProForm>
  );
};

const Security: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values: { password: string; confirmPassword: string }) => {
    // Handle the password update logic here
    console.log(values);
    message.success('Submitted successfully');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <List
        itemLayout="horizontal"
        style={{ marginTop: '-12px' }}
        dataSource={[
          {
            title: 'Account Password',
            action: showModal,
          },
        ]}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="change-password" type="link" onClick={item.action}>
                Change
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.title} />
          </List.Item>
        )}
      />
      <Modal
        title="Change Password"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form name="updatePassword" initialValues={{ remember: true }} onFinish={handleOk}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your new password' }]}
            style={{ paddingTop: '12px' }}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

const Account: React.FC = () => {
  const { Header, Content, Sider } = Layout;
  const [activeTab, setActiveTab] = useState<ActiveTab>('basic');
  const handleMenuClick = (e: { key: React.Key }) => {
    setActiveTab(e.key as ActiveTab);
  };

  return (
    <PageContainer>
      <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>
        <Sider
          width={240}
          style={{
            paddingTop: '10px',
            backgroundColor: '#fff',
            borderRight: '1px solid #e8e8e8',
            overflow: 'auto',
          }}
          className="site-layout-background"
        >
          <Menu mode="inline" selectedKeys={[activeTab]} onClick={handleMenuClick}>
            <Menu.Item key="basic">Basic Settings</Menu.Item>
            <Menu.Item key="security">Security Settings</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ paddingLeft: '50px', backgroundColor: '#fff' }}>
          <Header style={{ fontSize: 20, padding: 0, backgroundColor: '#fff' }}>
            {activeTab === 'basic' ? 'Basic Settings' : 'Security Settings'}
          </Header>
          <Content
            style={{
              paddingTop: '12px',
              paddingRight: '24px',
              paddingBottom: '24px',
              overflow: 'auto',
            }}
          >
            {activeTab === 'basic' && <Basic />}
            {activeTab === 'security' && <Security />}
          </Content>
        </Layout>
      </Layout>
    </PageContainer>
  );
};

export default Account;
