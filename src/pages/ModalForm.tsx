import {
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
  StepsForm,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';

export type FormValueType = API.ConfigFormFields;

export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  modalOpen: boolean;
  values?: API.ConfigFormFields;
  title: React.ReactNode;
};

export const ConfigTypeValueEnum = {
  '2D': {
    text: <FormattedMessage id="pages.configTable.titleType.2d" defaultMessage="2D" />,
  },
  '3D_SINGLE_PLANE': {
    text: (
      <FormattedMessage id="pages.configTable.titleType.3ds" defaultMessage="3D Single-Plane" />
    ),
  },
  '3D_BI_PLANE': {
    text: <FormattedMessage id="pages.configTable.titleType.3db" defaultMessage="3D Bi-Plane" />,
  },
};

export const ConfigModalForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  return (
    // use Modal as outermost layer to utilize its `destroyOnClose` feature
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={props.title}
      open={props.modalOpen}
      footer={null}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <StepsForm
        stepsProps={{
          size: 'small',
        }}
        onFinish={props.onSubmit}
      >
        <StepsForm.StepForm
          // pass in all values (overkill)
          initialValues={props.values}
          title={intl.formatMessage({
            id: 'pages.configTable.form.basicInfo',
            defaultMessage: 'Basic Information',
          })}
        >
          <ProFormText
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.configTable.titleName.message"
                    defaultMessage="Name is required"
                  />
                ),
              },
            ]}
            // width="md"
            name="config_name"
            label="Name"
          />
          <ProFormTextArea
            // width="md"
            name="config_description"
            label="Description"
          />
          <ProFormSelect
            name="config_type"
            label="Type"
            valueEnum={ConfigTypeValueEnum}
            placeholder="Please select a type"
            rules={[{ required: true, message: 'Type is required' }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={props.values}
          title={intl.formatMessage({
            id: 'pages.configTable.form.parameters',
            defaultMessage: 'Parameters',
          })}
        >
          <ProFormDigit
            label="NA"
            name="na"
            min={0.5}
            max={1.5}
            rules={[{ required: true, message: 'NA is required' }]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </Modal>
  );
};
