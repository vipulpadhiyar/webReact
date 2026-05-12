import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AddRating,
  RenderCheckBox,
  RenderCkEditor,
  RenderTextInput
} from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { categoryAPI } from 'services/api/category';
import { addCategoryRequestParams, addForm } from 'services/api/category/type';
import { categoryKeys } from 'services/hooks/queryKeys';

import { fieldLength, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { aboutCategoryValidator, generateLengthValidationRulesWithNumbers } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Category Management',
    href: ROUTES.categoryManagement
  },
  {
    title: 'Add'
  }
];

const AddCategory = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { addCategoryDetails } = categoryAPI;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isAlgoCheck, setIsAlgoCheck] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>();
  const [imageValidation, setImageValidation] = useState<string>();
  const queryClient = useQueryClient();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();
  const [featureImageUrl, setFeatureImageUrl] = useState<string>();
  const [featureImageUrlPath, setFeatureImageUrlPath] = useState<string | undefined>();

  const onChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  const onChangeAlgo = (e: CheckboxChangeEvent) => {
    setIsAlgoCheck(e.target.checked);
  };

  const onSubmit = ({ category, aboutCategory, rating }: addForm) => {
    if (!imageUrlPath || imageUrlPath === '') {
      setImageValidation('Image is required');
      return;
    }
    const requestPayload: addCategoryRequestParams = {
      name: category,
      aboutCategory: aboutCategory,
      image: imageUrlPath || '',
      showInTop: isChecked,
      featureImage: featureImageUrlPath || '',
      rating: rating?.toString(),
      isOneKmAlgorithm: isAlgoCheck
      // faq: faq
    };
    addCategoryDetails(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(categoryKeys.all);
        navigate(ROUTES.categoryManagement);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  return (
    <div className="shadow-paper">
      <ContentHeader pathNames={pathNames} />
      <Form form={form} onFinish={onSubmit}>
        <div className="d-flex justify-content-end mb-30 m-130">
          <Button type="primary" htmlType="submit" size="large">
            Save
          </Button>
        </div>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} lg={6}>
            <label>
              <span style={commonStyles.colorCode}>*</span> Category Image
            </label>
            <UploadImage
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              setImageUrlPath={setImageUrlPath}
              moduleName={uploadImageEnum.category}
              imageValidation={imageValidation}
              setImageValidation={setImageValidation}
            />
          </Col>
          <Col xs={24} lg={12}>
            <label>Feature Image</label>
            <UploadImage
              setImageUrl={setFeatureImageUrl}
              imageUrl={featureImageUrl}
              setImageUrlPath={setFeatureImageUrlPath}
              moduleName={uploadImageEnum.category}
            />
          </Col>

          <RenderTextInput
            col={{ xs: 24, lg: 12 }}
            label="Category Name"
            placeholder="Please enter category name"
            name="category"
            rules={generateLengthValidationRulesWithNumbers(
              'Category name',
              fieldLength.minimumName,
              fieldLength.maximumName
            )}
          />
          <Col xs={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name={'aboutCategory'}
              label="About Category"
              rules={[
                {
                  validator: (_, value) =>
                    aboutCategoryValidator(
                      _,
                      value?.editor?.getData() ?? value,
                      'Please enter about category'
                    ),
                  required: true,
                  message: 'Please enter about category'
                }
              ]}
            >
              {/* <ReactQuill theme="snow" onChange={(e) => form.setFieldValue('aboutCategory', e)} /> */}
              {/* <RenderCkEditor
                data={Form.useWatch('aboutCategory', form)}
                onChange={(evt: any) => {
                  const newContent = evt.editor.getData();
                  form.setFieldValue('aboutCategory', newContent);
                }}
              /> */}
              <RenderCkEditor
                value={Form.useWatch('aboutCategory', form)}
                onChange={(newContent: any) => {
                  form.setFieldValue('aboutCategory', newContent);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <RenderCheckBox
              name={'isCheckedInTop'}
              checked={isChecked}
              value={isChecked}
              col={{ sm: 24 }}
              onChange={onChange}
            >
              Show this category in most book
            </RenderCheckBox>
          </Col>
          <Col xs={24} lg={12}>
            <AddRating label={'Rating'} name="rating" />
          </Col>
          <Col xs={24} lg={24}>
            <RenderCheckBox
              name={'isAlgoCheck'}
              checked={isAlgoCheck}
              value={isAlgoCheck}
              col={{ sm: 24 }}
              onChange={onChangeAlgo}
            >
              Apply one km duty algorithm
            </RenderCheckBox>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default React.memo(AddCategory);
