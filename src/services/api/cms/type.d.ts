export interface cmsForm {
  cmsType?: string;
  _id?: string;
  titleKey?: string;
  titleValue?: string;
  image?: string;
  content?: string;
  question?: string;
  answer?: string;
  email?: string;
  phoneNumber?: string;
}

export interface getCms {
  _id?: string;
  titleKey?: string;
  cmsType?: string;
}
