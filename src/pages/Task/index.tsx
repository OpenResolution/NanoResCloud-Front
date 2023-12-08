import { getUserTasks } from '@/services/nanores-cloud/task';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Card, List, Progress } from 'antd';

const Task: React.FC = () => {
  return (
    <PageContainer>
      <ProList<API.TaskItem>
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
