import { DownOutlined } from '@ant-design/icons';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Checkbox, Col, Form, Input, Radio, Rate, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

import { VITE_REACT_APP_GOOGLE_GEOCODER_API_KEY } from 'utils/constants';

import {
  IRenderCheckBox,
  IRenderCheckboxProps,
  IRenderInputProps,
  IRenderRadioProps,
  IRenderSelectProps
} from './types';

export const RenderTextInput = (props: IRenderInputProps) => {
  const {
    // COLUMN
    col,
    colClassName,
    colOffSet,
    offSetPull,
    // FORM_ITEM
    name,
    label,
    rules,
    help,
    // FORM_INPUT
    type,
    placeholder,
    value,
    disabled,
    min,
    max,
    minLength,
    maxLength,
    onChange,
    className,
    addonAfter,
    addonBefore,
    suffix,
    prefix,
    allowClear,
    required,
    size,
    tooltip,
    defaultValue
  } = props;
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
      pull={offSetPull}
    >
      <Form.Item
        name={name ?? ''}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={label}
        rules={rules}
        help={help ?? null}
        required={required}
        tooltip={tooltip}
      >
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          min={min}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          className={className}
          addonAfter={addonAfter ?? null}
          addonBefore={addonBefore ?? null}
          suffix={suffix}
          prefix={prefix}
          allowClear={allowClear}
          size={size ?? 'middle'}
          defaultValue={defaultValue}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderPasswordInput = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  placeholder,
  prefix,
  offSetPull,
  required
}: IRenderInputProps) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
      pull={offSetPull}
    >
      <Form.Item
        name={name ?? ''}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={label}
        rules={rules || null}
        required={required}
      >
        <Input.Password
          placeholder={placeholder}
          size="large"
          prefix={prefix ?? null}
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible
          }}
        />
      </Form.Item>
    </Col>
  );
};
export const RenderRadio = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  required,
  onChange,
  value,
  initialValue,
  className,
  size,
  disabled,
  options,
  optionType,
  buttonStyle,
  defaultValue
}: IRenderRadioProps) => {
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
    >
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        name={name}
        label={label}
        rules={rules}
        required={required}
        initialValue={initialValue}
      >
        <Radio.Group
          style={{ alignItems: 'center' }}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          className={className}
          size={size ?? 'middle'}
          options={options}
          optionType={optionType}
          buttonStyle={buttonStyle ?? 'solid'}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderCheckBox = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  required,
  onChange,
  checked,
  className,
  children,
  value,
  initialValue,
  defaultChecked
}: IRenderCheckBox) => {
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
    >
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        name={name}
        label={label}
        rules={rules}
        required={required}
        initialValue={initialValue}
      >
        <Checkbox
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          className={className}
        >
          {children}
        </Checkbox>
      </Form.Item>
    </Col>
  );
};

export const RenderCheckboxGroup = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  required,
  checkboxName,
  onChange,
  value,
  className,
  optionLabel,
  disabled,
  defaultValues
}: IRenderCheckboxProps) => {
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
    >
      <Form.Item
        name={name}
        label={label}
        rules={rules}
        required={required}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Checkbox.Group
          defaultValue={defaultValues}
          name={checkboxName}
          onChange={onChange}
          value={value}
          className={className}
          disabled={disabled}
          style={{ rowGap: '8px' }}
        >
          {optionLabel?.map((item: any) => (
            <Checkbox value={item.value} key={item._id}>
              {item.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </Col>
  );
};

export const RenderSelectInput = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  required,
  onChange,
  value,
  className = '',
  optionLabel,
  disabled,
  onSelect,
  showSearch,
  mode,
  placeholder,
  allowClear,
  defaultValue,
  prefixIcon = '',
  suffixIcon
}: IRenderSelectProps) => {
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
    >
      <div className={`customSelect ${prefixIcon && 'selectWithIcon'} ${className ?? className}`}>
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          required={required}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            value={value}
            onSelect={onSelect}
            showSearch={showSearch}
            mode={mode}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            defaultValue={defaultValue}
            onChange={onChange}
            optionFilterProp="children"
            suffixIcon={
              <div className="selectIcons">
                {prefixIcon ? (
                  <>
                    <span className="prefixIcon">{prefixIcon}</span>
                    <span className="selectArrowIcon">{suffixIcon || <DownOutlined />}</span>
                  </>
                ) : (
                  <span className="selectArrowIcon">{suffixIcon || <DownOutlined />}</span>
                )}
              </div>
            }
          >
            {optionLabel?.map((item: any) => {
              if (item?.name) {
                return (
                  <Select.Option key={item._id} value={item._id} label={item.name}>
                    {item?.name
                      ? item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/-/g, ' ')
                      : item?.name}
                  </Select.Option>
                );
              } else {
                return (
                  <Select.Option key={item._id} value={item._id} label={item.cityAreaName}>
                    {item?.cityAreaName
                      ? item.cityAreaName.charAt(0).toUpperCase() +
                        item.cityAreaName.slice(1).replace(/-/g, ' ')
                      : item?.cityAreaName}
                  </Select.Option>
                );
              }
            })}
          </Select>
        </Form.Item>
      </div>
    </Col>
  );
};

