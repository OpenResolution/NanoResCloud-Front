// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ConfigType = '2D' | '3D_SINGLE_PLANE' | '3D_BI_PLANE';

  type ConfigFormFieldsUniversal = {
    // basic info (metadata)
    config_name: string;
    config_description: string;
    config_type: ConfigType;
    user_id: string;
    // for all types
    na: number;
    subregion_size: number;
  };

  type ConfigFormFields3D = ConfigFormFieldsUniversal & {
    // 3D only
    z_reconstruction_range: number;
  };

  type ConfigFormFields = ConfigFormFields3D & {
    // 3D_BI_PLANE only
    bi_plane_distance: number;
  };

  type ConfigItem = ConfigFormFields & {
    config_id: string;
  };

  // type GetUserConfigsParams = {
  //   user_id: string;
  // };

  type ConfigList = {
    data?: ConfigItem[];
    total?: number;
    success?: boolean;
  };

  type TaskType = '2D' | '3D_SINGLE_PLANE' | '3D_BI_PLANE';
  type TaskStatus = 'WAITING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

  type TaskItem = {
    task_id: string;
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
