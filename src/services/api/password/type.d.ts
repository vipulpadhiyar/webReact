export interface changePasswordRequestParams {
  _id: string;
  currentPassword: string;
  newPassword: string;
}
export interface resetPasswordRequestParams {
  token: any;
  newPassword: string;
}
export interface forgetPasswordRequestParams {
  email: string;
}
export interface changePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface resetPasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
