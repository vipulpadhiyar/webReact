import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  RenderCheckBox,
  RenderCkEditor,
  RenderRadio,
  RenderTextInput
} from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { cityAPI } from 'services/api/city';
import { addCityForm, addCityRequestParams } from 'services/api/city/type';
import { useCityView } from 'services/hooks/city';
import { cityKeys } from 'services/hooks/queryKeys';

import { VITE_REACT_APP_IMAGE_URL, fieldLength, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import {
  aboutCategoryValidator,
  generateLengthValidationRules,
  getLatLongFromCityName,
  replaceAndCapitalize,
  toAbsoluteUrl
} from 'utils/functions';

const pathNames: any = [
  {
    title: 'City Management',
    href: ROUTES.cityManagement
  },
  {
    title: 'Edit'
  }
];

const EditCity = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { _id } = useParams();
  const queryClient = useQueryClient();
  const { data } = useCityView(_id);
  const { updateCityDetails } = cityAPI;
  const [isChecked, setIsChecked] = useState<boolean>(data?.showInTop || false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();

  const onChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    const formattedName = data?.name ? replaceAndCapitalize(data?.name) : '';
    form.setFieldsValue({
      city: formattedName,
      aboutCity: data?.aboutCity,
      exampleRadio: data?.enableBooking ? 'enable booking' : 'only for listing',
      faq: data?.faq
    });
    if (data) setIsChecked(data?.showInTop);
  }, [data]);

  const onSubmit = async ({ city, aboutCity, exampleRadio }: addCityForm) => {
    const getLatLong = await getLatLongFromCityName(city);
    const requestPayload: addCityRequestParams = {
      name: city,
      aboutCity: aboutCity,
      // faq: faq,
      image: imageUrlPath || data?.image || '',
      showInTop: isChecked,
      enableBooking: exampleRadio === 'enable booking' ? true : false,
      _id: data?._id,
      lat: getLatLong?.lat ?? 0,
      lng: getLatLong?.lng ?? 0
    };
    updateCityDetails(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(cityKeys.all);
        navigate(ROUTES.cityManagement);
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
              <span style={commonStyles.colorCode}>*</span> City Image
            </label>
            <UploadImage
              imageUrl={
                imageUrl ?? data?.image
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.city}/${data?.image}`
                  : toAbsoluteUrl('/asset/dummy.png')
              }
              setImageUrl={setImageUrl}
              setImageUrlPath={setImageUrlPath}
              moduleName={uploadImageEnum.city}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="City Name"
              placeholder="Please enter city name"
              name="city"
              rules={generateLengthValidationRules(
                'City name',
                fieldLength.minimumName,
                fieldLength.maximumName
              )}
            />
          </Col>
          <Col xs={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="About City"
              name="aboutCity"
              rules={[
                {
                  validator: (_, value) =>
                    aboutCategoryValidator(
                      _,
                      value?.editor?.getData() ?? value,
                      'Please enter about city'
                    ),
                  required: true,
                  message: 'Please enter about city'
                }
              ]}
            >
              {/* <ReactQuill theme="snow" onChange={(e) => form.setFieldValue('aboutCategory', e)} /> */}
              {/* <RenderCkEditor
                data={Form.useWatch('aboutCity', form)}
                onChange={(evt: any) => {
                  const newContent = evt.editor.getData();
                  form.setFieldValue('aboutCity', newContent);
                }}
              /> */}
              <RenderCkEditor
                value={Form.useWatch('aboutCity', form)}
                onChange={(newContent: any) => {
                  form.setFieldValue('aboutCity', newContent);
                }}
              />
            </Form.Item>
          </Col>
          {/* <Col xs={24} lg={12}>
            <RenderTextInput
              label="About City"
              placeholder="Please enter about city "
              name="aboutCity"
              rules={generateLengthValidationRules(
                'About city',
                fieldLength.minimumAbout,
                fieldLength.maximumAbout
              )}
            />
          </Col> */}
          <Col xs={24} lg={24}>
            <RenderRadio name="exampleRadio" options={['enable booking', 'only for listing']} />
          </Col>
          <Col xs={24} lg={24}>
            <RenderCheckBox checked={isChecked} col={{ sm: 24 }} onChange={onChange}>
              Show this city in top 5
            </RenderCheckBox>
          </Col>
          {/* <Col xs={24}>
            <FaqCommon />
          </Col> */}
        </Row>
      </Form>
    </div>
  );
};

export default EditCity;
