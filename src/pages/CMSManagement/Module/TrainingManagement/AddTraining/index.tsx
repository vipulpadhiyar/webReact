import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { RenderTextInput } from 'components/common/FormField';

import { trainingAPI } from 'services/api/training';
import { editTrainingForm } from 'services/api/training/type';
import { trainingKeys } from 'services/hooks/queryKeys';

import { cmsTypeEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const AddTraining = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { addTraining } = trainingAPI;
  const onSubmit = ({ content, titleKey, titleValue, link }: editTrainingForm) => {
    const requestPayload: editTrainingForm = {
      content,
      titleKey,
      titleValue,
      link,
      cmsType: cmsTypeEnum.training
    };

    addTraining(requestPayload)
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

export default AddTraining;
