import { getUserTasks } from '@/services/nanores-cloud/task';
import {
  CaretRightOutlined,
  CopyOutlined,
  DownloadOutlined,
  EditOutlined,
  PauseCircleOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Button, Card, List, Progress, Tooltip, message } from 'antd';
import React, { useState } from 'react';
import TaskForm from './components/ModalForm';

function taskToActions({ task_status, task_id }: API.TaskItem) {
  const statusToActions = new Map<API.TaskStatus, React.ReactNode[]>([
    [
      'WAITING',
      [
        <Tooltip title="Start" key="start">
          <PlayCircleOutlined
            onClick={() => {
              message.success(`${task_id} started`);
            }}
          />
        </Tooltip>,
        <Tooltip title="Edit" key="edit">
          <EditOutlined />
        </Tooltip>,
      ],
    ],
    [
      'PROCESSING',
      [
        <Tooltip title="Pause" key="pause">
          <PauseCircleOutlined />
        </Tooltip>,
      ],
    ],
    [
      'SUCCESS',
      [
        <Tooltip title="Download" key="download">
          <DownloadOutlined />
        </Tooltip>,
      ],
    ],
    [
      'FAILED',
      [
        <Tooltip title="Retry" key="retry">
          <RedoOutlined />
        </Tooltip>,
      ],
    ],
  ]);
  let actions = statusToActions.get(task_status);

  // common actions
  actions = actions.concat(
    <Tooltip title="Duplicate" key="duplicate">
      <CopyOutlined />
    </Tooltip>,
  );
  return actions;
}

const MainAction: React.FC<{ task: API.TaskItem; buttonSize: number }> = ({
  // use nested destructuring
  task: { task_status, task_id },
  buttonSize,
}) => {
  const iconProps = { style: { fontSize: buttonSize / 2 } };
  const statusToIcon = new Map<API.TaskStatus, React.ReactNode>([
    [
      'WAITING',
      <CaretRightOutlined
        key="start"
        {...iconProps}
        onClick={() => {
          message.success(`${task_id} started`);
        }}
      />,
    ],
    ['PROCESSING', <PauseOutlined key="pause" {...iconProps} />],
    ['SUCCESS', <DownloadOutlined key="download" {...iconProps} />],
    ['FAILED', <RedoOutlined key="retry" {...iconProps} />],
  ]);

  return (
    <Button
      style={{ marginTop: '20px', width: buttonSize, height: buttonSize }}
      shape="circle"
      icon={statusToIcon.get(task_status)}
    />
  );
};

const ProgressButton: React.FC<{
  task: API.TaskItem;
}> = ({ task }) => {
  const { task_status, current_cycle, total_cycles } = task;
  const buttonSize = 100;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      // not called consistently due to react's bug
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >
      {isHovered ? (
        <MainAction task={task} buttonSize={buttonSize} />
      ) : (
        <Progress
          style={{ marginTop: '20px' }}
          size={buttonSize}
          type="circle"
          status={task_status === 'FAILED' ? 'exception' : undefined}
          percent={Math.round((current_cycle / total_cycles) * 100)}
        />
      )}
    </div>
  );
};

const Task: React.FC = () => {
  return (
    <PageContainer>
      <ProList<API.TaskItem>
        toolbar={{
          actions: [<TaskForm key="create" />],
        }}
        // from antd List
        renderItem={(task) => (
          <List.Item>
            <Card
              hoverable
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              cover={<ProgressButton task={task} />}
              actions={taskToActions(task)}
            >
              <Card.Meta
                style={{ textAlign: 'center' }}
                title={task.task_name}
                description={task.task_description}
              />
            </Card>
          </List.Item>
        )}
        headerTitle="All tasks"
        grid={{ gutter: 16, column: 4 }}
        request={async (params) => {
          const response = await getUserTasks({
            user_id: '1',
            current: params.current,
            page_size: params.pageSize,
          });
          return response;
        }}
      />
    </PageContainer>
  );
};

export default Task;
