import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';

import { ModalWrapper } from '../Modal.Styled';

const { Option } = Select;

interface BidModalProps {
  open: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  selectedValues: string[];
  otherSelectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  onOtherSelectionChange: (values: string[]) => void;
  options: { label: string; value: string; phoneNumber: string }[];
  otherOptions: { label: string; value: string; phoneNumber: string }[];
  modalTitle: string;
  modalDesc: string;
}

const BidModal = ({
  open,
  onOk,
  onCancel,
  selectedValues,
  onSelectionChange,
  onOtherSelectionChange,
  options,
  otherOptions,
  otherSelectedValues,
  modalTitle,
  modalDesc
}: BidModalProps) => {
  return (
    <ModalWrapper
      width={500}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      centered={true}
      className="common-modal delete-modal text-center"
      closeIcon={<CloseCircleOutlined />}
      footer={[
        <div key={3} className="d-flex justify-content-center">
          <Button onClick={onCancel} type="default" htmlType="button" size="middle">
            Cancel
          </Button>
          <Button
            onClick={() => onOk([...selectedValues, ...otherSelectedValues])}
            type="primary"
            htmlType="button"
            size="middle"
          >
            Send
          </Button>
        </div>
      ]}
    >
      <div className="content-wrapper">
        <div className="modal-header mb-10">
          <h2 className="modal-title">{modalTitle}</h2>
        </div>
        <h3 className="modal-subtitle text-center mt-10">{modalDesc}</h3>

        <Select
          mode="multiple"
          placeholder="Select Near By Vendors"
          value={selectedValues}
          onChange={(values) => onSelectionChange(values)} // Ensure values are passed correctly
          className="w-100 mt-20 mb-30"
          showSearch
          filterOption={(input, option: any) =>
            option?.children?.toLowerCase()?.includes(input?.toLowerCase())
          }
        >
          {options?.length ? (
            <Option key="all" value="all">
              Select All
            </Option>
          ) : null}
          {options?.map((opt) => (
            <Option key={opt?.value} value={opt?.value}>
              {`${opt?.label} (${opt?.phoneNumber})`}
            </Option>
          ))}
        </Select>

        <Select
          mode="multiple"
          placeholder="Select Other Vendors"
          value={otherSelectedValues}
          onChange={(values) => onOtherSelectionChange(values)} // Ensure values are passed correctly
          className="w-100 mt-10 mb-30"
          showSearch
          filterOption={(input, option: any) =>
            option?.children?.toLowerCase()?.includes(input?.toLowerCase())
          }
        >
          {otherOptions?.map((opt) => (
            <Option key={opt?.value} value={opt?.value}>
              {`${opt?.label} (${opt?.phoneNumber})`}
            </Option>
          ))}
        </Select>
      </div>
    </ModalWrapper>
  );
};

export default BidModal;
