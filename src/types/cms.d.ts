type CMSResponseType = CmsItemType[];

type CmsItemType = {
  _id: string;
  content: string;
  key: string;
  updatedAt: string;
};

type CMSTermsPrivacyRequest = {
  cmsType: string;
  titleKey: string;
};

type CMSTermsPrivacyResponse = {
  statusCode: number;
  message: string;
  data: TermsPrivacy;
};

type TermsPrivacy = {
  cmsType: string;
  titleKey: string;
  titleValue: string;
};
