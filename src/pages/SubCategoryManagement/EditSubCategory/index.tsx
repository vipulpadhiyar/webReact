import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BannerImageCommon from 'components/common/BannerImageCommon';
import { RenderCkEditor, RenderSelectInput, RenderTextInput } from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { subCategoryAPI } from 'services/api/subCategory';
import { addSubCategoryRequestParams } from 'services/api/subCategory/type';
import { subCategoryKeys } from 'services/hooks/queryKeys';
import { useSubCategoryView } from 'services/hooks/subCategory';

import { VITE_REACT_APP_IMAGE_URL, fieldLength, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import {
  aboutCategoryValidator,
  generateLengthValidationRulesWithNumbers,
  getCategoryList,
  replaceAndCapitalize,
  toAbsoluteUrl
} from 'utils/functions';

const pathNames: any = [
  {
    title: 'Sub Category Management',
    href: ROUTES.subCategoryManagement
  },
  {
    title: 'Edit'
  }
];

const EditSubCategory = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useSubCategoryView(_id);
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string>();
  const { updateSubCategoryDetails } = subCategoryAPI;
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState<any>();
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [newUploadedFiles, setNewUploadedFiles] = useState<any[]>([]);
  const [removeUploadedFiles, setRemoveUploadedFiles] = useState<any[]>([]);
  const [initialUploadedFiles, setInititalUploadedFiles] = useState<any[]>([]);

  useEffect(() => {
    const formattedName = data?.name ? replaceAndCapitalize(data?.name) : '';
    form.setFieldsValue({
      name: formattedName,
      aboutSubCategory: data?.aboutSubCategory,
      categoryId: data?.categoryId,
      bannerMedia: data?.bannerMedia
    });
    setUploadedFiles(data?.bannerMedia ?? []);
    setInititalUploadedFiles(data?.bannerMedia ?? []);
    getCategoryList().then((res) => {
      setCategoryList(
        res?.map((v: any) => {
          return { ...v, name: replaceAndCapitalize(v?.name) };
        })
      );
    });
  }, [data]);

  const onSubmit = ({ aboutSubCategory, categoryId, name }: addSubCategoryRequestParams) => {
    const requestPayload: addSubCategoryRequestParams = {
      aboutSubCategory,
      categoryId,
      name,
      _id: data?._id,
      image: imageUrlPath || data?.image || '',
      bannerMedia:
        uploadedFiles?.map((val) => {
          const newObj = { ...val };
          if (val?.uid) {
            delete newObj?.uid;
          }
          if (val?.isNew) {
            delete newObj?.isNew;
          }
          return newObj;
        }) ?? [],
      newBannerMedia: newUploadedFiles ?? [],
      removeBannerMedia:
        removeUploadedFiles?.map((val) => {
          const newObj = { ...val };
          if (val?.uid) {
            delete newObj?.uid;
          }
          if (val?.isNew) {
            delete newObj?.isNew;
          }
          return newObj;
        }) ?? []
    };
    updateSubCategoryDetails(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(subCategoryKeys.all);
        navigate(ROUTES.subCategoryManagement);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };
  return (
    <div className="shadow-paper">
      <ContentHeader pathNames={pathNames} />
      <Form onFinish={onSubmit} form={form}>
        <div className="d-flex justify-content-end mb-30 m-130">
          <Button type="primary" htmlType="submit" size="large">
            Save
          </Button>
        </div>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24}>
            <label>
              {' '}
              <span style={commonStyles.colorCode}>* </span>Sub Category Image
            </label>
            <UploadImage
              imageUrl={
                imageUrl ?? data?.image
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subCategory}/${data?.image}`
                  : toAbsoluteUrl('/asset/dummy.png')
              }
              setImageUrl={setImageUrl}
              setImageUrlPath={setImageUrlPath}
              moduleName={uploadImageEnum.subCategory}
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
              label="Service Category"
              placeholder="Please enter service category"
              name={'categoryId'}
              defaultValue={data?.categoryId}
              value={data?.categoryId}
              optionLabel={categoryList}
              rules={[
                {
                  required: true,
                  message: 'Please enter service category'
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
              {/* <ReactQuill theme="snow" onChange={(e) => form.setFieldValue('aboutCategory', e)} /> */}
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
          {/* <Col xs={24} lg={12}>
            <RenderTextInput
              label="About Sub Category"
              placeholder="Please enter about sub category"
              name="aboutSubCategory"
              rules={generateLengthValidationRules(
                'About sub category',
                fieldLength.minimumAbout,
                fieldLength.maximumAbout
              )}
            />
          </Col> */}
          {/* <Col xs={24}>
            <FaqCommon />
          </Col> */}
          <Col xs={24}>
            <BannerImageCommon
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              setNewUploadedFiles={setNewUploadedFiles}
              setRemoveUploadedFiles={setRemoveUploadedFiles}
              initialUploadedFiles={initialUploadedFiles}
              fromEdit={true}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditSubCategory;
