import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RenderCheckboxGroup, RenderTextInput } from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { subAdminApi } from 'services/api/subAdmin';
import { IAddSubAdminReq } from 'services/api/subAdmin/type';
import { subAdminKeys } from 'services/hooks/queryKeys';

import { checkBoxOptions, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const pathNames: any = [
  {
    title: 'Sub Admin Management',
    href: ROUTES.subAdminManagement
  },
  {
    title: 'Add'
  }
];

interface IAddForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  access: string[] | [];
}

const AddSubAdmin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addSubAdmin } = subAdminApi;
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();

  const onSubmit = (values: IAddForm) => {
    const requestPayload: IAddSubAdminReq = {
      firstName: values.firstName,
      lastName: values.lastName,
      countryCode: '+91',
      email: values.email,
      phoneNumber: values.phoneNumber,
      access: values.access ?? [],
      profilePicture: imageUrlPath ?? ''
    };
    addSubAdmin(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(subAdminKeys.all);
        navigate(ROUTES.subAdminManagement);
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };

  return (
    <div className="shadow-paper">
      <ContentHeader pathNames={pathNames} />
      <Form form={form} onFinish={onSubmit}>
        <div className="d-flex justify-content-end mb-30 m-130">
          <Button type="primary" htmlType="submit" size="large">
            Save
          </Button>
        </div>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} lg={24}>
            <label>SubAdmin Image</label>
            <UploadImage
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              setImageUrlPath={setImageUrlPath}
              moduleName={uploadImageEnum.subAdmin}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="First Name"
              placeholder="Please enter first Name"
              name={'firstName'}
              rules={[
                {
                  required: true,
                  message: 'Please enter your first name'
                },
                {
                  pattern: /^[A-Za-z]+$/,
                  message: 'First name should only contain alphabets'
                },
                {
                  max: 50,
                  message: 'First name cannot exceed 50 characters'
                },
                {
                  min: 2,
                  message: 'First name should be at least 2 char long '
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Last Name"
              placeholder="Please enter last name "
              name={'lastName'}
              rules={[
                {
                  required: true,
                  message: 'Please enter your last name'
                },
                {
                  pattern: /^[A-Za-z]+$/,
                  message: 'Last name should only contain alphabets'
                },
                {
                  max: 50,
                  message: 'Last name cannot exceed 50 characters'
                },
                {
                  min: 2,
                  message: 'Last name should be at least 2 char long '
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              name="email"
              placeholder="Enter your email"
              label="Email"
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
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Phone Number"
              placeholder="Please enter phone number "
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Please enter phone number'
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: 'Phone number should be 10 digits long and contain only numbers'
                }
              ]}
            />
          </Col>

          <RenderCheckboxGroup
            col={{ xs: 24, lg: 24 }}
            label="Role"
            name="access"
            className="role-checkbox"
            rules={[
              {
                required: true,
                message: 'Please select at least one role'
              }
            ]}
            optionLabel={checkBoxOptions}
          />
        </Row>
      </Form>
    </div>
  );
};

export default React.memo(AddSubAdmin);
