import { getUserConfigs, createConfig, deleteConfigs, editConfig } from '@/services/api/config';
import { ApiFilled, PlusOutlined } from '@ant-design/icons';
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
import { ConfigModalForm, ConfigTypeValueEnum } from './ModalForm';
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

const handleEdit = async (fields: API.ConfigItem) => {
  const hide = message.loading('Saving edits');
  try {
    await editConfig({ ...fields });
    hide();
    message.success('Saved edits');
    return true;
  } catch (error) {
    hide();
    message.error('Saving failed, please try again!');
    return false;
  }
};

/**
 * @en-US Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleDelete = async (selectedRows: API.ConfigItem[]) => {
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
  const [editModalOpen, handleEditModalOpen] = useState<boolean>(false);

  // for showDetails drawer
  const [currentRow, setCurrentRow] = useState<API.ConfigItem>();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const showDetailsActionRef = useRef<ActionType>();

  const [selectedRows, setSelectedRows] = useState<API.ConfigItem[]>([]);
  const tableActionRef = useRef<ActionType>();
  // for configuration creation form
  const formRef = useRef<ProFormInstance>();

  const intl = useIntl();

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
      valueEnum: ConfigTypeValueEnum,
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
            setCurrentRow(record);
            handleEditModalOpen(true);
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
                await handleDelete([record]);
                // this maybe optional
                setSelectedRows([]);
                // refresh after deletion
                tableActionRef.current?.reloadAndRest?.();
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
        actionRef={tableActionRef}
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
                  await handleDelete(selectedRows);
                  setSelectedRows([]);
                  tableActionRef.current?.reloadAndRest?.();
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

      <ConfigModalForm
        onSubmit={async (value) => {
          // TODO optional fields
          const success = await handleCreate(value as API.ConfigFormFields);
          if (success) {
            handleCreateModalOpen(false);
            // use optional chaining instead of if clause
            // refresh the table to show the newly created row
            tableActionRef.current?.reload();
            // no need to reset fields, because form uses initialValues
            // formRef.current?.resetFields();
          }
        }}
        onCancel={() => {
          handleCreateModalOpen(false);
        }}
        modalOpen={createModalOpen}
        values={{ config_name: 'untitled' }}
        title={intl.formatMessage({
          id: 'pages.configTable.createForm.title',
          defaultMessage: 'New configuration',
        })}
      />

      <ConfigModalForm
        onSubmit={async (value) => {
          const nextConfig = {
            config_id: (currentRow as API.ConfigItem).config_id,
            ...value,
          };
          const success = await handleEdit(nextConfig);
          if (success) {
            handleEditModalOpen(false);
            tableActionRef.current?.reload();
            // update currentRow and then reload showDetails
            setCurrentRow(nextConfig);
            showDetailsActionRef.current?.reload();
          }
        }}
        onCancel={() => {
          handleEditModalOpen(false);
        }}
        modalOpen={editModalOpen}
        // form doesn't need config_id
        values={(currentRow as API.ConfigFormFields) || {}}
        title={intl.formatMessage({
          id: 'pages.configTable.editForm.title',
          defaultMessage: 'Edit configuration',
        })}
      />

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
            // use local `dataSource` instead of remote `request` for responsiveness
            dataSource={currentRow || {}}
            columns={columns as ProDescriptionsItemProps<API.ConfigItem>[]}
            actionRef={showDetailsActionRef}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
