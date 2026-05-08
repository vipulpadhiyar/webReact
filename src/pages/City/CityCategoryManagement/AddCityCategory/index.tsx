import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RenderSelectInput } from 'components/common/FormField';
import ContentHeader from 'components/layout/contentHeader';

import { cityListView } from 'services/api/city/type';
import { cityCategoryAPI } from 'services/api/cityCategory';
import { addCityCategoryForm } from 'services/api/cityCategory/type';
import { serviceView } from 'services/api/service/type';
import { categoryView } from 'services/api/subCategory/type';
import { cityCategoryKeys } from 'services/hooks/queryKeys';

import { ROUTES } from 'utils/constants/routes';
import { getCategoryList, getCityList } from 'utils/functions';

const pathNames: any = [
  {
    title: 'City Category Management',
    href: ROUTES.cityCategoryManagement
  },
  {
    title: 'Add'
  }
];

const AddCityCategory = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { addCityCAtegory } = cityCategoryAPI;
  const [cityList, setCityList] = useState<any>();
  const [categoryList, setCategoryList] = useState<any>();
  const [serviceList, setServiceList] = useState<any>();

  useEffect(() => {
    getCategoryList().then((data) => {
      data?.sort((a: categoryView, b: categoryView) => {
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
      setCategoryList(data);
    });
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

  const onselectCategoryId = async (id: string) => {
    const category = categoryList.find((category: any) => category._id === id);
    category?.service.sort((a: serviceView, b: serviceView) => {
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
    setServiceList(category?.service);
    form.setFieldsValue({
      serviceIds: []
    });
  };

  const onSubmit = ({ cityId, categoryId, serviceIds }: addCityCategoryForm) => {
    const array = [];
    array.push(serviceIds);
    const requestPayload: addCityCategoryForm = {
      categoryId,
      cityId,
      serviceIds: serviceIds
      // faq
    };
    addCityCAtegory(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(cityCategoryKeys.all);
        navigate(ROUTES.cityCategoryManagement);
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
            <RenderSelectInput
              showSearch
              label="City Name"
              placeholder="Please select city name"
              name={'cityId'}
              optionLabel={cityList}
              rules={[
                {
                  required: true,
                  message: 'Please select city name'
                }
              ]}
            />
          </Col>
          {/* <Col xs={24} lg={12}>
            <RenderSelectInput
              showSearch
              label="Area Name"
              placeholder="Please select Area Name"
              name={'cityAreaId'}
              optionLabel={areaList}
              rules={[
                {
                  required: true,
                  message: 'Please select Area Name'
                }
              ]}
            />
          </Col> */}
          <Col xs={24} lg={12}>
            <RenderSelectInput
              showSearch
              label="Category Name"
              placeholder="Please select category name"
              name={'categoryId'}
              optionLabel={categoryList}
              onSelect={onselectCategoryId}
              rules={[
                {
                  required: true,
                  message: 'Please select category name'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderSelectInput
              showSearch
              label="Service Name"
              placeholder="Please select service name"
              name={'serviceIds'}
              optionLabel={serviceList}
              mode={'multiple'}
              rules={[
                {
                  required: true,
                  message: 'Please select service name'
                }
              ]}
            />
          </Col>
          {/* <Col xs={24}>
            <FaqCommon />
          </Col> */}
        </Row>
      </Form>
    </div>
  );
};

export default AddCityCategory;
