import { getUserConfigs, deleteConfigs, createConfig } from '@/services/api/config';
import { PlusOutlined } from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Input, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';

const handleCreate = async (fields: API.ConfigFormFields) => {
  const hide = message.loading('Creating');
  try {
    await createConfig({ ...fields });
    hide();
    message.success('Created successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Creation failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('Configuring');
//   try {
//     await updateRule({
//       name: fields.name,
//       desc: fields.desc,
//       key: fields.key,
//     });
//     hide();

//     message.success('Configuration is successful');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Configuration failed, please try again!');
//     return false;
//   }
// };

/**
 * @en-US Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ConfigItem[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await deleteConfigs({
      config_ids: selectedRows.map((row) => row.config_id),
    });
    hide();
    message.success('Deleted successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Deletion failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  // for showDetails drawer
  const [currentRow, setCurrentRow] = useState<API.ConfigItem>();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const [selectedRows, setSelectedRows] = useState<API.ConfigItem[]>([]);
  const actionRef = useRef<ActionType>();
  // for configuration creation form
  const formRef = useRef<ProFormInstance>();

  const intl = useIntl();

  const configTypeValueEnum = {
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

  const columns: ProColumns<API.ConfigItem>[] = [
    {
      // used as key, hidden from display
      dataIndex: 'config_id',
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      title: <FormattedMessage id="pages.configTable.titleName" defaultMessage="Name" />,
      dataIndex: 'config_name',
      tip: 'Configuation name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetails(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage id="pages.configTable.titleDescription" defaultMessage="Description" />
      ),
      dataIndex: 'config_description',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.configTable.titleType" defaultMessage="Type" />,
      dataIndex: 'config_type',
      valueEnum: configTypeValueEnum,
    },
    {
      title: <FormattedMessage id="pages.configTable.titleNA" defaultMessage="NA" />,
      dataIndex: 'na',
      sorter: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.configTable.titleOptions" defaultMessage="Options" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          // use small size to avoid enlarging the cell
          size="small"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.configTable.edit" defaultMessage="Edit" />
        </Button>,
        <Button
          key="delete"
          type="link"
          size="small"
          danger
          onClick={() =>
            Modal.confirm({
              title: 'Delete Configuration',
              content: 'Are you sure you want to delete this configuration?',
              okText: 'Delete',
              okButtonProps: {
                danger: true,
              },
              cancelText: 'Cancel',
              onOk: async () => {
                // single-entry deletion is a special case of batch deletion
                await handleRemove([record]);
                // this maybe optional
                setSelectedRows([]);
                // refresh after deletion
                actionRef.current?.reloadAndRest?.();
                // if showDetails drawer is open, need to close it
                setCurrentRow(undefined);
                setShowDetails(false);
              },
            })
          }
        >
          <FormattedMessage id="pages.configTable.delete" defaultMessage="Delete" />
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ConfigItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.configTable.title',
          defaultMessage: 'All configurations',
        })}
        actionRef={actionRef}
        // rowKey must be unique for row selection to work properly
        rowKey="config_id"
        // hide search panel
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.configTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={getUserConfigs}
        columns={columns}
        rowSelection={{
          onChange: (_, nextSelectedRows) => {
            setSelectedRows(nextSelectedRows);
          },
        }}
      />
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.configTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRows.length}</a>{' '}
              <FormattedMessage id="pages.configTable.items" defaultMessage="items" />
            </div>
          }
        >
          <Button
            danger
            type="primary"
            onClick={() =>
              Modal.confirm({
                title: 'Delete Configurations',
                content: 'Are you sure you want to delete selected configurations?',
                okText: 'Delete',
                okButtonProps: {
                  danger: true,
                },
                cancelText: 'Cancel',
                onOk: async () => {
                  await handleRemove(selectedRows);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                },
              })
            }
          >
            <FormattedMessage
              id="pages.configTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.configTable.createForm.newConfig',
          defaultMessage: 'New configuration',
        })}
        // width="400px"
        visible={createModalOpen}
        onVisibleChange={handleCreateModalOpen}
        formRef={formRef}
        onFinish={async (value) => {
          const success = await handleCreate(value as API.ConfigFormFields);
          if (success) {
            handleCreateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            // reset fields after successful submission
            formRef.current?.resetFields();
          }
        }}
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
          valueEnum={configTypeValueEnum}
          placeholder="Please select a type"
          rules={[{ required: true, message: 'Type is required' }]}
        />
        <ProFormDigit
          label="NA"
          name="na"
          min={0.5}
          max={1.5}
          rules={[{ required: true, message: 'NA is required' }]}
        />
      </ModalForm>
      {/* <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      /> */}

      <Drawer
        width={600}
        open={showDetails}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetails(false);
        }}
        closable={false}
      >
        {currentRow?.config_name && (
          <ProDescriptions<API.ConfigItem>
            column={2}
            title={currentRow?.config_name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.config_name,
            }}
            columns={columns as ProDescriptionsItemProps<API.ConfigItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
