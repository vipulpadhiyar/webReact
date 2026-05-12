// City Management

export interface faqListDT {
  answer: string;
  convertedForSort: string;
  createdDate: string;
  question: string;
  _id: string;
  role: string;
}

export interface faqListResponse {
  list: faqListDT[];
  total_records: number;
}
export interface requestPayloadGetFaq {
  _id: string | undefined;
  cmsType: string;
}
export interface editFaqForm {
  question: string | undefined;
  answer: string;
  _id?: string;
  cmsType: string;
  role: string;
}
export interface deleteFaq {
  _id: string;
  cmsType: string;
}
