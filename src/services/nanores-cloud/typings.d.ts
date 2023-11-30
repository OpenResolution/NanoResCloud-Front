declare namespace API {
  type ConfigFormFields = {
    config_name: string;
    config_description: string;
    config_type: ConfigType;
    user_id: string;
    na: number;
    wave_length: number;
    refractive_index: number;
    pixel_size: number;
    camera_offset: number;
    camera_gain: number;
    drift_correction: boolean;
    subregion_size?: number;
    segmentation_intensity_threshold?: number;
    segmentation_distance_threshold?: number;
    single_molecule_intensity_rejection_threshold?: number;
    single_molecule_log_likelihood_rejection_threshold?: number;
    single_molecule_localization_precision_rejection_threshold?: number;
    z_reconstruction_range?: number;
    z_psf_library_step_size?: number;
    bi_plane_distance?: number;
  };

  type ConfigItem =
    // #/components/schemas/ConfigFormFields
    ConfigFormFields & {
      config_id: string;
    };

  type ConfigList = {
    data?: ConfigItem[];
    total?: number;
    success?: boolean;
  };

  type ConfigType = '2D' | '3D_SINGLE_PLANE' | '3D_BI_PLANE';

  type createConfigParams = {
    /** Form fields */
    form_fields?: ConfigFormFields;
  };

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

  type deleteConfigsParams = {
    /** Ids of the configs to be deleted */
    config_ids?: string[];
  };

  type editConfigParams = {
    /** Form fields */
    form_fields?: ConfigFormFields;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type getFakeCaptchaParams = {
    /** 手机号 */
    phone?: string;
  };

  type getUserConfigsParams = {
    /** Current page */
    current?: number;
    /** Page size */
    pageSize?: number;
  };

  type getUserTasksParams = {
    /** User id */
    user_id?: string;
  };

  type LoginParams = {
    email?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
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

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
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

  type ruleParams = {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  };

  type TaskItem = {
    task_id: string;
    task_name: string;
    task_description: string;
    task_type: TaskType;
    user_id: string;
    input_file_id: string;
    output_file_path: string;
    task_config_id: string;
    total_cycles: number;
    current_cycle: number;
    task_status: TaskStatus;
  };

  type TaskList = {
    data?: TaskItem[];
    /** Total number of task */
    total?: number;
    success?: boolean;
  };

  type TaskStatus = 'WAITING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

  type TaskType = '2D' | '3D_SINGLE_PLANE' | '3D_BI_PLANE';
}
