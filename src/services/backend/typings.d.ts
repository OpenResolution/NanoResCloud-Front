declare namespace API {
  type ConfigFields = {
    /** Config Name */
    config_name: string;
    /** Config Description */
    config_description?: string;
    config_type: ConfigType;
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
    segmentation_distance_threshold?: any;
    /** Single Molecule Intensity Rejection Threshold */
    single_molecule_intensity_rejection_threshold?: number;
    /** Single Molecule Log Likelihood Rejection Threshold */
    single_molecule_log_likelihood_rejection_threshold?: number;
    /** Single Molecule Localization Precision Rejection Threshold */
    single_molecule_localization_precision_rejection_threshold?: number;
    /** Z Reconstruction Range */
    z_reconstruction_range?: number;
    /** Z Psf Library Step Size */
    z_psf_library_step_size?: any;
    /** Bi Plane Distance */
    bi_plane_distance?: number;
  };

  type ConfigItem = {
    /** Config Name */
    config_name: string;
    /** Config Description */
    config_description?: string;
    config_type: ConfigType;
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
    segmentation_distance_threshold?: any;
    /** Single Molecule Intensity Rejection Threshold */
    single_molecule_intensity_rejection_threshold?: number;
    /** Single Molecule Log Likelihood Rejection Threshold */
    single_molecule_log_likelihood_rejection_threshold?: number;
    /** Single Molecule Localization Precision Rejection Threshold */
    single_molecule_localization_precision_rejection_threshold?: number;
    /** Z Reconstruction Range */
    z_reconstruction_range?: number;
    /** Z Psf Library Step Size */
    z_psf_library_step_size?: any;
    /** Bi Plane Distance */
    bi_plane_distance?: number;
    /** Config Id */
    config_id: string;
    /** Created At */
    created_at: string;
    /** Updated At */
    updated_at: string;
  };

  type ConfigType = '2D' | '3D_SINGLE_PLANE' | '3D_BI_PLANE';

  type deleteConfigParams = {
    id: string;
  };

  type Email = {
    /** Email */
    email: string;
  };

  type FileItem = {
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
    /** File Id */
    file_id: string;
    /** Created At */
    created_at: string;
    /** Updated At */
    updated_at: string;
  };

  type getConfigsParams = {
    current: number;
    page_size: number;
  };

  type getFilesParams = {
    current: number;
    page_size: number;
  };

  type getTasksParams = {
    current: number;
    page_size: number;
  };

  type HTTPError = {
    /** Detail */
    detail: string;
  };

  type HTTPValidationError = {
    /** Detail */
    detail?: ValidationError[];
  };

  type LoginFields = {
    /** Password */
    password: string;
    /** Email */
    email: string;
  };

  type RegisFields = {
    /** Password */
    password: string;
    /** Username */
    username: string;
    /** Email */
    email: string;
    /** Verification Code */
    verification_code: string;
  };

  type SuccessResponse = {
    /** Message */
    message: string;
  };

  type updateConfigParams = {
    id: string;
  };

  type UserInfo = {
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

  type ValidationError = {
    /** Location */
    loc: any[];
    /** Message */
    msg: string;
    /** Error Type */
    type: string;
  };
}
