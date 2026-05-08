import { AutoComplete, Flex, Input, Space } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

import { RenderAddVendorSelectInput } from '../FormField';

interface IProps {
  className?: string;
  showSearch?: boolean;
  size?: SizeType;
  extraButton?: React.ReactNode;
  placeholder?: string;
  onSearch?: any;
  onChange?: React.ChangeEventHandler<any>;
  showFilter?: boolean;
  staticFilter?: any;
  onChangeFilter?: any;
}

const SearchBar = ({
  showSearch,
  className,
  size,
  extraButton,
  placeholder,
  onSearch,
  onChange,
  showFilter,
  staticFilter,
  onChangeFilter
}: IProps) => {
  return (
    <Flex
      justify={showSearch ? 'space-between' : 'end'}
      align="center"
      className={`common-header mb-16 ${className ?? ''}`}
      gap={20}
      wrap="wrap"
    >
      {showSearch && (
        <AutoComplete popupMatchSelectWidth={300} style={{ width: 300 }}>
          <Input.Search
            placeholder={placeholder ?? 'Search'}
            enterButton
            onSearch={onSearch}
            onChange={onChange}
            size={size ?? 'middle'}
          />
        </AutoComplete>
      )}
      {(extraButton || showFilter) && (
        <Space size={10} wrap align="end">
          {showFilter && (
            <RenderAddVendorSelectInput
              label="Set Filter"
              placeholder="Select filter"
              name="isFilter"
              optionLabel={staticFilter}
              onChange={onChangeFilter}
            />
          )}
          {extraButton && extraButton}
        </Space>
      )}
    </Flex>
  );
};

export default SearchBar;
