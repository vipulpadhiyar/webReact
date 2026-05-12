import { faqList } from '../category/type';

export interface seoForm {
  testimonial?: testimonial[];
  testimonial?: testimonial[];
  faq: faqList[];
  seoTitle: string;
  metaDataTitle: string;
  metaDataDescription: string;
  h1DataTitle: string;
  h2DataTitle: string;
  metaTitle: string;
  h1DataDescription: string;
  h2DataDescription: string;
  metadata?: metadataResponse;
  type?: string;
  _id?: string;
}

export interface metadataResponse {
  h1DataDescription: string;
  h1DataTitle: string;
  h2DataDescription: string;
  h2DataTitle: string;
  metaDataDescription: string;
  metaDataTitle: string;
  seoTitle: string;
  metaTitle: string;
}

export interface testimonial {
  _id: string;
  name: string;
  image: string;
  designation: string;
  about: string;
}
export interface requestPayloadSeo {
  type: string;
}
export interface createSeoForm {
  type: string;
  metadata: metadataResponse;
  testimonial?: testimonial[] | undefined | [];
  faq: faqList[] | undefined | [];
  seoHybridId?: string;
  metaTitle?: string;
  testimonial?: testimonial[] | undefined | [];
}
