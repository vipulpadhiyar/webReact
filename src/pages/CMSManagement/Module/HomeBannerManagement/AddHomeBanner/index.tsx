import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RenderTextInput } from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { homeBannerApi } from 'services/api/homeBanner';
import { homeBannerKeys } from 'services/hooks/queryKeys';

import { uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const pathNames: any = [
  {
    title: 'Home Banner Management',
    href: ROUTES.homeBannerManagement
  },
  {
    title: 'Add'
  }
];

const AddHomeBanner = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { addHomeBannerAction } = homeBannerApi;
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageValidation, setImageValidation] = useState<string>();
  const [imageUrlPath, setImageUrlPath] = useState<string>();

  const onSubmit = (values: { homeBannerName: string }) => {
    if (!imageUrlPath || imageUrlPath === '') {
      setImageValidation('Image is required');
      return;
    }
    const payload = {
      name: values?.homeBannerName?.trim(),
      image: imageUrlPath ?? ''
    };
    addHomeBannerAction(payload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(homeBannerKeys.all);
        navigate(ROUTES.homeBannerManagement);
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
            <label>
              <span style={commonStyles.colorCode}>*</span> Home Banner Image
            </label>
            <UploadImage
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              setImageUrlPath={setImageUrlPath}
              moduleName={uploadImageEnum.homePageBanner}
              imageValidation={imageValidation}
              setImageValidation={setImageValidation}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Home Banner Name"
              placeholder="Please enter home banner name"
              name={'homeBannerName'}
              rules={[
                {
                  required: true,
                  message: ''
                },
                {
                  validator: (_: any, value: any) => {
                    if (!value || !value.trim()) {
                      return Promise.reject(new Error('Please enter home banner name'));
                    }
                    const trimmedValue = value.trim();
                    if (trimmedValue.length < 2 || trimmedValue.length > 50) {
                      return Promise.reject(
                        new Error('home banner name must be between 2 and 50 characters')
                      );
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default React.memo(AddHomeBanner);
