import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RenderTextInput } from 'components/common/FormField';

import { requestPayloadGetFaq } from 'services/api/faq/type';
import { trainingAPI } from 'services/api/training';
import { editTrainingForm } from 'services/api/training/type';
import { trainingKeys } from 'services/hooks/queryKeys';
import { useTrainingView } from 'services/hooks/training';

import { cmsTypeEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const EditTraining = () => {
  const navigate = useNavigate();
  const { updateTraining } = trainingAPI;
  const { _id } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const requestPayload: requestPayloadGetFaq = {
    cmsType: cmsTypeEnum.training,
    _id: _id
  };
  const { data } = useTrainingView(requestPayload);

  useEffect(() => {
    form.setFieldsValue({
      titleKey: data?.titleKey,
      titleValue: data?.titleValue,
      link: data?.link,
      content: data?.content
    });
  }, [data]);

  const onSubmit = ({ titleKey, content, titleValue, link }: editTrainingForm) => {
    const requestPayload: editTrainingForm = {
      titleKey,
      titleValue,
      link,
      cmsType: cmsTypeEnum.training,
      _id: _id,
      content
    };

    updateTraining(requestPayload)
      .then((res) => {
        queryClient.invalidateQueries(trainingKeys.all);
        navigate(ROUTES.trainingManagement);
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
              label="Title"
              placeholder="Please Enter Title"
              name={'titleKey'}
              rules={[
                {
                  required: true,
                  message: 'Please enter title'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Value"
              placeholder="Please Enter Title Value"
              name={'titleValue'}
              rules={[
                {
                  required: true,
                  message: 'Please enter title value'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Content"
              placeholder="Please Enter Content"
              name={'content'}
              rules={[
                {
                  required: true,
                  message: 'Please enter content'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Link"
              placeholder="Please Enter Link"
              name={'link'}
              rules={[
                {
                  required: true,
                  message: 'Please enter link'
                },
                {
                  pattern: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
                  message: 'Please enter a valid link'
                }
              ]}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditTraining;
