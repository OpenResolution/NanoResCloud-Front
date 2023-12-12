import { getUserConfigs } from '@/services/backend/config';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Form, message } from 'antd';

type TaskFormFields = {
  task_name: string;
  task_config_id: string;
};

const TaskForm = () => {
  const intl = useIntl();
  const [form] = Form.useForm<TaskFormFields>();
  return (
    <ModalForm<TaskFormFields>
      title="New Task"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          New
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values);
        message.success('Creation successful');
        return true;
      }}
    >
      <ProFormText
        name="task_name"
        label={intl.formatMessage({
          id: 'pages.task.fields.name',
          defaultMessage: 'Name',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormSelect
        name="task_config_id"
        label="Configuration"
        rules={[
          {
            required: true,
          },
        ]}
        params={{}}
        request={async (params) => {
          console.log(params);
          const response = await getUserConfigs({ current: 1, page_size: 10 });
          return response.data.map((item) => {
            // can add other information to the label to help user identify a configuration
            return { label: item.config_name, value: item.config_id };
          });
        }}
        placeholder="Please select a configuration"
      />
    </ModalForm>
  );
};
export default TaskForm;
