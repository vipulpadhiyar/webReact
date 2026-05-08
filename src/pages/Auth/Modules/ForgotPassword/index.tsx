import { Button, Col, Form, Row, message } from 'antd';
import { FormTitle } from 'pages/Auth/Auth.Styled';
import { useNavigate } from 'react-router-dom';

import AuthLayout from 'components/common/AuthLayout';
import { RenderTextInput } from 'components/common/FormField';
import Meta from 'components/common/Meta';

import { passwordAPI } from 'services/api/password';
import { forgetPasswordRequestParams } from 'services/api/password/type';

import { ROUTES } from 'utils/constants/routes';

const SignIn: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { forgetPassword } = passwordAPI;

  const onSubmit = ({ email }: forgetPasswordRequestParams) => {
    const requestPayload: forgetPasswordRequestParams = {
      email
    };
    forgetPassword(requestPayload)
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
        <FormTitle>Forgot Password</FormTitle>
        <Form onFinish={onSubmit} form={form} autoComplete="off" className="forgotPwdForm">
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
