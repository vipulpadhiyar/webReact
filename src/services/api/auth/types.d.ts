export interface ISignInReq {
  email: string;
  password: string;
  role?: string;
  deviceId?: string;
  fcmToken?: string;
  type: 'web';
}
export interface ISignInRes {
  _id: string;
  accessToken: string;
  access: string[] | [];
}
