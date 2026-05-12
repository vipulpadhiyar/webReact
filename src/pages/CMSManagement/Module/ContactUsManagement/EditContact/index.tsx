import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RenderTextInput } from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';

import { contactUsAPI } from 'services/api/contactUs';
import { editContactUsForm } from 'services/api/contactUs/type';
import { requestPayloadGetFaq } from 'services/api/faq/type';
import { useContactUsView } from 'services/hooks/contactUs';
import { contactUsKeys } from 'services/hooks/queryKeys';

import { VITE_REACT_APP_IMAGE_URL, cmsTypeEnum, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { toAbsoluteUrl } from 'utils/functions';

const EditContact = () => {
  const navigate = useNavigate();
  const { updateContactUs } = contactUsAPI;
  const [form] = Form.useForm();
  const { _id } = useParams();
  const requestPayload: requestPayloadGetFaq = {
    cmsType: cmsTypeEnum.contactsUs,
    _id: _id
  };
  const { data } = useContactUsView(requestPayload);
  const [imageValidation, setImageValidation] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const queryClient = useQueryClient();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();

  const onSubmit = ({ firstName, lastName, email, phoneNumber }: editContactUsForm) => {
    const requestPayload: editContactUsForm = {
      firstName,
      lastName,
      email,
      phoneNumber,
      _id,
      cmsType: cmsTypeEnum.contactsUs,
      image: imageUrlPath || data?.image || ''
    };
    updateContactUs(requestPayload)
      .then((res) => {
        queryClient.invalidateQueries(contactUsKeys.all);
        navigate(ROUTES.contactUsManagement);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phoneNumber: data?.phoneNumber
    });
  }, [data]);
  return (
    <div className="shadow-paper">
      <Form form={form} onFinish={onSubmit}>
        <div className="d-flex justify-content-end mb-30 m-130">
          <Button type="primary" htmlType="submit" size="large">
            Save
          </Button>
        </div>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24}>
            <label>Contact Image</label>
            <UploadImage
              imageUrl={
                imageUrl ?? data?.image
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.cms}/${data?.image}`
                  : toAbsoluteUrl('/asset/dummy.png')
              }
              setImageUrl={setImageUrl}
              setImageUrlPath={setImageUrlPath}
              moduleName={uploadImageEnum.cms}
              imageValidation={imageValidation}
              setImageValidation={setImageValidation}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="First Name"
              placeholder="Please Enter First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Please enter first name'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Last Name"
              placeholder="Please Enter Last Name "
              name="lastName"
              rules={[
                {
                  required: true,
                  message: 'Please enter last name'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Phone Number"
              placeholder="Please Enter Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Please enter phone number'
                },
                {
                  pattern: /^[0-9]{10}$/, // Adjust the regex based on your phone number format
                  message: 'Invalid phone number. Please enter a 10-digit number.'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="email"
              placeholder="Please Enter Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter email'
                }
              ]}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditContact;
