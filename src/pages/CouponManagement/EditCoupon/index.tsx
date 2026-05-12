import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, DatePicker, DatePickerProps, Form, Row, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  RenderAddVendorSelectInput,
  RenderCheckBox,
  RenderSelectInput,
  RenderTextInput,
  RenderVendorSelectInput
} from 'components/common/FormField';
import ContentHeader from 'components/layout/contentHeader';

import { ICategoryListReq } from 'services/api/category/type';
import { couponAPI } from 'services/api/coupon';
import { addCouponForms } from 'services/api/coupon/type';
import { useCouponView } from 'services/hooks/coupon';
import { couponKey } from 'services/hooks/queryKeys';

import { ROUTES } from 'utils/constants/routes';
import { getCategoryList, replaceAndCapitalize } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Coupon Management',
    href: ROUTES.couponManagement
  },
  {
    title: 'Edit'
  }
];

const discountTypJson = [
  {
    name: 'percentage',
    value: 'percentage'
  },
  {
    name: 'amount',
    value: 'amount'
  }
];

const EditCoupon = () => {
  const navigate = useNavigate();
  const { getCustomerListApi, updateCouponDetails } = couponAPI;

  const [form] = Form.useForm();
  const [currentDate, setCurrentDate] = useState<any>();

  const { _id } = useParams();
  const { data } = useCouponView(_id);
  const queryClient = useQueryClient();
  const [categoryList, setCategoryList] = useState<any>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [today] = useState(new Date()); // Get today's date

  const [customerData, setCustomerData] = useState<any>();
  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });

  useEffect(() => {
    if (data) {
      setIsChecked(data?.totalAmountDiscount);
    }
  }, [data]);

  const callList = () => {
    if (args?.limit) {
      const newLimit = args?.limit + 10;
      setArgs((prevArgs) => ({
        ...prevArgs,
        limit: newLimit
      }));
    }
  };

  const onSubmit = ({
    categoryId,
    couponCode,
    discount,
    discountType,
    minimumAmount,
    usageLimit,
    userId,
    userUsageLimit
  }: addCouponForms) => {
    const requestPayload: addCouponForms = {
      categoryId: categoryId ?? [],
      couponCode,
      discount,
      discountType,
      minimumAmount: minimumAmount ?? '0',
      usageLimit,
      userId: userId ?? [],
      validateDate: currentDate ? new Date(currentDate).toISOString() : data?.validateDate,
      _id: data?._id,
      totalAmountDiscount: isChecked,
      userUsageLimit
    };
    updateCouponDetails(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(couponKey.all);
        navigate(ROUTES.couponManagement);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  useEffect(() => {
    getCustomerListApi(args).then((res: any) => {
      setCustomerData(res);
    });
    getCategoryList().then((data) => {
      setCategoryList(
        data?.map((v: any) => {
          return { ...v, name: replaceAndCapitalize(v?.name) };
        })
      );
    });

    form.setFieldsValue({
      couponCode: data?.couponCode,
      userId: data?.userId,
      categoryId: data?.categoryId,
      discountType: data?.discountType,
      minimumAmount: data?.minimumAmount,
      discount: data?.discount,
      usageLimit: data?.usageLimit,
      validateDate: data?.validateDate && dayjs(data?.validateDate),
      userUsageLimit: data?.userUsageLimit
    });
  }, [data]);
  // Function to disable past dates
  const disabledPastDates = (current: any) => {
    // Disable dates before today (including today)
    return current && current < new Date(today.setHours(0, 0, 0, 0));
  };
  const onChange: DatePickerProps['onChange'] = (_: any, dateStr: any) => {
    dayjs(dateStr).format();
    setCurrentDate(dateStr);
  };
  const onChangeCheck = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({ discount: '100', discountType: 'percentage' });
    } else {
      form.setFieldsValue({ discount: '', discountType: null });
    }
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
          <Col xs={24} lg={24}>
            <RenderCheckBox
              name={'isChecked'}
              checked={isChecked}
              value={isChecked}
              col={{ sm: 24 }}
              onChange={onChangeCheck}
            >
              Apply On Total Amount
            </RenderCheckBox>
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Coupon Code"
              placeholder="Please enter coupon code"
              name="couponCode"
              rules={[
                {
                  required: true,
                  message: 'Please enter coupon code'
                },
                {
                  pattern: /^[^\s]+$/,
                  message: 'Coupon code cannot contain spaces'
                }
              ]}
            />
          </Col>
          {!isChecked && (
            <>
              <Col xs={24} lg={12}>
                <RenderVendorSelectInput
                  showSearch
                  label="Select User"
                  placeholder="Please select user"
                  name={'userId'}
                  optionLabel={customerData?.list}
                  mode={'multiple'}
                  callList={callList}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please select user'
                  //   }
                  // ]}
                />
              </Col>
              <Col xs={24} lg={12}>
                <RenderSelectInput
                  showSearch
                  label="Category"
                  placeholder="Please select category"
                  name={'categoryId'}
                  optionLabel={categoryList}
                  mode={'multiple'}
                  rules={[
                    {
                      required: true,
                      message: 'Please select category'
                    }
                  ]}
                />
              </Col>
            </>
          )}
          <Col xs={24} lg={12}>
            <RenderAddVendorSelectInput
              label="Discount Type"
              placeholder="Please select discount type"
              name="discountType"
              disabled={isChecked}
              optionLabel={discountTypJson}
              rules={[
                {
                  required: true,
                  message: 'Please select discount type'
                }
              ]}
            />
          </Col>
          {!isChecked && (
            <Col xs={24} lg={12}>
              <RenderTextInput
                label="Minimum Amount"
                placeholder="Please enter minimum amount"
                name="minimumAmount"
                rules={[
                  {
                    required: true,
                    message: 'Please enter minimum amount'
                  },
                  {
                    pattern: /^(?:\d*\.\d{1,2}|\d+)$/, // Pattern to match numbers with up to two decimal places
                    message: 'Please enter a valid number'
                  }
                ]}
              />
            </Col>
          )}
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Discount"
              placeholder="Please enter discount"
              name="discount"
              disabled={isChecked}
              rules={[
                {
                  required: true,
                  message: ''
                },
                ({ getFieldValue }: any) => ({
                  validator(_: any, value: any) {
                    const discountType = getFieldValue('discountType');
                    const minimumAmount = parseFloat(getFieldValue('minimumAmount'));
                    if (!value) {
                      return Promise.reject('Please enter discount');
                    }
                    if (!value.match(/^(?:\d*\.\d{1,2}|\d+)$/)) {
                      return Promise.reject('Please enter a valid number');
                    }
                    if (parseFloat(value) > minimumAmount && discountType === 'amount') {
                      return Promise.reject('Discount should not be more than Minimum amount');
                    } else if (discountType === 'percentage' && parseFloat(value) > 100) {
                      return Promise.reject('Discount should not be more than 100%');
                    }
                    return Promise.resolve();
                  }
                })
              ]}
            />
          </Col>

          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Usage Limit"
              placeholder="Please enter usage limit"
              name="usageLimit"
              rules={[
                {
                  required: true,
                  message: 'Please enter usage limit'
                },
                {
                  pattern: /^(?:\d*\.\d{1,2}|\d+)$/, // Pattern to match numbers with up to two decimal places
                  message: 'Please enter a valid number'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Per User Usage Limit"
              placeholder="Please enter per user usage limit"
              name="userUsageLimit"
              rules={[
                {
                  required: true,
                  message: 'Please enter per user usage limit'
                },
                {
                  pattern: /^\d+$/, // Pattern to match only integers
                  message: 'Please enter a valid number'
                }
              ]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Expiration Date"
              name="validateDate"
              rules={[
                {
                  required: true,
                  message: 'Please select expire date'
                }
              ]}
            >
              <DatePicker
                disabledDate={disabledPastDates} // Use disabledDate function to disable past dates
                style={{ width: '100%' }}
                placeholder="Select date"
                picker="date"
                onChange={onChange}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditCoupon;
