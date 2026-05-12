import { Button, ModalProps, Space } from 'antd';
import { ReactNode } from 'react';

import { ModalWrapper } from '../Modal.Styled';

interface ISuccessModalProps extends ModalProps {
  ModalIcon?: ReactNode;
  Footer?: ReactNode;
  Content?: ReactNode;
  closeIcon?: ReactNode;
  children?: ReactNode;

  className?: string;
  ButtonText?: string;
  ModalTitle?: string;
  ModalSubTitle?: string;
  closable?: boolean;
  maskClosable?: boolean;
}

const SuccessModal = ({
  width,
  open,
  onOk,
  onCancel,
  ModalIcon,
  Footer,
  Content,
  closeIcon,
  ButtonText,
  ModalTitle,
  ModalSubTitle,
  closable,
  maskClosable,
  children,
  className
}: ISuccessModalProps) => {
  return (
    <ModalWrapper
      width={width ?? 400}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      centered={true}
      className={`success-modal common-modal ${className}`}
      closeIcon={closeIcon}
      closable={closable}
      maskClosable={maskClosable}
      footer={
        Footer ?? [
          <Space.Compact key={7} block>
            <Button onClick={onOk} type="primary" htmlType="button" className="w-100" size="large">
              {ButtonText ?? 'Save'}
            </Button>
          </Space.Compact>
        ]
      }
    >
      {Content ?? (
        <div className="content-wrapper">
          <picture className="picture-wrapper">{ModalIcon}</picture>
          <div className="modal-header">
            <h1 className="modal-title">{ModalTitle ?? 'Saved Successfully'}</h1>
          </div>
          <p className="modal-text">{ModalSubTitle ?? 'Your data has been saved successful'}</p>
          <>{children}</>
        </div>
      )}
    </ModalWrapper>
  );
};

export default SuccessModal;
