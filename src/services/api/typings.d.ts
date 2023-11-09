// @ts-ignore
/* eslint-disable */

declare namespace API {
  type TaskType = '2D' | '3D_single_plane' | '3D_bi_plane';
  type TaskStatus = 'waiting' | 'processing' | 'success' | 'failed';

  type TaskItem = {
    id: number;
    task_name: string;
    task_description: string;
    task_type: TaskType;
    create_time: Date;
    update_time: Date;
    user_id: number;
    input_file_id: number;
    output_file_path: string;
    task_config_id: number;
    total_cycles: number;
    current_cycle: number;
    task_status: TaskStatus;
  };

  type GetUserTasksParams = {
    user_id: number;
  };

  type GetUserTasksResult = {
    data: TaskItem[];
  };

  /* template defined type */
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
