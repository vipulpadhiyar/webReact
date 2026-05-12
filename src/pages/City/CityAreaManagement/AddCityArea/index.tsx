import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RenderCkEditor, RenderSelectInput, RenderTextInput } from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { cityListView } from 'services/api/city/type';
import { cityAreaAPI } from 'services/api/cityArea';
import { cityAreaRequestParma } from 'services/api/cityArea/type';
import { cityAreaKeys } from 'services/hooks/queryKeys';

import { fieldLength, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import {
  aboutCategoryValidator,
  generateLengthValidationRules,
  getCityList,
  getLatLongFromCityName
} from 'utils/functions';

const pathNames: any = [
  {
    title: 'City Area Management',
    href: ROUTES.cityAreaManagement
  },
  {
    title: 'Add'
  }
];

const AddCityArea = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();
  const [cityList, setCityList] = useState<any>();
  const [imageValidation, setImageValidation] = useState<string>();

  useEffect(() => {
    getCityList().then((data) => {
      data.sort((a: cityListView, b: cityListView) => {
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
      setCityList(data);
    });
  }, []);

  const onSubmit = async ({ cityId, name, aboutArea }: cityAreaRequestParma) => {
    if (!imageUrlPath || imageUrlPath === '') {
      setImageValidation('Image is required');
      return;
    }
    const cityName = cityList?.find((val: any) => val?._id === cityId);
    const areaLatLong = await getLatLongFromCityName(cityName?.name, name);
    const requestPayload: cityAreaRequestParma = {
      aboutArea,
      cityId,
      name,
      // faq,
      image: imageUrlPath || '',
      lat: areaLatLong?.lat ?? 0,
      lng: areaLatLong?.lng ?? 0,
      postalCode: areaLatLong?.postalCode ?? ''
    };
    cityAreaAPI
      .addCityArea(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(cityAreaKeys.all);
        navigate(ROUTES.cityAreaManagement);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };
  const onSelectCity = () => {
    form.setFieldsValue({ name: '' });
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
              <span style={commonStyles.colorCode}>*</span> City Area Image
            </label>
            <UploadImage
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              setImageUrlPath={setImageUrlPath}
              moduleName={uploadImageEnum.city}
              imageValidation={imageValidation}
              setImageValidation={setImageValidation}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderSelectInput
              showSearch
              label="City Name"
              placeholder="Please select city Name"
              name="cityId"
              rules={[
                {
                  required: true,
                  message: 'Please select city Name'
                }
              ]}
              optionLabel={cityList}
              onSelect={onSelectCity}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="City Area Name"
              placeholder="Please enter city area name"
              name="name"
              rules={generateLengthValidationRules(
                'City area',
                fieldLength.minimumName,
                fieldLength.maximumName
              )}
            />
          </Col>
          <Col xs={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="About Area"
              name="aboutArea"
              rules={[
                {
                  validator: (_, value) =>
                    aboutCategoryValidator(
                      _,
                      value?.editor?.getData() ?? value,
                      'Please enter about area'
                    ),
                  required: true,
                  message: 'Please enter about area'
                }
              ]}
            >
              {/* <ReactQuill theme="snow" onChange={(e) => form.setFieldValue('aboutCategory', e)} /> */}
              {/* <RenderCkEditor
                data={Form.useWatch('aboutArea', form)}
                onChange={(evt: any) => {
                  const newContent = evt.editor.getData();
                  form.setFieldValue('aboutArea', newContent);
                }}
              /> */}
              <RenderCkEditor
                value={Form.useWatch('aboutArea', form)}
                onChange={(newContent: any) => {
                  form.setFieldValue('aboutArea', newContent);
                }}
              />
            </Form.Item>
          </Col>
          {/* <Col xs={24} lg={12}>
            <RenderTextInput
              label="About Area"
              placeholder="Please Enter About Area"
              name="aboutArea"
              rules={generateLengthValidationRules(
                'About area',
                fieldLength.minimumAbout,
                fieldLength.maximumAbout
              )}
            />
          </Col> */}

          {/* <Col xs={24}>
            <FaqCommon />
          </Col> */}
        </Row>
      </Form>
    </div>
  );
};

export default AddCityArea;
