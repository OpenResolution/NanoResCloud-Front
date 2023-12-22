import { getConfigs } from '@/services/backend/configs';
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
          const configs = await getConfigs({ current: 1, page_size: 10 });
          return configs.map((config) => {
            // can add other information to the label to help user identify a configuration
            return { label: config.name, value: config.id };
          });
        }}
        placeholder="Please select a configuration"
      />
    </ModalForm>
  );
};
export default TaskForm;
