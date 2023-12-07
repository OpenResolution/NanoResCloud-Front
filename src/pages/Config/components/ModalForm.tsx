import type { ProColumns } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';

// in addition to fields in the form, backend needs user_id
type ConfigFormFields = Omit<API.ConfigFields, 'user_id'>;

export type FormValueType = ConfigFormFields;

export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  modalOpen: boolean;
  // use Partial<> to allow initiating only part of the fields
  values?: Partial<ConfigFormFields>;
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

const EnableValueEnum = {
  false: {
    text: <FormattedMessage id="pages.config.disabled" defaultMessage="Disabled" />,
    status: 'Default',
  },
  true: {
    text: <FormattedMessage id="pages.config.enabled" defaultMessage="Enabled" />,
    status: 'Success',
  },
};

type Parameter = {
  name: string;
  required: boolean;
  type: 'float' | 'int' | 'boolean';
  min?: number;
  max?: number;
  label?: string;
  tooltip?: string;
};

const params2DRequired: Parameter[] = [
  { name: 'na', required: true, type: 'float', min: 0.5, max: 1.5, label: 'NA' },
  {
    name: 'wave_length',
    required: true,
    type: 'float',
    min: 0.4,
    max: 1.2,
    label: 'Wavelength (μm)',
  },
  {
    name: 'refractive_index',
    required: true,
    type: 'float',
    min: 1,
    max: 1.6,
    label: 'Refractive index',
  },
  {
    name: 'pixel_size',
    required: true,
    type: 'float',
    min: 0.05,
    max: 1,
    label: 'Pixel size (μm)',
  },
  {
    name: 'camera_offset',
    required: true,
    type: 'int',
    min: 0,
    max: 1000,
    label: 'Camera offset',
  },
  { name: 'camera_gain', required: true, type: 'float', min: 0.1, max: 100, label: 'Camera gain' },
  {
    name: 'drift_correction',
    required: true,
    type: 'boolean',
    label: 'Drift correction',
  },
];

const params2DOptional: Parameter[] = [
  {
    name: 'subregion_size',
    required: false,
    type: 'int',
    min: 3,
    max: 40,
    label: 'Subregion size (pixel)',
  },
  {
    name: 'segmentation_intensity_threshold',
    required: false,
    type: 'float',
    min: 0,
    max: 200,
    label: 'Segmentation intensity threshold',
  },
  {
    name: 'segmentation_distance_threshold',
    required: false,
    type: 'int',
    min: 0,
    max: 20,
    label: 'Segmentation distance threshold (pixel)',
  },
  {
    name: 'single_molecule_intensity_rejection_threshold',
    required: false,
    type: 'float',
    min: 0,
    max: 1000,
    label: 'Single-molecule intensity rejection threshold',
  },
  {
    name: 'single_molecule_log_likelihood_rejection_threshold',
    required: false,
    type: 'float',
    min: 0,
    max: 2000,
    label: 'Single-molecule log-likelihood rejection threshold',
  },
  {
    name: 'single_molecule_localization_precision_rejection_threshold',
    required: false,
    type: 'float',
    min: 0,
    max: 0.05,
    label: 'Single-molecule localization precision rejection threshold (μm)',
  },
];

const params3Donly: Parameter[] = [
  {
    name: 'z_reconstruction_range',
    required: false,
    type: 'int',
    min: 0,
    max: 4,
    label: 'Z reconstruction range (μm)',
  },
  {
    name: 'z_psf_library_step_size',
    required: false,
    type: 'float',
    min: 0,
    max: 0.2,
    label: 'Z-PSF library step size (μm)',
  },
];

const params3DBonly: Parameter[] = [
  {
    name: 'bi_plane_distance',
    required: true,
    type: 'float',
    min: 0.05,
    max: 1,
    label: 'Bi-plane distance (μm)',
  },
];

const params2D = params2DRequired.concat(params2DOptional);
const params3DS = params2D.concat(params3Donly);
const params3DB = params2DRequired.concat(params3DBonly, params2DOptional, params3Donly);
const fieldsBasic = ['config_name', 'config_description', 'config_type', 'option'];

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

const modalWidth = 640;
const paramToFormField = (intl: IntlShape, isHalfWidth: boolean) => (param: Parameter) => {
  if (param.name === 'drift_correction') {
    return (
      <ProFormSelect
        key={param.name}
        width="sm"
        name={param.name}
        label={
          <FormattedMessage
            id={'pages.config.fields.' + snakeCaseToCamelCase(param.name)}
            defaultMessage={param.label || param.name}
          />
        }
        valueEnum={EnableValueEnum}
        rules={
          param.required
            ? [{ required: true, message: `${param.label || param.name} is required` }]
            : undefined
        }
      />
    );
  } else {
    return (
      <ProFormDigit
        // fix the warning 'Each child in a list should have a unique "key" prop.'
        key={param.name}
        width={isHalfWidth ? 'sm' : 'lg'}
        label={
          <FormattedMessage
            id={'pages.config.fields.' + snakeCaseToCamelCase(param.name)}
            defaultMessage={param.label || param.name}
          />
        }
        name={param.name}
        min={param.min}
        max={param.max}
        tooltip={param.tooltip}
        // Number of decimal places = 0 for integer
        fieldProps={param.type === 'int' ? { precision: 0 } : undefined}
        placeholder={
          // display range
          intl.formatMessage({
            id: 'pages.config.form.range',
            defaultMessage: 'Range',
          }) +
          // use en dash for range
          ` ${param.min}\u2013${param.max}`
        }
        rules={
          param.required
            ? [{ required: true, message: `${param.label || param.name} is required` }]
            : undefined
        }
      />
    );
  }
};

export const ParameterColumns = params3DB.map(({ name, label }) => ({
  title: (
    <FormattedMessage
      id={'pages.config.fields.' + snakeCaseToCamelCase(name)}
      defaultMessage={label || name}
    />
  ),
  dataIndex: name,
  hideInTable: true,
  valueEnum: name === 'drift_correction' ? EnableValueEnum : undefined,
}));

export const TypeToColumns = (
  configType: API.ConfigType,
  columns: ProColumns<API.ConfigItem>[],
): ProColumns<API.ConfigItem>[] => {
  let params: Parameter[];
  if (configType === '2D') {
    params = params2D;
  } else if (configType === '3D_SINGLE_PLANE') {
    params = params3DS;
  } else {
    params = params3DB;
  }
  let fields = params.map(({ name }) => name);
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
      width={modalWidth}
      // bodyStyle is deprecated
      styles={{ body: { padding: '32px 40px 48px' } }}
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
            id: 'pages.config.form.requiredParameters',
            defaultMessage: 'Required Parameters',
          })}
        >
          <ProForm.Group
          // use ProForm.Group for a more compact layout
          >
            {params2DRequired.map(paramToFormField(intl, true))}
            {currentConfigType === '3D_BI_PLANE' && params3DBonly.map(paramToFormField(intl, true))}
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={props.values}
          title={intl.formatMessage({
            id: 'pages.config.form.optionalParameters',
            defaultMessage: 'Optional Parameters',
          })}
        >
          {params2DOptional.map(paramToFormField(intl, false))}
          <ProForm.Group>
            {['3D_SINGLE_PLANE', '3D_BI_PLANE'].includes(currentConfigType) &&
              params3Donly.map(paramToFormField(intl, true))}
          </ProForm.Group>
        </StepsForm.StepForm>
      </StepsForm>
    </Modal>
  );
};
