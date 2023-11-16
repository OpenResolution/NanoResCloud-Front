import { getUserConfigs } from '@/services/api/config';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
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
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.ConfigItem) => {
  const hide = message.loading('正在添加');
  try {
    // await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
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
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
// const handleRemove = async (selectedRows: API.RuleListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('Deleted successfully and will refresh soon');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Delete failed, please try again');
//     return false;
//   }
// };

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ConfigItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ConfigItem[]>([]);

  const intl = useIntl();

  const columns: ProColumns<API.ConfigItem>[] = [
    {
      title: <FormattedMessage id="pages.configTable.titleName" defaultMessage="Name" />,
      dataIndex: 'config_name',
      tip: 'Configuation name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
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
      valueEnum: {
        '2D': {
          text: <FormattedMessage id="pages.configTable.titleType.2d" defaultMessage="2D" />,
        },
        '3D_SINGLE_PLANE': {
          text: (
            <FormattedMessage
              id="pages.configTable.titleType.3ds"
              defaultMessage="3D Single Plane"
            />
          ),
        },
        '3D_BI_PLANE': {
          text: (
            <FormattedMessage id="pages.configTable.titleType.3db" defaultMessage="3D Bi Plane" />
          ),
        },
      },
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
        <a
          key="edit"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.configTable.edit" defaultMessage="Edit" />
        </a>,
        <a key="delete">
          <FormattedMessage id="pages.configTable.delete" defaultMessage="Delete" />
        </a>,
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
        rowKey="config_name"
        // hide search panel
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.configTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={getUserConfigs}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {/* {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )} */}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.configTable.createForm.newConfig',
          defaultMessage: 'New configuration',
        })}
        // width="400px"
        visible={createModalOpen}
        onVisibleChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.ConfigItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
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
          valueEnum={{
            twod: '2D',
            threed_single_plane: '3D_SINGLE_PLANE',
            threed_bi_plane: '3D_BI_PLANE',
          }}
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
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
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
