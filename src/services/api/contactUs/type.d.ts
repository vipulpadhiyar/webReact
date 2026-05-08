// City Management

export interface contactUsListDT {
  content: 'content';
  convertedForSort: '2024-01-30T08:42:46.000Z';
  email: 'tarakshah@yopmail.com';
  image: 'image.png';
  isActive: true;
  isDeleted: false;
  phoneNumber: '123456789';
  _id: '65b8b6867a60b38d9c687cad';
  firstName: string;
  lastName: string;
}

export interface contactUsList {
  list: contactUsListDT[];
  total_records: number;
}
export interface requestPayloadGetFaq {
  _id: string | undefined;
  cmsType: string;
}
export interface editContactUsForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  _id?: string;
  cmsType: string;
  image?: string;
}
export interface deleteFaq {
  _id: string;
  cmsType: string;
}
