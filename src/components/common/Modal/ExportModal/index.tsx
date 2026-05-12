import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import { ModalWrapper } from '../Modal.Styled';
import { IModalProps } from '../types';

const ExportModal = ({ open, onCodeOk, onCancel, closeIcon, width, modalTitle }: IModalProps) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleFormSubmit = (values: { authenticatorCode: string }) => {
    if (onCodeOk) {
      onCodeOk(values?.authenticatorCode);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="authenticatorForm"
      onFinish={handleFormSubmit} // Handle form submission
    >
      <ModalWrapper
        width={width ?? 500}
        open={open}
        onCancel={onCancel}
        centered={true}
        className="common-modal delete-modal text-center"
        closeIcon={closeIcon ?? <CloseCircleOutlined />}
        footer={[
          <div key={3} className="d-flex justify-content-center">
            <Button onClick={onCancel} type="default" htmlType="button" size="middle">
              Cancel
            </Button>
            <Button onClick={handleOk} type="primary" htmlType="submit" size="middle">
              Done
            </Button>
          </div>
        ]}
      >
        <div className="content-wrapper">
          <div className="modal-header">
            <h2 className="modal-title">{modalTitle}</h2>
          </div>
          <div className="modal-body">
            <div className="modal-input">
              <Form.Item
                name="authenticatorCode"
                rules={[
                  { required: true, message: 'Google authenticator code is required!' },
                  { pattern: /^\d{6}$/, message: 'Please enter a valid 6-digit code!' }
                ]}
              >
                <Input placeholder="Enter google authenticator code" maxLength={6} />
              </Form.Item>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </Form>
  );
};

export default ExportModal;
