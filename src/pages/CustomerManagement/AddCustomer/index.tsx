import { Button, Col, Form, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import FaqCommon from '../../../components/common/Faq';
import { RenderTextInput } from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';

import { ROUTES } from 'utils/constants/routes';

const AddCustomer = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-paper">
      <Form>
        <div className="d-flex justify-content-end mb-30 m-130">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.customerManagement)}>
            Save
          </Button>
        </div>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24}>
            <label>Service Image</label>
            <UploadImage />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput label="First Name" placeholder="Please Enter First Name" />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput label="Last Name" placeholder="Please Enter Last Name " />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput label="Email" placeholder="Please Enter Email " />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput label="Phone Number" placeholder="Please Enter Phone Number " />
          </Col>
          <Col xs={24}>
            <FaqCommon />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddCustomer;
