declare namespace API {
  type ConfigFormBackModels = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    /** Data */
    data: string;
  };

  type ConfigItem = {
    /** Config Name */
    config_name: string;
    /** Config Description */
    config_description: string;
    /** Config Type */
    config_type: string;
    /** User Id */
    user_id: string;
    /** Na */
    na: number;
    /** Wave Length */
    wave_length: number;
    /** Refractive Index */
    refractive_index: number;
    /** Pixel Size */
    pixel_size: number;
    /** Camera Offset */
    camera_offset: number;
    /** Camera Gain */
    camera_gain: number;
    /** Drift Correction */
    drift_correction: boolean;
    /** Subregion Size */
    subregion_size?: number;
    /** Segmentation Intensity Threshold */
    segmentation_intensity_threshold?: number;
    /** Segmentation Distance Threshold */
    segmentation_distance_threshold?: number;
    /** Single Molecule Intensity Rejection Threshold */
    single_molecule_intensity_rejection_threshold?: number;
    /** Single Molecule Log Likelihood Rejection Threshold */
    single_molecule_log_likelihood_rejection_threshold?: number;
    /** Single Molecule Localization Precision Rejection Threshold */
    single_molecule_localization_precision_rejection_threshold?: number;
    /** Z Reconstruction Range */
    z_reconstruction_range?: number;
    /** Z Psf Library Step Size */
    z_psf_library_step_size?: number;
    /** Bi Plane Distance */
    bi_plane_distance?: number;
    /** Config Id */
    config_id: string;
    /** Created At */
    created_at: string;
    /** Updated At */
    updated_at: string;
  };

  type FileFormBackModels = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    /** Data */
    data: string;
  };

  type FileFormModels = {
    /** User Id */
    user_id: string;
    /** File Name */
    file_name: string;
    /** File Type */
    file_type: string;
    /** File Size */
    file_size: number;
    /** File Platform */
    file_platform: string;
    /** File Path */
    file_path: string;
  };

  type GetConfigBackModels = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    /** Data */
    data: ConfigItem[];
  };

  type GetFileBackModels = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    /** Data */
    data: QueryFileModels[];
  };

  type getTasksParams = {
    current: number;
    page_size: number;
  };

  type getUserConfigsParams = {
    current: number;
    page_size: number;
  };

  type getUserFileParams = {
    current: number;
    page_size: number;
  };

  type HTTPValidationError = {
    /** Detail */
    detail?: ValidationError[];
  };

  type QueryFileModels = {
    FileForm: FileFormModels;
    /** File Id */
    file_id: string;
    /** Created At */
    created_at: string;
    /** Updated At */
    updated_at: string;
  };

  type UserInfoSchema = {
    /** User Name */
    user_name: string;
    /** User Id */
    user_id: string;
    /** User Email */
    user_email: string;
    /** Access Token */
    access_token: string;
    /** Refresh Token */
    refresh_token: string;
    /** Expires At */
    expires_at: string;
    /** Token Type */
    token_type: string;
  };

  type UserLoginBackSchema = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    data: UserInfoSchema;
  };

  type UserLoginSchema = {
    /** Email */
    email: string;
    /** Password */
    password: string;
  };

  type UserLogoutBackSchema = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    /** Data */
    data: string;
  };

  type UserRegisEmailBackSchema = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    /** Data */
    data: string;
  };

  type UserRegisEmailSendSchema = {
    /** Email */
    email: string;
  };

  type UserRegistrationBackSchema = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    /** Data */
    data: string;
  };

  type UserRegistrationSchema = {
    /** Username */
    username: string;
    /** Email */
    email: string;
    /** Password */
    password: string;
    /** Verification Code */
    verification_code: string;
  };

  type UserResetPasswordBackSchema = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    /** Data */
    data: string;
  };

  type UserResetPasswordSchema = {
    /** Password */
    password: string;
    /** Verification Code */
    verification_code: string;
  };

  type ValidationError = {
    /** Location */
    loc: any[];
    /** Message */
    msg: string;
    /** Error Type */
    type: string;
  };
}
