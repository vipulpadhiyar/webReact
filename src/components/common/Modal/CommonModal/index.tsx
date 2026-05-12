import { ModalWrapper } from '../Modal.Styled';
import { IModalProps } from '../types';

const CommonModal = ({
  open,
  title,
  width,
  className = '',
  onOk,
  onCancel,
  footer,
  centered,
  children,
  closeIcon,
  closable = true,
  destroyOnClose,
  maskClosable
}: IModalProps) => {
  return (
    <ModalWrapper
      open={open}
      title={title}
      width={width}
      centered={centered}
      className={`common-modal ${className}`}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer ?? null}
      closeIcon={closeIcon}
      closable={closable}
      destroyOnClose={destroyOnClose}
      maskClosable={maskClosable}
    >
      {children}
    </ModalWrapper>
  );
};

export default CommonModal;
