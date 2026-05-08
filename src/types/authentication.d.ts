/* this is how you can import another types in d.ts file */
type UserType = import('../enums/index').UserType;

/**
 * The above types define parameters, request, and response structures for a sign-in functionality.
 * @property {string} email - The `email` property is a string type used to store the email address of
 * a user. It is commonly used for identification and communication purposes in authentication and user
 * management systems.
 * @property {string} password - The `password` property is a string type used to store the password
 * input provided by the user during sign-in. It is present in both the `SignInFormParamsType` and
 * `SignInRequestType` types to capture the user's password for authentication purposes.
 */
type SignInFormParamsType = {
  email: string;
  password: string;
};

/**
 * The type `SignInRequestType` defines the structure of a sign-in request object with specific
 * properties.
 */

type SignInRequestType = {
  email: string;
  password: string;
  deviceId: string;
  fcmToken: string;
  role: string;
  rememberMe: boolean;
  type: string;
};

/**
 * The type `SignInResponseType` defines the structure of data returned after a user signs in.
 */

type SignInResponseType = {
  _id: string;
  accessToken: string;
  email: string;
  firstName: string;
  image: string;
  lastName: string;
};

/**
 * The above types define parameters, request, and response types for a forgot password feature.
 * @property {string} email - The `email` property is a string type used to represent an email address
 * in the `ForgotPasswordFormParamsType`, `ForgotPasswordRequestType`, and `ForgotPasswordResponseType`
 * types. It is used to store the email address of a user who is requesting a password reset.
 */
type ForgotPasswordFormParamsType = {
  email: string;
};

type ForgotPasswordRequestType = {
  email: string;
  role: string;
};

type ForgotPasswordResponseType = {
  statusCode: number;
  message: string;
};

/**
 * The type SignUpFormParamsType defines the structure of parameters required for a sign-up form.
 */
type SignUpFormParamsType = {
  firstName: string;
  lastName: string;
  email: string;
  confirmPassword: string;
  password: string;
  termsChecked: boolean;
};

/*  interface for Signup api params */
/**
 * The type SignUpRequestType represents the structure of a sign-up request with specific fields.
 */
type SignUpRequestType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  fcmToken: string;
  deviceId: string;
  rememberMe: false;
  type: string;
};

/*  interface for Signup api response */
/**
 * The type SignUpResponseType defines the structure of the response expected after a user signs up,
 * including access token, first name, last name, and email.
 */
type SignUpResponseType = {
  accessToken: string;
  firstname: string;
  lastName: string;
  email: string;
};
