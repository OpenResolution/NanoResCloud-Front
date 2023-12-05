import { getUserConfigs } from '@/services/backend/config';
import { createConfig, deleteConfigs, editConfig } from '@/services/nanores-cloud/config';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Modal, message } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { ConfigModalForm, ConfigTypeValueEnum, ParameterColumns, TypeToColumns } from './ModalForm';

const TableList: React.FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  // for editModal and showDetails drawer
  const [currentRow, setCurrentRow] = useState<API.ConfigItem>();
  // for showDetails drawer
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const showDetailsActionRef = useRef<ActionType>();

  const [selectedRows, setSelectedRows] = useState<API.ConfigItem[]>([]);
  const tableActionRef = useRef<ActionType>();

  const intl = useIntl();

  // put handlers inside the component in order to use intl
  const handleCreate = async (fields: API.ConfigFormFields) => {
    const hide = message.loading(
      intl.formatMessage({
        id: 'pages.config.creating',
        defaultMessage: 'Creating',
      }),
    );
    try {
      await createConfig({ form_fields: fields });
      hide();
      message.success(
        intl.formatMessage({
          id: 'pages.config.creating.success',
          defaultMessage: 'Created successfully',
        }),
      );
      return true;
    } catch (error) {
      hide();
      message.error(
        intl.formatMessage({
          id: 'pages.config.creating.failed',
          defaultMessage: 'Creation failed, please try again',
        }),
      );
      return false;
    }
  };

  const handleDelete = async (selectedRowsToDelete: API.ConfigItem[]) => {
    const hide = message.loading(
      intl.formatMessage({
        id: 'pages.config.deleting',
        defaultMessage: 'Deleting',
      }),
    );
    if (!selectedRowsToDelete) return true;
    try {
      await deleteConfigs({
        config_ids: selectedRowsToDelete.map((row) => row.config_id),
      });
      hide();
      message.success(
        intl.formatMessage({
          id: 'pages.config.deleting.success',
          defaultMessage: 'Deleted successfully',
        }),
      );
      return true;
    } catch (error) {
      hide();
      message.error(
        intl.formatMessage({
          id: 'pages.config.deleting.failed',
          defaultMessage: 'Deletion failed, please try again',
        }),
      );
      return false;
    }
  };

  const handleEdit = async (fields: API.ConfigItem) => {
    const hide = message.loading(
      intl.formatMessage({
        id: 'pages.config.editing',
        defaultMessage: 'Saving edits',
      }),
    );
    try {
      await editConfig({ ...fields });
      hide();
      message.success(
        intl.formatMessage({
          id: 'pages.config.editing.success',
          defaultMessage: 'Saved edits',
        }),
      );
      return true;
    } catch (error) {
      hide();
      message.error(
        intl.formatMessage({
          id: 'pages.config.editing.failed',
          defaultMessage: 'Saving failed, please try again',
        }),
      );
      return false;
    }
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
      title: <FormattedMessage id="pages.config.fields.name" defaultMessage="Name" />,
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
      title: <FormattedMessage id="pages.config.fields.description" defaultMessage="Description" />,
      dataIndex: 'config_description',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.config.fields.type" defaultMessage="Type" />,
      dataIndex: 'config_type',
      valueEnum: ConfigTypeValueEnum,
    },
    ...ParameterColumns,
    {
      title: <FormattedMessage id="pages.config.options" defaultMessage="Options" />,
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          // use small size to avoid enlarging the cell
          size="small"
          onClick={() => {
            setCurrentRow(record);
            setEditModalOpen(true);
          }}
        >
          <EditOutlined /> <FormattedMessage id="pages.config.edit" defaultMessage="Edit" />
        </Button>,
        <Button
          key="delete"
          type="link"
          size="small"
          danger
          onClick={() =>
            Modal.confirm({
              title: intl.formatMessage({
                id: 'pages.config.singleDelete.title',
                defaultMessage: 'Delete Configuration',
              }),
              content: intl.formatMessage({
                id: 'pages.config.singleDelete.content',
                defaultMessage: 'Are you sure you want to delete this configuration?',
              }),
              okText: intl.formatMessage({
                id: 'pages.config.delete',
                defaultMessage: 'Delete',
              }),
              okButtonProps: {
                danger: true,
              },
              // use default cancelText
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
          <DeleteOutlined /> <FormattedMessage id="pages.config.delete" defaultMessage="Delete" />
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ConfigItem, API.getUserConfigsParams>
        headerTitle={intl.formatMessage({
          id: 'pages.config.headerTitle',
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
              setCreateModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.config.create" defaultMessage="New" />
          </Button>,
        ]}
        request={
          // transform parameter names
          // "current" and "pageSize" are from ProTable, but backend uses snake case
          async (params) => {
            return await getUserConfigs({
              current: params.current,
              page_size: params.pageSize,
            });
          }
        }
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
              <FormattedMessage id="pages.config.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRows.length}</a>{' '}
              <FormattedMessage id="pages.config.items" defaultMessage="items" />
            </div>
          }
        >
          <Button
            danger
            type="primary"
            onClick={() =>
              Modal.confirm({
                title: intl.formatMessage({
                  id: 'pages.config.batchDelete.title',
                  defaultMessage: 'Delete Configurations',
                }),
                content: intl.formatMessage({
                  id: 'pages.config.batchDelete.content',
                  defaultMessage: 'Are you sure you want to delete selected configurations?',
                }),
                okText: intl.formatMessage({
                  id: 'pages.config.delete',
                  defaultMessage: 'Delete',
                }),
                okButtonProps: {
                  danger: true,
                },
                // use default cancelText
                onOk: async () => {
                  await handleDelete(selectedRows);
                  setSelectedRows([]);
                  tableActionRef.current?.reloadAndRest?.();
                },
              })
            }
          >
            <FormattedMessage
              id="pages.config.batchDelete.button"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}

      <ConfigModalForm
        /**
         * Form for creating a config
         */
        onSubmit={async (value) => {
          // TODO optional fields
          const success = await handleCreate(value as API.ConfigFormFields);
          if (success) {
            setCreateModalOpen(false);
            // use optional chaining instead of if clause
            // refresh the table to show the newly created row
            tableActionRef.current?.reload();
            // no need to reset fields, because form uses initialValues
            // formRef.current?.resetFields();
          }
        }}
        onCancel={() => {
          setCreateModalOpen(false);
        }}
        modalOpen={createModalOpen}
        values={{
          config_name: intl.formatMessage({
            id: 'pages.config.untitled',
            defaultMessage: 'untitled config',
          }),
        }}
        title={intl.formatMessage({
          id: 'pages.config.createForm.title',
          defaultMessage: 'New Configuration',
        })}
      />

      <ConfigModalForm
        /**
         * Form for editing a config
         */
        onSubmit={async (value) => {
          const nextConfig = {
            config_id: (currentRow as API.ConfigItem).config_id,
            ...value,
          };
          const success = await handleEdit(nextConfig);
          if (success) {
            setEditModalOpen(false);
            tableActionRef.current?.reload();
            // update currentRow and then reload showDetails
            setCurrentRow(nextConfig);
            showDetailsActionRef.current?.reload();
          }
        }}
        onCancel={() => {
          setEditModalOpen(false);
        }}
        modalOpen={editModalOpen}
        // form doesn't need config_id
        values={(currentRow as API.ConfigFormFields) || {}}
        title={intl.formatMessage({
          id: 'pages.config.editForm.title',
          defaultMessage: 'Edit Configuration',
        })}
      />

      <Drawer
        /**
         * Drawer that shows the details of a config
         */
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
            // use single column because some field names are very long
            column={1}
            title={currentRow?.config_name}
            // use local `dataSource` instead of remote `request` for responsiveness
            dataSource={currentRow || {}}
            columns={
              TypeToColumns(
                currentRow.config_type,
                columns,
              ) as ProDescriptionsItemProps<API.ConfigItem>[]
            }
            actionRef={showDetailsActionRef}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
