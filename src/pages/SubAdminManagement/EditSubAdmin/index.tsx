import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RenderCheckboxGroup, RenderTextInput } from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { subAdminApi } from 'services/api/subAdmin';
import { IUpdateSubAdminReq } from 'services/api/subAdmin/type';
import { subAdminKeys } from 'services/hooks/queryKeys';
import { useSubAdminView } from 'services/hooks/subAdmin';

import { VITE_REACT_APP_IMAGE_URL, checkBoxOptions, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const pathNames: any = [
  {
    title: 'Sub Admin Management',
    href: ROUTES.subAdminManagement
  },
  {
    title: 'Edit'
  }
];

interface IAddForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  access: string[] | [];
}

const EditSubAdmin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { updateSubAdminDetails } = subAdminApi;
  const [form] = Form.useForm();
  const { _id } = useParams();
  const { data } = useSubAdminView(_id);

  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();

  const onSubmit = (values: IAddForm) => {
    const requestPayload: IUpdateSubAdminReq = {
      firstName: values.firstName,
      lastName: values.lastName,
      countryCode: '+91',
      email: values.email,
      phoneNumber: values.phoneNumber,
      access: values.access ?? [],
      profilePicture: imageUrlPath ?? data?.profilePicture ?? '',
      _id: data?._id || ''
    };

    updateSubAdminDetails(requestPayload)
      .then((res) => {
        queryClient.invalidateQueries(subAdminKeys.all);
        navigate(ROUTES.subAdminManagement);
        message.success(res?.message);
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      email: data?.email ?? '',
      phoneNumber: data?.phoneNumber ?? '',
      access: data?.access ?? []
    });
  }, [data, form]);

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
              imageUrl={
                imageUrl ?? data?.profilePicture
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subAdmin}/${data?.profilePicture}`
                  : ''
              }
              setImageUrl={setImageUrl}
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
            optionLabel={checkBoxOptions}
            rules={[
              {
                required: true,
                message: 'Please select at least one role'
              }
            ]}
          />
        </Row>
      </Form>
    </div>
  );
};

export default EditSubAdmin;
