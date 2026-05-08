type ChangePasswordFormParamsType = {
  oldPassword: string;
  confirmPassword?: string;
  newPassword: string;
};

type ChangePasswordRequestType = {
  oldPassword: string;
  newPassword: string;
};

type ChangePasswordResponseType = {
  statusCode: number;
  message: string;
};

/**
 * The type EditProfileFormParamsType defines the structure of parameters required for a my profile form.
 */
type EditProfileFormParamsType = {
  firstName: string;
  lastName: string;
  email?: string;
};

type UserProfileResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  isNotificationAllowed: boolean;
};

type EditProfileResponseType = {
  statusCode: number;
  message: string;
};

type EditProfileRequest = {
  firstName: string;
  lastName: string;
  image?: string;
};

// Faq
type FaqRequestType = {
  role: string;
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: string;
  sortBy?: string;
};

type FaqResponseType = {
  faq: FaqItemType[];
  totalRecords: number;
};

type FaqItemType = {
  _id: string;
  question: string;
  answer: string;
  role: string;
  updatedAt: string;
};
