import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography, Avatar, Row, Col, Progress } from 'antd';
import React, { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { getUserTasks } from '@/services/nanores-cloud/task';
import styles from './Task.less';
import { divide } from 'lodash';

const { Meta } = Card;

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<API.TaskItem[]>([]);

  const current_user_id = '1';

  const getTasks = async () => {
    const response = await getUserTasks({ user_id: current_user_id });
    const userTasks = response.data;
    setTasks(userTasks || []);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Row gutter={16}>
      {tasks.map((task, index) => (
        <Col span={5}>
          <Card
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            cover={
              <Progress
                style={{ marginTop: '20px' }}
                type="circle"
                percent={Math.round((task.current_cycle / task.total_cycles) * 100)}
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              style={{ textAlign: 'center' }}
              // avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title={task.task_name}
              description={task.task_description}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Task;
