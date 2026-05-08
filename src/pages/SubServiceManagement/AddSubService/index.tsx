import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FaqCommon from 'components/common/Faq';
import {
  AddRating,
  RenderCkEditor,
  RenderSelectInput,
  RenderTextInput
} from 'components/common/FormField';
import HowItWorksCommon from 'components/common/HowItWorksCommon';
import ServiceDetailsCommon from 'components/common/ServiceDetailsCommon';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { subServiceAPI } from 'services/api/subService';
import { addSubServiceForm, subServiceView } from 'services/api/subService/type';
import { serviceKeys, subServiceKeys } from 'services/hooks/queryKeys';

import { defaultValue, fieldLength, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { aboutCategoryValidator, generateLengthValidationRulesWithNumbers } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Sub Service Management',
    href: ROUTES.subServiceManagement
  },
  {
    title: 'Add'
  }
];

const AddSubService = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { addSubServiceDetails, listService } = subServiceAPI;
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrlPath, setImageUrlPath] = useState<string>();
  const [imageValidation, setImageValidation] = useState<string>();
  const [serviceImageUrl, setServiceImageUrl] = useState<string>();
  const [serviceImageValidation, setServiceImageValidation] = useState<string>();
  const [serviceImageUrlPath, setServiceImageUrlPath] = useState<string>();
  const [serviceList, setServiceList] = useState<any>();
  const [fieldsCkEditorData, setFieldsCkEditorData] = useState([]);

  useEffect(() => {
    listService().then((data) => {
      data?.list?.sort((a: subServiceView, b: subServiceView) => {
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
      setServiceList(data?.list);
    });
    form.setFieldsValue({
      commission: defaultValue.commission
    });
  }, []);

  const onSubmit = ({
    name,
    price,
    serviceId,
    commission,
    aboutSubService,
    gst,
    rating,
    totalNumberOfRating,
    faq,
    howItWork
  }: addSubServiceForm) => {
    if (!imageUrlPath || imageUrlPath === '') {
      setImageValidation('Image is required');
      return;
    }
    if (!serviceImageUrlPath || serviceImageUrlPath === '') {
      setServiceImageValidation('Image is required');
      return;
    }
    const requestPayload: addSubServiceForm = {
      aboutSubService,
      name,
      commission,
      price,
      serviceId,
      image: imageUrlPath || '',
      subServiceDetailImage: serviceImageUrlPath || '',
      gst,
      rating: (rating && rating.toString()) || '0',
      totalNumberOfRating,
      subServiceDetails: fieldsCkEditorData?.length
        ? fieldsCkEditorData?.filter((val: any) => val?.title || val?.title?.trim() !== '')
        : [],
      faq: faq ?? [],
      howItWork: howItWork ?? []
    };
    addSubServiceDetails(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(subServiceKeys.all);
        queryClient.invalidateQueries(serviceKeys.all);
        navigate(ROUTES.subServiceManagement);
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
          <Col xs={24} lg={12}>
            <label>
              <span style={commonStyles.colorCode}>*</span> Sub Service Image
            </label>
            <UploadImage
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              setImageUrlPath={setImageUrlPath}
              moduleName={uploadImageEnum.subService}
              imageValidation={imageValidation}
              setImageValidation={setImageValidation}
            />
          </Col>
          <Col xs={24} lg={12}>
            <label>
              <span style={commonStyles.colorCode}>*</span> Sub Service Detail Image
            </label>
            <UploadImage
              setImageUrl={setServiceImageUrl}
              imageUrl={serviceImageUrl}
              setImageUrlPath={setServiceImageUrlPath}
              moduleName={uploadImageEnum.subService}
              imageValidation={serviceImageValidation}
              setImageValidation={setServiceImageValidation}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Sub Service Name"
              placeholder="Please enter sub service name"
              name="name"
              rules={generateLengthValidationRulesWithNumbers(
                'Sub service name',
                fieldLength.minimumName,
                fieldLength.maximumName
              )}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderSelectInput
              showSearch
              label="Service"
              placeholder="Please select service"
              name={'serviceId'}
              optionLabel={serviceList}
              rules={[
                {
                  required: true,
                  message: 'Please select service'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Sub Service Price"
              placeholder="Please enter sub service price"
              name="price"
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
                        new Error('Sub service price should not be more than 100000')
                      );
                    }
                    return Promise.resolve();
                  }
                })
              ]}
            />
          </Col>
          <Col xs={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="About Sub Service"
              name="aboutSubService"
              rules={[
                {
                  validator: (_, value) =>
                    aboutCategoryValidator(
                      _,
                      value?.editor?.getData() ?? value,
                      'Please enter about sub service'
                    ),
                  required: true,
                  message: 'Please enter about sub service'
                }
              ]}
            >
              {/* <ReactQuill theme="snow" onChange={(e) => form.setFieldValue('aboutCategory', e)} /> */}
              {/* <RenderCkEditor
                data={Form.useWatch('aboutSubService', form)}
                onChange={(evt: any) => {
                  const newContent = evt.editor.getData();
                  form.setFieldValue('aboutSubService', newContent);
                }}
              /> */}
              <RenderCkEditor
                value={Form.useWatch('aboutSubService', form)}
                onChange={(newContent: any) => {
                  form.setFieldValue('aboutSubService', newContent);
                }}
              />
            </Form.Item>
          </Col>
          {/* <Col xs={24} lg={12}>
            <RenderTextInput
              label="About Sub Service"
              placeholder="Please enter about sub service"
              name="aboutSubService"
              rules={generateLengthValidationRules(
                'About sub service',
                fieldLength.minimumAbout,
                fieldLength.maximumAbout
              )}
            />
          </Col> */}
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Sub Service Commission (in %)"
              placeholder="Please enter sub service Commission"
              name="commission"
              rules={[
                {
                  required: true,
                  message: 'Please enter sub service Commission'
                },
                {
                  pattern: /^[0-9]+$/, // Only allow numbers
                  message: 'Please enter a valid number'
                },
                () => ({
                  validator(_: any, value: any) {
                    if (value && parseInt(value, 10) > 100) {
                      return Promise.reject(
                        new Error('Sub Service Commission should not be more than 100%')
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
              label="GST (in %)"
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
            <AddRating label={'Rating'} name="rating" />
          </Col>
          <Col xs={24} lg={24}>
            <ServiceDetailsCommon
              title="Sub Service Details"
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
        </Row>
      </Form>
    </div>
  );
};

export default AddSubService;
