// City Management

export interface trainingListListDT {
  _id: string;
  cmsType: string;
  titleKey: string;
  titleValue: string;
  content: string;
  link: string;
  isDeleted: false;
  isActive: true;
  _id: string;
}

export interface trainingList {
  list: faqListDT[];
  total_records: number;
}
export interface requestPayloadGetFaq {
  _id: string | undefined;
  cmsType: string;
}
export interface editTrainingForm {
  titleKey?: string;
  titleValue?: string;
  content?: string;
  link?: string;
  _id?: string | undefined;
  cmsType: string;
}
export interface deleteFaq {
  _id: string;
  cmsType: string;
}
