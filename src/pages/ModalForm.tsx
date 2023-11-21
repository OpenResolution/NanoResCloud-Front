import {
  StepsForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
} from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'umi';

export type FormValueType = API.ConfigFormFields;

export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  modalOpen: boolean;
  // use Partial<> to allow initiating only part of the fields
  values?: Partial<API.ConfigFormFields>;
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

const fieldsBasic = ['config_name', 'config_description', 'config_type', 'option'];
const params2D = [
  'na',
  'wave_length',
  'refractive_index',
  'pixel_size',
  'camera_offset',
  'camera_gain',

  'subregion_size',
  'segmentation_intensity_threshold',
  'segmentation_distance_threshold',
  'single_molecule_intensity_rejection_threshold',
  'single_molecule_log_likelihood_rejection_threshold',
  'single_molecule_localization_precision_rejection_threshold',
  'drift_correction',
];
const params3DS = params2D.concat(['z_reconstruction_range', 'z_psf_library_step_size']);
const params3DB = params3DS.concat(['bi_plane_distance']);

const snakeCaseToCamelCase = (input) =>
  input
    .split('_')
    .reduce(
      (res, word, i) =>
        i === 0
          ? word.toLowerCase()
          : `${res}${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`,
      '',
    );

export const ParameterColumns = params3DB.map((name) => ({
  title: (
    <FormattedMessage
      id={'pages.config.fields.' + snakeCaseToCamelCase(name)}
      defaultMessage={name}
    />
  ),
  dataIndex: name,
  hideInTable: true,
}));

export const TypeToColumns = (
  configType: API.ConfigType,
  columns: ProColumns<API.ConfigItem>[],
): ProColumns<API.ConfigItem>[] => {
  let fields: string[];
  if (configType === '2D') {
    fields = params2D;
  } else if (configType === '3D_SINGLE_PLANE') {
    fields = params3DS;
  } else {
    fields = params3DB;
  }
  fields = fields.concat(fieldsBasic);
  return columns.filter((column) => fields.includes(column.dataIndex as string));
};

export const ConfigModalForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const [currentConfigType, setCurrentConfigType] = useState<API.ConfigType>(
    props.values?.config_type || '2D',
  );

  // state is only initiated once and doesn't change when props change
  // therefore need to keep state in sync with props
  useEffect(() => {
    setCurrentConfigType(props.values?.config_type || '2D');
  }, [props.values?.config_type]);

  return (
    // use Modal as outermost layer to utilize its `destroyOnClose` feature
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={props.title}
      open={props.modalOpen}
      // hide default footer, because StepsForm already has buttons
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
        // according to docs, "StepsForm inherits from Form.Provider", which has onFormChange
        onFormChange={(formName, info) => {
          // watch the change of config_type
          if (info.changedFields[0].name[0] === 'config_type') {
            const newValue = info.changedFields[0].value;
            setCurrentConfigType(newValue);
          }
        }}
      >
        <StepsForm.StepForm
          // pass in all values (overkill)
          initialValues={props.values}
          title={intl.formatMessage({
            id: 'pages.config.form.basicInfo',
            defaultMessage: 'Basic Information',
          })}
        >
          <ProFormText
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.config.column.name.message"
                    defaultMessage="Name is required"
                  />
                ),
              },
            ]}
            // width="md"
            name="config_name"
            label={intl.formatMessage({
              id: 'pages.config.fields.name',
              defaultMessage: 'Name',
            })}
          />
          <ProFormTextArea
            // width="md"
            name="config_description"
            label={intl.formatMessage({
              id: 'pages.config.fields.description',
              defaultMessage: 'Description',
            })}
          />
          <ProFormSelect
            name="config_type"
            label={intl.formatMessage({
              id: 'pages.config.fields.type',
              defaultMessage: 'Type',
            })}
            valueEnum={ConfigTypeValueEnum}
            placeholder={intl.formatMessage({
              id: 'pages.config.fields.type.placeholder',
              defaultMessage: 'Please select a type',
            })}
            rules={[{ required: true, message: 'Type is required' }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={props.values}
          title={intl.formatMessage({
            id: 'pages.config.form.parameters',
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
          <ProFormDigit label="Subregion size" name="subregion_size" min={3} max={40} />
          {['3D_SINGLE_PLANE', '3D_BI_PLANE'].includes(currentConfigType) && (
            <ProFormDigit
              label="Z reconstruction range"
              name="z_reconstruction_range"
              min={0}
              max={4}
            />
          )}
          {currentConfigType === '3D_BI_PLANE' && (
            <ProFormDigit
              label="Bi-plane distance"
              name="bi_plane_distance"
              min={0}
              max={4}
              rules={[{ required: true, message: 'Bi-plane distance is required for Bi-plane' }]}
            />
          )}
        </StepsForm.StepForm>
      </StepsForm>
    </Modal>
  );
};
