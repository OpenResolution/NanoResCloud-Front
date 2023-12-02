declare namespace API {
  type ConfigFormBackModels = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    /** Data */
    data: string;
  };

  type ConfigFormModels = {
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
    subregion_size: any;
    /** Segmentation Intensity Threshold */
    segmentation_intensity_threshold: any;
    /** Segmentation Distance Threshold */
    segmentation_distance_threshold: any;
    /** Single Molecule Intensity Rejection Threshold */
    single_molecule_intensity_rejection_threshold: any;
    /** Single Molecule Log Likelihood Rejection Threshold */
    single_molecule_log_likelihood_rejection_threshold: any;
    /** Single Molecule Localization Precision Rejection Threshold */
    single_molecule_localization_precision_rejection_threshold: any;
    /** Z Reconstruction Range */
    z_reconstruction_range: any;
    /** Z Psf Library Step Size */
    z_psf_library_step_size: any;
    /** Bi Plane Distance */
    bi_plane_distance: any;
  };

  type GetConfigBackModels = {
    /** Status Code */
    status_code: number;
    /** Msg */
    msg: string;
    /** Data */
    data: QueryConfigModels[];
  };

  type HTTPValidationError = {
    /** Detail */
    detail?: ValidationError[];
  };

  type QueryConfigModels = {
    ConfigForm: ConfigFormModels;
    /** Config Id */
    config_id: string;
    /** Create At */
    create_at: string;
    /** Update At */
    update_at: string;
  };

  type QueryPageModel = {
    /** Page */
    page: number;
    /** Page Size */
    page_size: number;
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
