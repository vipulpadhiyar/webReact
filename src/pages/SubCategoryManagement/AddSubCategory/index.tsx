import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import BannerImageCommon from 'components/common/BannerImageCommon';
import BannerImageCommon from 'components/common/BannerImageCommon';
import { RenderCkEditor, RenderSelectInput, RenderTextInput } from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { subCategoryAPI } from 'services/api/subCategory';
import { addSubCategoryRequestParams } from 'services/api/subCategory/type';
import { categoryKeys, subCategoryKeys } from 'services/hooks/queryKeys';

import { fieldLength, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import {
  aboutCategoryValidator,
  generateLengthValidationRulesWithNumbers,
  getCategoryList
} from 'utils/functions';

const pathNames: any = [
  {
    title: 'Sub Category Management',
    href: ROUTES.subCategoryManagement
  },
  {
    title: 'Add'
  }
];

const AddSubCategory = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { addSubCategoryDetails } = subCategoryAPI;
  const [imageUrl, setImageUrl] = useState<string>();
  const queryClient = useQueryClient();
  const [imageUrlPath, setImageUrlPath] = useState<string>();
  const [categoryList, setCategoryList] = useState<any>();
  const [imageValidation, setImageValidation] = useState<string>();
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  useEffect(() => {
    getCategoryList().then((data) => {
      setCategoryList(data);
    });
  }, []);

  const onSubmit = ({ aboutSubCategory, categoryId, name }: addSubCategoryRequestParams) => {
    if (!imageUrlPath || imageUrlPath === '') {
      setImageValidation('Image is required');
      return;
    }
    const requestPayload: addSubCategoryRequestParams = {
      aboutSubCategory,
      categoryId,
      name,
      image: imageUrlPath || '',
      bannerMedia:
        uploadedFiles?.map((val) => {
          const newObj = { ...val };
          if (val?.isNew) {
            delete newObj?.isNew;
          }
          return newObj;
        }) ?? []
    };
    addSubCategoryDetails(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(subCategoryKeys.all);
        queryClient.invalidateQueries(categoryKeys.all);
        navigate(ROUTES.subCategoryManagement);
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
          <Col xs={24}>
            <label>
              <span style={commonStyles.colorCode}>*</span> Sub Category Image
            </label>
            <UploadImage
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              setImageUrlPath={setImageUrlPath}
              moduleName={uploadImageEnum.subCategory}
              imageValidation={imageValidation}
              setImageValidation={setImageValidation}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Sub Category Name"
              placeholder="Please enter sub category name"
              name="name"
              rules={generateLengthValidationRulesWithNumbers(
                'Sub category name',
                fieldLength.minimumName,
                fieldLength.maximumName
              )}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderSelectInput
              showSearch
              label="Category"
              placeholder="Please select category"
              name={'categoryId'}
              optionLabel={categoryList}
              rules={[
                {
                  required: true,
                  message: 'Please select category'
                }
              ]}
            />
          </Col>
          <Col xs={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name={'aboutSubCategory'}
              label="About Sub Category"
              rules={[
                {
                  validator: (_, value) =>
                    aboutCategoryValidator(
                      _,
                      value?.editor?.getData() ?? value,
                      'Please enter about sub category'
                    ),
                  required: true,
                  message: 'Please enter about sub category'
                }
              ]}
            >
              {/* <RenderCkEditor
                data={Form.useWatch('aboutSubCategory', form)}
                onChange={(evt: any) => {
                  const newContent = evt.editor.getData();
                  form.setFieldValue('aboutSubCategory', newContent);
                }}
              /> */}
              <RenderCkEditor
                value={Form.useWatch('aboutSubCategory', form)}
                onChange={(newContent: any) => {
                  form.setFieldValue('aboutSubCategory', newContent);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <BannerImageCommon uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddSubCategory;
