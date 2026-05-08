import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
import { subServiceKeys } from 'services/hooks/queryKeys';
import { useSubServiceView } from 'services/hooks/subService';

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
    title: 'Sub Service Management',
    href: ROUTES.subServiceManagement
  },
  {
    title: 'Edit'
  }
];

const EditSubService = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { _id } = useParams();
  const { data } = useSubServiceView(_id);
  const { updateSubServiceDetails, listService } = subServiceAPI;
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();
  const [imageValidation, setImageValidation] = useState<string | undefined>();
  const [serviceImageUrl, setServiceImageUrl] = useState<string>();
  const [serviceImageUrlPath, setServiceImageUrlPath] = useState<string | undefined>();
  const [serviceImageValidation, setServiceImageValidation] = useState<string | undefined>();
  const [serviceList, setServiceList] = useState<any>();
  const [fieldsCkEditorData, setFieldsCkEditorData] = useState([]);

  useEffect(() => {
    const formattedName = data?.name ? replaceAndCapitalize(data?.name) : '';
    form.setFieldsValue({
      name: formattedName,
      serviceId: data?.serviceId,
      price: data?.price,
      commission: data?.commission,
      aboutSubService: data?.aboutSubService,
      gst: data?.gst,
      totalNumberOfRating: data?.totalNumberOfRating,
      rating: data?.rating,
      faq: data?.faq,
      howItWork: data?.howItWork
    });
    if (data) setFieldsCkEditorData(data?.subServiceDetails);
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
      setServiceList(
        data?.list?.map((v: any) => {
          return { ...v, name: replaceAndCapitalize(v?.name) };
        })
      );
    });
  }, [data]);

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
    if ((!imageUrlPath || imageUrlPath === '') && data?.image === '') {
      setImageValidation('Image is required');
      return;
    }
    if ((!serviceImageUrlPath || serviceImageUrlPath === '') && !data?.subServiceDetailImage) {
      setServiceImageValidation('Image is required');
      return;
    }
    const requestPayload: addSubServiceForm = {
      aboutSubService,
      name,
      commission,
      price,
      serviceId,
      image: imageUrlPath || data?.image || '',
      subServiceDetailImage: serviceImageUrlPath || data?.subServiceDetailImage || '',
      _id: data?._id || _id,
      gst,
      totalNumberOfRating,
      rating: rating?.toString(),
      subServiceDetails: fieldsCkEditorData?.length
        ? fieldsCkEditorData?.filter((val: any) => val?.title || val?.title?.trim() !== '')
        : data?.subServiceDetails?.length
        ? data?.subServiceDetails
        : [],
      faq: faq ?? [],
      howItWork: howItWork ?? []
    };
    updateSubServiceDetails(requestPayload)
      .then((res) => {
        message.success(res?.message);
        navigate(ROUTES.subServiceManagement);
        queryClient.invalidateQueries(subServiceKeys.all);
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
              imageUrl={
                imageUrl ?? data?.image
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subService}/${data?.image}`
                  : toAbsoluteUrl('/asset/dummy.png')
              }
              setImageUrl={setImageUrl}
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
              imageUrl={
                serviceImageUrl ?? data?.subServiceDetailImage
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subService}/${data?.subServiceDetailImage}`
                  : ''
              }
              setImageUrl={setServiceImageUrl}
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
              placeholder="Please enter service"
              name={'serviceId'}
              optionLabel={serviceList}
              rules={[
                {
                  required: true,
                  message: 'Please enter service'
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
              placeholder="Please Enter About Sub Service "
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

export default EditSubService;
