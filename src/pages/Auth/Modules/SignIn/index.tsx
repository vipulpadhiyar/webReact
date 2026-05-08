import { Button, Col, Form, Row, message } from 'antd';
import { FormTitle } from 'pages/Auth/Auth.Styled';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import AuthLayout from 'components/common/AuthLayout';
import { RenderPasswordInput, RenderTextInput } from 'components/common/FormField';
import Meta from 'components/common/Meta';

import { authAPI } from 'services/api/auth';
import { ISignInReq } from 'services/api/auth/types';
import { authStore } from 'services/store/auth';

import { UserType } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { renderRoute, toAbsoluteUrl } from 'utils/functions';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { signIn } = authAPI;
  const { isLoggedIn, actions, userData } = authStore((state) => state);

  const onSubmit = async (data: ISignInReq) => {
    try {
      const payload: ISignInReq = {
        email: data.email,
        password: data.password,
        role: 'admin',
        deviceId: 'string',
        fcmToken: 'string',
        type: UserType.WEB
      };
      const res = await signIn(payload);
      actions.authSuccess(res);
      const getInitialRoute = renderRoute(res?.data?.access);
      navigate(getInitialRoute);
    } catch (err: any) {
      message.error(err?.message);
    }
  };

  if (isLoggedIn) {
    const getInitialRoute = renderRoute(userData?.access);
    return <Navigate to={getInitialRoute} />;
  }

  return (
    <>
      <Meta title="Number Dekho - Sign In" />
      <AuthLayout>
        <div className="logo-container">
          <img src={toAbsoluteUrl('/asset/logo.svg')} alt="Your Logo" />
        </div>
        <FormTitle>Login</FormTitle>
        <Form onFinish={onSubmit} form={form} autoComplete="off" className="signInForm">
          <Row gutter={[0, 30]}>
            <RenderTextInput
              col={{ xs: 24 }}
              name="email"
              placeholder="Enter your email"
              label="Email ID"
              allowClear="allowClear"
              size="large"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email'
                },
                {
                  type: 'email',
                  message: 'Please enter valid email'
                }
              ]}
            />
            <RenderPasswordInput
              col={{ xs: 24 }}
              name="password"
              required={true}
              placeholder="Enter your password"
              label="Password"
              type="password"
              size="middle"
              rules={[
                () => ({
                  validator: (_: any, value: string) => {
                    if (!value) {
                      return Promise.reject(new Error('Please enter your password'));
                    } else if (/^\S{3,}$/.test(value) && /^.{6,16}$/.test(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error('Password must be 6-16 characters long and not contain spaces')
                      );
                    }
                  }
                })
              ]}
            />
            <Col xs={24}>
              <div className="text-right">
                <Link to={ROUTES.forgotPassword}>Forgot Password?</Link>
              </div>
            </Col>
            <Col xs={24}>
              <Button block={true} type="primary" size="middle" htmlType="submit">
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </AuthLayout>
    </>
  );
};

export default SignIn;
