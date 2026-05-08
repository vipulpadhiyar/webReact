import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  AddRating,
  RenderCheckBox,
  RenderCkEditor,
  RenderTextInput
} from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { categoryAPI } from 'services/api/category';
import { addForm, updateCategoryRequestParams } from 'services/api/category/type';
import { useCategoryView } from 'services/hooks/category';
import { categoryKeys } from 'services/hooks/queryKeys';

import { VITE_REACT_APP_IMAGE_URL, fieldLength, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import {
  aboutCategoryValidator,
  generateLengthValidationRulesWithNumbers,
  replaceAndCapitalize,
  toAbsoluteUrl
} from 'utils/functions';

const pathNames: any = [
  {
    title: 'Category Management',
    href: ROUTES.categoryManagement
  },
  {
    title: 'Edit'
  }
];

const EditCategory = () => {
  const navigate = useNavigate();
  const { updateCategoryDetails } = categoryAPI;
  const [form] = Form.useForm();
  const { _id } = useParams();
  const { data } = useCategoryView(_id);
  const [isChecked, setIsChecked] = useState<boolean>(data?.showInTop ?? false);
  const [isAlgoCheck, setIsAlgoCheck] = useState<boolean>(data?.isOneKmAlgorithm ?? false);

  const [imageValidation, setImageValidation] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const queryClient = useQueryClient();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();
  const [featureImageUrl, setFeatureImageUrl] = useState<string>();
  const [featureImageUrlPath, setFeatureImageUrlPath] = useState<string | undefined>();

  useEffect(() => {
    if (data) {
      setIsAlgoCheck(data?.isOneKmAlgorithm);
    }
  }, [data]);

  const onChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  const onChangeAlgo = (e: CheckboxChangeEvent) => {
    setIsAlgoCheck(e.target.checked);
  };

  const onSubmit = ({ name, aboutCategory, rating }: addForm) => {
    if ((!imageUrlPath || imageUrlPath === '') && data?.image === '') {
      setImageValidation('Image is required');
      return;
    }
    const requestPayload: updateCategoryRequestParams = {
      name: name || '',
      aboutCategory: aboutCategory,
      image: imageUrlPath || data?.image || '',
      featureImage: featureImageUrlPath || data?.featureImage || '',
      showInTop: isChecked,
      isOneKmAlgorithm: isAlgoCheck,
      // faq: faq,
      _id: data?._id || '',
      rating: rating?.toString() || data?.rating?.toString()
    };

    updateCategoryDetails(requestPayload)
      .then((res) => {
        queryClient.invalidateQueries(categoryKeys.all);
        navigate(ROUTES.categoryManagement);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  useEffect(() => {
    const formattedName = data?.name ? replaceAndCapitalize(data?.name) : '';
    form.setFieldsValue({
      name: formattedName,
      aboutCategory: data?.aboutCategory,
      faq: data?.faq,
      rating: data?.rating
    });
    if (data) setIsChecked(data?.showInTop);
  }, [data]);
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
              imageUrl={
                imageUrl ?? data?.image
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.category}/${data?.image}`
                  : toAbsoluteUrl('/asset/dummy.png')
              }
              setImageUrl={setImageUrl}
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
              imageUrl={
                featureImageUrl ?? data?.featureImage
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.category}/${data?.featureImage}`
                  : ''
              }
              setImageUrlPath={setFeatureImageUrlPath}
              moduleName={uploadImageEnum.category}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Category Name"
              placeholder="Please enter category name"
              value={data?.name}
              name="name"
              rules={generateLengthValidationRulesWithNumbers(
                'Category name',
                fieldLength.minimumName,
                fieldLength.maximumName
              )}
            />
          </Col>
          {/* <Col xs={24} lg={12}>
            <RenderTextInput
              label="About Category"
              placeholder="Please enter about category "
              name="aboutCategory"
              value={data?.aboutCategory}
              rules={generateLengthValidationRules(
                'About category',
                fieldLength.minimumAbout,
                fieldLength.maximumAbout
              )}
            />
          </Col> */}
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
              defaultChecked={data?.showInTop}
              checked={isChecked}
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
              defaultChecked={data?.isOneKmAlgorithm}
              checked={isAlgoCheck}
              col={{ sm: 24 }}
              onChange={onChangeAlgo}
            >
              Apply one km duty algorithm
            </RenderCheckBox>
          </Col>
          {/* 
          <Col xs={24}>
            <FaqCommon />
          </Col> */}
        </Row>
      </Form>
    </div>
  );
};

export default EditCategory;
