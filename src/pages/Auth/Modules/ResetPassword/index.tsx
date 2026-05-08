import { Button, Col, Form, Row, message } from 'antd';
import { FormTitle } from 'pages/Auth/Auth.Styled';
import { useNavigate, useParams } from 'react-router-dom';

import AuthLayout from 'components/common/AuthLayout';
import { RenderTextInput } from 'components/common/FormField';
import Meta from 'components/common/Meta';

import { passwordAPI } from 'services/api/password';
import { resetPasswordForm, resetPasswordRequestParams } from 'services/api/password/type';

import { ROUTES } from 'utils/constants/routes';

const SignIn: React.FC = () => {
  const [form] = Form.useForm();
  const { token } = useParams<string>();
  const { resetPasswordAPI } = passwordAPI;
  const navigate = useNavigate();

  const onSubmit = ({ newPassword }: resetPasswordForm) => {
    const requestPayload: resetPasswordRequestParams = {
      newPassword,
      token: token
    };
    resetPasswordAPI(requestPayload)
      .then((res) => {
        navigate(ROUTES.signIn);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  return (
    <>
      <Meta title="Number Dekho - Forgot Password" />
      <AuthLayout>
        <FormTitle>Reset Password</FormTitle>
        <Form onFinish={onSubmit} form={form} autoComplete="off" className="forgotPwdForm">
          <Row gutter={[0, 30]}>
            <Col xs={24} lg={24}>
              <RenderTextInput
                label="New Password"
                placeholder="Please Enter New Password"
                name="newPassword"
                type="password"
                rules={[
                  {
                    required: true,
                    message: ''
                  },
                  () => ({
                    validator: (_: any, value: string) => {
                      if (!value) {
                        return Promise.reject(new Error('Please enter new password'));
                      } else if (value && (value.length > 16 || value.length < 6)) {
                        return Promise.reject(new Error('Password must be 6-16 characters long'));
                      } else {
                        return Promise.resolve();
                      }
                    }
                  })
                ]}
              />
            </Col>
            <Col xs={24} lg={24}>
              <RenderTextInput
                label="Confirm Password"
                placeholder="Please Enter Confirm Password"
                name="confirmPassword"
                type="password"
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  ({ getFieldValue }: any) => ({
                    validator(_: any, value: string) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('The new password that you entered do not match!')
                      );
                    }
                  })
                ]}
              />
            </Col>
            <Col xs={24}>
              <Button block={true} type="primary" size="middle" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </AuthLayout>
    </>
  );
};

export default SignIn;