export const RenderTextArea = (props: any) => {
  return (
    <Col {...props.col}>
      <Form.Item
        name={props.name}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={props.label}
        rules={props.rules}
        tooltip={props.tooltip}
      >
        <TextArea
          showCount={props.showCount}
          disabled={props.disabled}
          className={props.className}
          cols={props.cols}
          rows={props.rows}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          allowClear={props.allowClear}
        />
      </Form.Item>
    </Col>
  );
};

export function SearchInput({
  disabled,
  col,
  name,
  label,
  rules,
  value,
  placeholder,
  apiKey,
  onChange,
  onPlaceSelected,
  options
}: any) {
  return (
    <Col {...col}>
      <Form.Item
        name={name}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={label}
        rules={rules}
        className="autoCompleteFormItem"
      >
        <ReactGoogleAutocomplete
          className="autoCompleteInput w-100"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          apiKey={apiKey ?? VITE_REACT_APP_GOOGLE_GEOCODER_API_KEY}
          options={options}
          onPlaceSelected={onPlaceSelected}
        />
      </Form.Item>
    </Col>
  );
}

export const RenderAddVendorSelectInput = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  required,
  onChange,
  value,
  className = '',
  optionLabel,
  disabled,
  onSelect,
  showSearch,
  mode,
  placeholder,
  allowClear,
  defaultValue,
  prefixIcon = '',
  suffixIcon
}: IRenderSelectProps) => {
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
    >
      <div className={`customSelect ${prefixIcon && 'selectWithIcon'} ${className ?? className}`}>
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          required={required}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            value={value}
            onSelect={onSelect}
            showSearch={showSearch}
            mode={mode}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            defaultValue={defaultValue}
            onChange={onChange}
            optionFilterProp="children"
            suffixIcon={
              <div className="selectIcons">
                {prefixIcon ? (
                  <>
                    <span className="prefixIcon">{prefixIcon}</span>
                    <span className="selectArrowIcon">{suffixIcon || <DownOutlined />}</span>
                  </>
                ) : (
                  <span className="selectArrowIcon">{suffixIcon || <DownOutlined />}</span>
                )}
              </div>
            }
          >
            {optionLabel?.map((item: any) => {
              return (
                <Select.Option key={item.value} value={item.value} label={item.name}>
                  {item?.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </div>
    </Col>
  );
};
export const AddRating = (props: any) => {
  return (
    <Col {...props.col}>
      <Form.Item
        name={props.name}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={props.label}
        rules={props.rules}
        tooltip={props.tooltip}
      >
        <Rate onChange={props?.handleRatingChange} value={props?.rating} />
      </Form.Item>
    </Col>
  );
};

export const RenderVendorSelectInput = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  required,
  onChange,
  value,
  className = '',
  optionLabel,
  disabled,
  onSelect,
  showSearch,
  mode,
  placeholder,
  allowClear,
  defaultValue,
  prefixIcon = '',
  suffixIcon,
  callList
}: IRenderSelectProps) => {
  const handlePopupScroll = (e: any) => {
    const target = e.target;
    if (target.scrollTop + target.clientHeight === target.scrollHeight) {
      callList();
    }
  };
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
    >
      <div className={`customSelect ${prefixIcon && 'selectWithIcon'} ${className ?? className}`}>
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          required={required}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            value={value}
            onSelect={onSelect}
            showSearch={showSearch}
            mode={mode}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            defaultValue={defaultValue}
            onChange={onChange}
            optionFilterProp="children"
            onPopupScroll={handlePopupScroll}
            suffixIcon={
              <div className="selectIcons">
                {prefixIcon ? (
                  <>
                    <span className="prefixIcon">{prefixIcon}</span>
                    <span className="selectArrowIcon">{suffixIcon || <DownOutlined />}</span>
                  </>
                ) : (
                  <span className="selectArrowIcon">{suffixIcon || <DownOutlined />}</span>
                )}
              </div>
            }
          >
            {optionLabel?.map((item: any) => {
              return (
                <Select.Option key={item._id} value={item._id} label={item.firstName}>
                  {item?.firstName
                    ? item?.firstName
                      ? item.firstName.charAt(0).toUpperCase() +
                        item.firstName.slice(1).replace(/-/g, ' ')
                      : item?.firstName
                    : item?.phoneNumber
                    ? item.phoneNumber.charAt(0).toUpperCase() +
                      item.phoneNumber.slice(1).replace(/-/g, ' ')
                    : item?.phoneNumber}
                  {}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </div>
    </Col>
  );
};

// export const RenderCkEditor = (props: any) => {
//   return (
//     <CKEditor
//       activeClass="p10"
//       content={props?.data}
//       events={{
//         change: props.onChange
//       }}
//     />
//   );
// };

export const RenderCkEditor = ({ value, onChange }: any) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      // config={{
      //   toolbar: [
      //     'heading',
      //     '|',
      //     'bold',
      //     'italic',
      //     'link',
      //     'bulletedList',
      //     'numberedList',
      //     'blockQuote',
      //     '|',
      //     'undo',
      //     'redo'
      //   ]
      // }}
      onChange={(_event, editor) => {
        const data = editor.getData();
        if (onChange) {
          onChange(data);
        }
      }}
    />
  );
};
