import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { useRef } from 'react';
//import { useIntl } from 'umi';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Account: React.FC = () => {
  //const intl = useIntl();

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const formRef = useRef<
    ProFormInstance<{
      userName: string;
      userEmail: string;
      useMode?: string;
    }>
  >();
  return (
    <PageContainer>
      <ProForm<{
        userName: string;
        userEmail: string;
        useMode?: string;
      }>
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          const val1 = await formRef.current?.validateFields();
          console.log('validateFields:', val1);
          const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
          console.log('validateFieldsReturnFormatValue:', val2);
          message.success('提交成功');
        }}
        formRef={formRef}
        params={{ id: '100' }}
        formKey="base-form-use-demo"
        dateFormatter={(value, valueType) => {
          console.log('---->', value, valueType);
          return value.format('YYYY/MM/DD HH:mm:ss');
        }}
        request={async () => {
          await waitTime(1500);
          return {
            name: currentUser?.user_name,
            email: currentUser?.user_email,
            useMode: 'chapter',
          };
        }}
        autoFocusFirstInput
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            //required
            //dependencies={[['contract', 'name']]}
            label="用户名"
            //tooltip="最长为 24 位"
            placeholder="请输入名称"
            //rules={[{ required: true, message: '这是必填项' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="email"
            fieldProps={{ disabled: true }}
            //required
            //dependencies={[['contract', 'name']]}
            label="邮箱"
            //tooltip="最长为 24 位"
            placeholder="请输入名称"
            //rules={[{ required: true, message: '这是必填项' }]}
          />
        </ProForm.Group>

        {/* <ProFormTextArea colProps={{ span: 24 }} name="address" label="个人简介" />
        <ProFormSelect
          width="md"
          label="国家/地区"
          name="level"
          valueEnum={{
            1: 'front end',
            2: 'back end',
            3: 'full stack',
          }}
        />

        <ProForm.Group>
          <ProFormSelect
            width={200}
            formItemProps={{ style: { marginRight: '-25px' } }}
            label="所在省"
            name="province"
            valueEnum={{
              1: 'front end',
              2: 'back end',
              3: 'full stack',
            }}
          />
          <ProFormSelect
            width={300}
            name="city"
            label="所在市"
            valueEnum={{
              1: 'front end',
              2: 'back end',
              3: 'full stack',
            }}
          />
        </ProForm.Group>
        <ProFormText
          name={['contract', 'name']}
          width="md"
          label="街道地址"
          placeholder="请输入名称"
        />
        <ProForm.Group>
          <ProFormText
            name={['contract', 'name']}
            width={100}
            formItemProps={{ style: { marginRight: '-25px' } }}
            label="联系电话"
            placeholder="请输入名称"
          />
          <ProFormText name={['contract', 'name']} width={300} label=" " placeholder="请输入名称" />
        </ProForm.Group> */}
      </ProForm>
    </PageContainer>
  );
};

export default Account;
