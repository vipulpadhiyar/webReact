import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FaqCommon from 'components/common/Faq';
import {
  AddRating,
  RenderCheckBox,
  RenderCkEditor,
  RenderSelectInput,
  RenderTextInput
} from 'components/common/FormField';
import HowItWorksCommon from 'components/common/HowItWorksCommon';
import ServiceDetailsCommon from 'components/common/ServiceDetailsCommon';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { categoryView } from 'services/api/category/type';
import { serviceAPI } from 'services/api/service';
import { addServiceForm, serviceFrom } from 'services/api/service/type';
import { serviceKeys } from 'services/hooks/queryKeys';
import { useServiceView } from 'services/hooks/service';

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
    title: 'Service Management',
    href: ROUTES.serviceManagement
  },
  {
    title: 'Edit'
  }
];

const EditService = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { _id } = useParams();
  const { data } = useServiceView(_id);
  const { updateServiceDetails } = serviceAPI;
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();
  const [imageValidation, setImageValidation] = useState<string>();
  const [serviceImageUrl, setServiceImageUrl] = useState<string>();
  const [serviceImageValidation, setServiceImageValidation] = useState<string>();
  const [serviceImageUrlPath, setServiceImageUrlPath] = useState<string | undefined>();
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState<any>();
  const [subCategoryList, setSubCategoryList] = useState<any>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [fieldsCkEditorData, setFieldsCkEditorData] = useState([]);

  const onChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };
  useEffect(() => {
    const formattedName = data?.name ? replaceAndCapitalize(data?.name) : '';
    form.setFieldsValue({
      service: formattedName,
      servicePrice: data?.price,
      serviceCommission: data?.commission,
      aboutService: data?.aboutService,
      category: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      gst: data?.gst,
      totalNumberOfRating: data?.totalNumberOfRating,
      rating: data?.rating,
      faq: data?.faq,
      howItWork: data?.howItWork
    });
    if (data) setFieldsCkEditorData(data?.serviceDetails);
    if (data) setIsChecked(data?.isHasSubService);

    getCategoryList().then((res) => {
      res.sort((a: categoryView, b: categoryView) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setCategoryList(
        res?.map((v: any) => {
          return { ...v, name: replaceAndCapitalize(v?.name) };
        })
      );
      const category = res.find((category: any) => category._id === data?.categoryId);
      setSubCategoryList(
        category?.service?.map((v: any) => {
          return { ...v, name: replaceAndCapitalize(v?.name) };
        })
      );
    });
  }, [data]);

  const onSubmit = ({
    service,
    category,
    servicePrice,
    serviceCommission,
    aboutService,
    subCategoryId,
    gst,
    rating,
    totalNumberOfRating,
    faq,
    howItWork
  }: serviceFrom) => {
    if ((!imageUrlPath || imageUrlPath === '') && data?.image === '') {
      setImageValidation('Image is required');
      return;
    }
    if ((!serviceImageUrlPath || serviceImageUrlPath === '') && !data?.serviceDetailImage) {
      setServiceImageValidation('Image is required');
      return;
    }
    const requestPayload: addServiceForm = {
      aboutService: aboutService,
      categoryId: category,
      commission: isChecked ? '0' : serviceCommission,
      // faq: faq,
      image: imageUrlPath || data?.image || '',
      serviceDetailImage: serviceImageUrlPath || data?.serviceDetailImage || '',
      name: service,
      price: isChecked ? '0' : servicePrice,
      _id: data?._id,
      subCategoryId: subCategoryId,
      gst: isChecked ? '0' : gst,
      rating: isChecked ? '0' : rating?.toString(),
      totalNumberOfRating: isChecked ? '0' : totalNumberOfRating,
      isHasSubService: isChecked,
      serviceDetails: fieldsCkEditorData?.length
        ? fieldsCkEditorData?.filter((val: any) => val?.title || val?.title?.trim() !== '')
        : data?.serviceDetails?.length
        ? data?.serviceDetails
        : [],
      faq: faq ?? [],
      howItWork: howItWork ?? []
    };
    updateServiceDetails(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(serviceKeys.all);
        navigate(ROUTES.serviceManagement);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const onselectCategoryId = (id: string) => {
    const areaList = categoryList.find((category: any) => category._id === id);
    areaList?.service?.sort((a: categoryView, b: categoryView) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setSubCategoryList(areaList?.service);
    form.setFieldsValue({ subCategoryId: '' });
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
          <Col xs={24} lg={12}>
            <label>
              <span style={commonStyles.colorCode}>*</span> Service Image
            </label>
            <UploadImage
              imageUrl={
                imageUrl ?? data?.image
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.service}/${data?.image}`
                  : toAbsoluteUrl('/asset/dummy.png')
              }
              setImageUrl={setImageUrl}
              setImageUrlPath={setImageUrlPath}
              moduleName={uploadImageEnum.service}
              imageValidation={imageValidation}
              setImageValidation={setImageValidation}
            />
          </Col>
          <Col xs={24} lg={12}>
            <label>
              <span style={commonStyles.colorCode}>*</span> Service Detail Image
            </label>
            <UploadImage
              imageUrl={
                serviceImageUrl ?? data?.serviceDetailImage
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.service}/${data?.serviceDetailImage}`
                  : ''
              }
              setImageUrl={setServiceImageUrl}
              setImageUrlPath={setServiceImageUrlPath}
              moduleName={uploadImageEnum.service}
              imageValidation={serviceImageValidation}
              setImageValidation={setServiceImageValidation}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Service Name"
              placeholder="Please enter category name"
              name="service"
              rules={generateLengthValidationRulesWithNumbers(
                'Service Name',
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
              name={'category'}
              defaultValue={data?.categoryName}
              value={data?.categoryName}
              optionLabel={categoryList}
              rules={[
                {
                  required: true,
                  message: 'Please enter service category'
                }
              ]}
              onChange={onselectCategoryId}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderSelectInput
              showSearch
              label="Service Sub Category"
              placeholder="Please enter service sub category"
              name={'subCategoryId'}
              optionLabel={subCategoryList}
              rules={[
                {
                  required: true,
                  message: 'Please enter service sub category'
                }
              ]}
            />
          </Col>
          <Col xs={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="About Service"
              name="aboutService"
              rules={[
                {
                  validator: (_, value) =>
                    aboutCategoryValidator(
                      _,
                      value?.editor?.getData() ?? value,
                      'Please enter about service '
                    ),
                  required: true,
                  message: 'Please enter about service '
                }
              ]}
            >
              {/* <ReactQuill theme="snow" onChange={(e) => form.setFieldValue('aboutCategory', e)} /> */}
              {/* <RenderCkEditor
                data={Form.useWatch('aboutService', form)}
                onChange={(evt: any) => {
                  const newContent = evt.editor.getData();
                  form.setFieldValue('aboutService', newContent);
                }}
              /> */}
              <RenderCkEditor
                value={Form.useWatch('aboutService', form)}
                onChange={(newContent: any) => {
                  form.setFieldValue('aboutService', newContent);
                }}
              />
            </Form.Item>
          </Col>
          {/* <Col xs={24} lg={12}>
            <RenderTextInput
              label="About Service"
              placeholder="Please Enter About Service "
              name="aboutService"
              rules={generateLengthValidationRules(
                'About service',
                fieldLength.minimumAbout,
                fieldLength.maximumAbout
              )}
            />
          </Col> */}
          <Col xs={24} lg={24}>
            <RenderCheckBox
              name={'isCheckedInTop'}
              checked={isChecked}
              value={isChecked}
              col={{ sm: 24 }}
              onChange={onChange}
            >
              Is has sub-service?
            </RenderCheckBox>
          </Col>
          {!isChecked && (
            <>
              <Col xs={24} lg={12}>
                <RenderTextInput
                  label="Service Price"
                  placeholder="Please enter service price"
                  name="servicePrice"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter service price'
                    },
                    {
                      pattern: /^[1-9]\d*$/, // Only allow numbers greater than 0
                      message: 'Please enter a valid number greater than 0'
                    },
                    () => ({
                      validator(_: any, value: any) {
                        if (value && parseInt(value, 10) > 100000) {
                          return Promise.reject(
                            new Error('Service price should not be more than 100000')
                          );
                        }
                        return Promise.resolve();
                      }
                    })
                  ]}
                />
              </Col>
              <Col xs={24} lg={12}>
                <RenderTextInput
                  label="Service Commission(in %)"
                  placeholder="Please enter service Commission"
                  name="serviceCommission"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter service Commission'
                    },
                    {
                      pattern: /^[0-9]+$/, // Only allow numbers
                      message: 'Please enter a valid number'
                    },
                    () => ({
                      validator(_: any, value: any) {
                        if (value && parseInt(value, 10) > 100) {
                          return Promise.reject(
                            new Error('Service commission should not be more than 100%')
                          );
                        }
                        return Promise.resolve();
                      }
                    })
                  ]}
                />
              </Col>
              <Col xs={24} lg={12}>
                <RenderTextInput
                  label="GST(in %)"
                  placeholder="Please enter GST"
                  name="gst"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter GST'
                    },
                    {
                      pattern: /^[0-9]+$/, // Only allow numbers
                      message: 'Please enter a valid number'
                    },
                    () => ({
                      validator(_: any, value: any) {
                        if (value && parseInt(value, 10) > 100) {
                          return Promise.reject(new Error('GST should not be more than 100%'));
                        }
                        return Promise.resolve();
                      }
                    })
                  ]}
                />
              </Col>
              <Col xs={24} lg={12}>
                <RenderTextInput
                  label="Total Number of Rating"
                  placeholder="Please enter total number of rating"
                  name="totalNumberOfRating"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter total number of rating'
                    },
                    {
                      pattern: /^[0-9]+$/, // Only allow numbers
                      message: 'Please enter total number of rating'
                    },
                    () => ({
                      validator(_: any, value: any) {
                        if (value && parseInt(value, 10) > 1000000) {
                          return Promise.reject(
                            new Error('Total number of rating should not be more than 1000000')
                          );
                        }
                        return Promise.resolve();
                      }
                    })
                  ]}
                />
              </Col>
              <Col xs={24} lg={12}>
                <AddRating label={'Rating'} name="rating" onChange={onratechange} />
              </Col>
            </>
          )}
          <Col xs={24} lg={24}>
            <ServiceDetailsCommon
              title="Service Details"
              fieldsData={fieldsCkEditorData}
              setFieldsData={setFieldsCkEditorData}
            />
          </Col>
          <Col xs={24} lg={24}>
            <HowItWorksCommon />
          </Col>
          <Col xs={24} lg={24}>
            <FaqCommon />
          </Col>
          {/* <Col xs={24}>
            <FaqCommon />
          </Col> */}
        </Row>
      </Form>
    </div>
  );
};

export default EditService;
