import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { ModalWrapper } from '../Modal.Styled';
import { IModalProps } from '../types';

const DeleteModal = ({
  open,
  onOk,
  onCancel,
  closeIcon,
  width,
  modalTitle,
  modalDesc
}: IModalProps) => {
  return (
    <ModalWrapper
      width={width ?? 500}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      centered={true}
      className="common-modal delete-modal text-center"
      closeIcon={closeIcon ?? <CloseCircleOutlined />}
      footer={[
        <div key={3} className="d-flex justify-content-center">
          <Button onClick={onCancel} type="default" htmlType="button" size="middle">
            Cancel
          </Button>
          <Button onClick={onOk} type="primary" htmlType="button" size="middle">
            Delete
          </Button>
        </div>
      ]}
    >
      <div className="content-wrapper">
        <div className="modal-header">
          <h2 className="modal-title">{modalTitle}</h2>
        </div>
        <p className="modal-subtitle text-center">{modalDesc}</p>
      </div>
    </ModalWrapper>
  );
};

export default DeleteModal;
