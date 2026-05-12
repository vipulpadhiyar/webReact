import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RenderSelectInput, RenderTextInput } from 'components/common/FormField';

import { faqAPI } from 'services/api/faq';
import { editFaqForm, requestPayloadGetFaq } from 'services/api/faq/type';
import { useFaqView } from 'services/hooks/faq';
import { faqKeys } from 'services/hooks/queryKeys';

import { cmsTypeEnum, userRole } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const EditFaq = () => {
  const navigate = useNavigate();
  const { updateFaq } = faqAPI;
  const { _id } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const requestPayload: requestPayloadGetFaq = {
    cmsType: 'faq',
    _id: _id
  };
  const { data } = useFaqView(requestPayload);

  useEffect(() => {
    form.setFieldsValue({ question: data?.question, answer: data?.answer, role: data?.role });
  }, [data]);

  const onSubmit = ({ question, answer, role }: editFaqForm) => {
    const requestPayload: editFaqForm = {
      question,
      answer,
      role,
      cmsType: cmsTypeEnum.faq,
      _id: _id
    };

    updateFaq(requestPayload)
      .then((res) => {
        queryClient.invalidateQueries(faqKeys.all);
        navigate(ROUTES.faqManagement);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  return (
    <div className="shadow-paper">
      <Form form={form} onFinish={onSubmit}>
        <div className="d-flex justify-content-end mb-30 m-130">
          <Button type="primary" size="large" htmlType="submit">
            Save
          </Button>
        </div>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Question"
              placeholder="Please Enter Question"
              name={'question'}
              rules={[
                {
                  required: true,
                  message: 'Please enter question'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Answer"
              placeholder="Please Enter Answer"
              name={'answer'}
              rules={[
                {
                  required: true,
                  message: 'Please enter answer'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderSelectInput
              showSearch
              label="Role"
              placeholder="Please select role"
              name={'role'}
              optionLabel={userRole}
              rules={[
                {
                  required: true,
                  message: 'Please select role'
                }
              ]}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditFaq;
