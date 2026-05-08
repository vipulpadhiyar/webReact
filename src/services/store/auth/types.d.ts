export interface IUserData {
  accessToken: string;
  _id: any;
  access: string[] | [];
}

export interface ILoginApiParam {
  email: string;
  password: string;
  deviceId: string;
  deviceType: string;
  fcmToken: string;
}
