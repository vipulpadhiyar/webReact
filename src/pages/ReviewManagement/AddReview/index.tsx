import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddRating, RenderTextInput, RenderVendorSelectInput } from 'components/common/FormField';
import ContentHeader from 'components/layout/contentHeader';

import { ICategoryListReq } from 'services/api/category/type';
import { reviewAPI } from 'services/api/review';
import { addReviewForms } from 'services/api/review/type';
import { reviewKeys } from 'services/hooks/queryKeys';
import { useVendorList } from 'services/hooks/vendor';

import { ROUTES } from 'utils/constants/routes';

const pathNames: any = [
  {
    title: 'Review Management',
    href: ROUTES.reviewManagement
  },
  {
    title: 'Add'
  }
];

const AddReview = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { addReviewDetails } = reviewAPI;
  const queryClient = useQueryClient();

  const [args] = useState<ICategoryListReq>({
    page: 1,
    limit: 1000,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const { data } = useVendorList(args);

  const callList = () => {
    // if (args?.limit) {
    //   const newLimit = args?.limit + 10;
    //   setArgs((prevArgs) => ({
    //     ...prevArgs,
    //     limit: newLimit
    //   }));
    // }
  };
  const onSubmit = ({ rating, review, vendorId }: addReviewForms) => {
    const requestPayload: addReviewForms = {
      review,
      vendorId,
      rating: rating.toString()
    };
    addReviewDetails(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(reviewKeys.all);
        navigate(ROUTES.reviewManagement);
      })
      .catch((_err) => {
        message.error(_err?.message);
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
          <Col xs={24} lg={12}>
            <RenderVendorSelectInput
              showSearch
              label="Select Vendor"
              placeholder="Please select vendor"
              name={'vendorId'}
              optionLabel={data?.list}
              callList={callList}
              rules={[
                {
                  required: true,
                  message: 'Please select vendor'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Add Review"
              placeholder="Please enter review"
              name="review"
              rules={[
                {
                  required: true,
                  message: 'Please enter review'
                },
                {
                  max: 250,
                  message: 'Review must not exceed 250 characters'
                },
                {
                  whitespace: true,
                  message: 'Review cannot be blank'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <AddRating label={'Rating'} name="rating" />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default React.memo(AddReview);
