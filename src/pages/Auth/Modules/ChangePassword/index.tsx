import { Button, Col, Form, Row, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { RenderPasswordInput } from 'components/common/FormField';
import ContentHeader from 'components/layout/contentHeader';

import { passwordAPI } from 'services/api/password';
import { changePasswordForm, changePasswordRequestParams } from 'services/api/password/type';
import { authStore } from 'services/store/auth';

import { renderRoute } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Change Password'
  }
];

const ChangePassword = () => {
  const navigate = useNavigate();
  const { userData } = authStore((state) => state);
  const { changaPasswordAPI } = passwordAPI;
  const onSubmit = ({ currentPassword, newPassword }: changePasswordForm) => {
    const requestPayload: changePasswordRequestParams = {
      _id: userData?._id,
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    changaPasswordAPI(requestPayload)
      .then((res) => {
        const getInitialRoute = renderRoute(userData?.access);
        navigate(getInitialRoute);

        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };
  return (
    <>
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />

        <Form onFinish={onSubmit}>
          <div className="d-flex justify-content-end mb-30 m-130">
            <Button type="primary" htmlType="submit" size="large">
              Save
            </Button>
          </div>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} lg={12}>
              <RenderPasswordInput
                label="Current Password"
                placeholder="Please Enter Current Password"
                name="currentPassword"
                type="password"
                rules={[
                  {
                    required: true,
                    message: ''
                  },
                  () => ({
                    validator: (_: any, value: string) => {
                      if (!value) {
                        return Promise.reject(new Error('Please enter current password'));
                      } else if (
                        /^\S{3,}$/.test(value) &&
                        /^.{6,16}$/.test(value) &&
                        /^(?=.*[0-9!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])\S{6,16}$/.test(value)
                      ) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error(
                            'Password must be 6-16 characters and contain at least one number or symbol or upper or lower case letter & not contain white spaces'
                          )
                        );
                      }
                    }
                  })
                ]}
              />
            </Col>
            <Col xs={24} lg={12}>
              <RenderPasswordInput
                label="New Password"
                placeholder="Please Enter New Password"
                name="newPassword"
                type="password"
                rules={[
                  {
                    required: true,
                    message: ''
                  },
                  ({ getFieldValue }: any) => ({
                    validator: (_: any, value: string) => {
                      if (!value) {
                        return Promise.reject(new Error('Please enter new password'));
                      } else if (getFieldValue('currentPassword') === value) {
                        return Promise.reject(
                          new Error(
                            'Please choose a new password that is different from your old password.'
                          )
                        );
                      } else if (
                        /^\S{3,}$/.test(value) &&
                        /^.{6,16}$/.test(value) &&
                        /^(?=.*[0-9!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])\S{6,16}$/.test(value)
                      ) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error(
                            'Password must be 6-16 characters and contain at least one number or symbol or upper or lower case letter & not contain white spaces'
                          )
                        );
                      }
                    }
                  })
                ]}
              />
            </Col>
            <Col xs={24} lg={12}>
              <RenderPasswordInput
                label="Confirm Password"
                placeholder="Please Enter Confirm Password"
                name="confirmPassword"
                type="password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter confirm your password'
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
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
