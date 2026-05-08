import { Wrapper } from '../style';
import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, RadioChangeEvent, Row, Steps, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  RenderAddVendorSelectInput,
  RenderRadio,
  RenderSelectInput,
  RenderTextInput,
  SearchInput
} from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { cityListView } from 'services/api/city/type';
import { vendorAPI } from 'services/api/vendor';
import { otpVerifyReqForm, staticJson } from 'services/api/vendor/type';
import { vendorKeys } from 'services/hooks/queryKeys';
import { useVendorView } from 'services/hooks/vendor';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { getCategoryList, getCityList, getStaticJsonFile, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Vendor Management',
    href: ROUTES.vendorManagement
  },
  {
    title: 'Edit'
  }
];

const EditVendor = () => {
  const { _id } = useParams();
  const { data } = useVendorView(_id);
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const {
    updateVenderDetails,
    checkPhoneNumber,
    sendOtpFromAadhaarNumber,
    aadhaarNumberOtpVerify
  } = vendorAPI;

  const queryClient = useQueryClient();

  const [isRadioSelected, setRadioSelected] = useState<string>('Offline');
  const [staticJson, setStaticJson] = useState<staticJson>();

  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();
  const [imageValidation, setImageValidation] = useState<string>();

  const [imageUrlFront, setImageUrlFront] = useState<string>();
  const [imageUrlPathFront, setImageUrlPathFront] = useState<string | undefined>();
  const [imageValidationFront, setImageValidationFront] = useState<string>();

  const [imageUrlBack, setImageUrlBack] = useState<string>();
  const [imageUrlPathBack, setImageUrlPathBack] = useState<string | undefined>();
  const [imageValidationBack, setImageValidationBack] = useState<string>();

  const [businessImageUrl, setBusinessImageUrl] = useState<string>();
  const [businessImageUrlPath, setBusinessImageUrlPath] = useState<string | undefined>();
  // const [businessImageValidation, setBusinessImageValidation] = useState<string>();
  const [categoryList, setCategoryList] = useState<any>();
  const [subCategoryList, setSubCategoryList] = useState<any>();
  const [secondarySubCategoryList, setSecondarySubCategoryList] = useState<any>();
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [isOtpSent, setOtpSent] = useState<boolean>(false);
  const [otpResponse, setOtpResponse] = useState<any>(true);
  const [serviceCities, setServiceCities] = useState<any>();
  const [serviceAreas, setServiceAreas] = useState<any>();

  const onChange = (e: RadioChangeEvent) => {
    setOtpSent(false);
    setRadioSelected(e.target.value);
  };

  useEffect(() => {
    getStaticJsonFile().then((data: any) => {
      setStaticJson(data);
    });
    form.setFieldsValue({
      kyc: 'Offline'
    });
    getCategoryList().then((result) => {
      setCategoryList(result);
      const areaList = result.find(
        (category: any) => category._id === data?.businessDetails?.primaryBusinessCategory?._id
      );

      form.setFieldsValue({
        primaryBusinessCategory: result?.find(
          (val: any) => val?._id === data?.businessDetails?.primaryBusinessCategory?._id
        )?._id,
        primaryBusinessSubService: data?.businessDetails?.primaryBusinessSubService
          .filter((obj1) => areaList?.service?.some((obj2: any) => obj1._id === obj2._id))
          ?.map((obj: any) => obj._id)
          .sort()
      });
      setSubCategoryList(areaList?.service);
      onselectSecondaryCategoryIdFromInitial(
        data?.businessDetails?.secondaryBusinessCategory,
        result
      );
    });
    getCityList().then((result) => {
      result.sort((a: cityListView, b: cityListView) => {
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
      setServiceCities(result);
      const areaList = result.find(
        (val: any) => val._id === data?.businessDetails?.serviceCity?._id
      );

      form.setFieldsValue({
        serviceCity: result?.find(
          (val: any) => val?._id === data?.businessDetails?.serviceCity?._id
        )?._id,
        serviceArea: data?.businessDetails?.serviceArea
          .filter((obj1) => areaList?.area?.some((obj2: any) => obj1._id === obj2._id))
          ?.map((obj: any) => obj._id)
          .sort()
      });
      setServiceAreas(areaList?.area);
    });
    if (data?.location?.coordinates[1] && data?.location?.coordinates[0]) {
      setLatitude(data?.location?.coordinates[1]);
      setLongitude(data?.location?.coordinates[0]);
    }
    if (data) {
      setRadioSelected(data?.accountDetails?.kyc ?? 'Offline');
    }
    form.setFieldsValue({
      firstName: data?.firstName,
      lastName: data?.lastName,
      phoneNumber: data?.phoneNumber,
      totalExperience: data?.totalExperience,
      pastWorkingExperience: data?.pastWorkingExperience,
      isAllTimeAvailable: data?.isAllTimeAvailable ? 'Yes' : 'No',
      interestedPaidLead: data?.interestedPaidLead ? 'Yes' : 'No',
      spokenLanguages: data?.spokenLanguages,
      state: data?.address?.state,
      city: data?.address?.city,
      pinCode: data?.address?.pinCode,
      addressLine1: data?.address?.addressLine1,
      addressLine2: data?.address?.addressLine2,
      address: `${data?.address?.addressLine1} ${data?.address?.city} ${data?.address?.state}`,
      ownerName: data?.businessDetails?.ownerName ?? '',
      businessName: data?.businessDetails?.businessName ?? '',
      // primaryBusinessCategory: data?.businessDetails?.primaryBusinessCategory?._id,
      // primaryBusinessSubService: data?.businessDetails?.primaryBusinessSubService
      //   .map((obj: any) => obj._id)
      //   .sort(),
      secondaryBusinessCategory: data?.businessDetails?.secondaryBusinessCategory
        .map((obj: any) => obj._id)
        .sort(),
      secondaryBusinessSubService: data?.businessDetails?.secondaryBusinessSubService
        .map((obj: any) => obj._id)
        .sort(),
      businessType: data?.businessDetails?.businessType,
      isShop: data?.businessDetails?.isShop ? 'Yes' : 'No',
      bankName: data?.accountDetails?.bankName,
      accountHolderName: data?.accountDetails?.accountHolderName,
      accountNumber: data?.accountDetails?.accountNumber,
      IFSCCode: data?.accountDetails?.IFSCCode,
      panNumber: data?.accountDetails?.panNumber,
      kyc: data?.accountDetails?.kyc,
      aadhaarNumber: data?.accountDetails?.aadhaarNumber
    });
  }, [form, data]);

  const onselectCategoryId = (id: string) => {
    const areaList = categoryList.find((category: any) => category._id === id);
    setSubCategoryList(areaList?.service);
    form.setFieldsValue({ primaryBusinessSubService: [] });
  };
  const onSelectCity = (id: string) => {
    const areaList = serviceCities?.find((val: any) => val._id === id);
    setServiceAreas(areaList?.area);
    form.setFieldsValue({ serviceArea: [] });
  };
  function mergeServices(dataArray: any, mainData: any) {
    const services =
      dataArray &&
      dataArray.map((id: string) => {
        const found = mainData && mainData.find((item: any) => item._id === id);
        return found ? found.service : [];
      });

    return services.flat();
  }
  const onselectSecondaryCategoryIdFromInitial = (id: any, categoryList: any) => {
    id = id && id.map((obj: any) => obj._id).sort();
    const mergedServices = mergeServices(id, categoryList);
    setSecondarySubCategoryList(mergedServices);
  };
  const onselectSecondaryCategoryId = (id: string[]) => {
    // const areaList = categoryList.find((category: any) => category._id === id);
    const mergedServices = mergeServices(id, categoryList);
    setSecondarySubCategoryList(mergedServices);
    const firstArray = form.getFieldValue('secondaryBusinessSubService');
    const filteredArray = firstArray.filter((id: string) =>
      mergedServices.some((obj: any) => obj._id === id)
    );
    form.setFieldsValue({ secondaryBusinessSubService: filteredArray });
  };

  const handlePlaceSelected = (place: any) => {
    const selectedCity = place?.address_components.find((component: any) =>
      component.types.includes('locality')
    )?.long_name;
    const selectedState = place?.address_components.find((component: any) =>
      component.types.includes('administrative_area_level_1')
    )?.long_name;
    const selectedPinCode = place?.address_components.find((component: any) =>
      component.types.includes('postal_code')
    )?.long_name;
    setLatitude(place?.geometry?.location?.lat().toString());
    setLongitude(place?.geometry?.location?.lng().toString());
    form.setFieldsValue({
      city: selectedCity,
      state: selectedState,
      addressLine1: place?.formatted_address,
      pinCode: selectedPinCode ? selectedPinCode : ''
    });
  };

  const postUpdateVendorApi = (requestPayload: any) => {
    updateVenderDetails(requestPayload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(vendorKeys.all);
        navigate(ROUTES.vendorManagement);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const onSubmit = ({
    firstName,
    lastName,
    phoneNumber,
    totalExperience,
    pastWorkingExperience,
    spokenLanguages,
    state,
    city,
    pinCode,
    addressLine1,
    addressLine2,
    ownerName,
    businessName,
    primaryBusinessCategory,
    primaryBusinessSubService,
    secondaryBusinessCategory,
    secondaryBusinessSubService,
    businessType,
    isShop,
    bankName,
    accountHolderName,
    accountNumber,
    IFSCCode,
    kyc,
    panNumber,
    aadhaarNumber,
    otp,
    serviceCity,
    serviceArea
  }: any) => {
    const requestPayload: any = {
      firstName: firstName?.trim() ?? form.getFieldValue('firstName')?.trim(),
      lastName: lastName?.trim() ?? form.getFieldValue('lastName')?.trim(),
      phoneNumber: phoneNumber || form.getFieldValue('phoneNumber'),
      totalExperience: totalExperience || form.getFieldValue('totalExperience'),
      pastWorkingExperience: pastWorkingExperience || form.getFieldValue('pastWorkingExperience'),
      isAllTimeAvailable: form.getFieldValue('isAllTimeAvailable') === 'Yes' ? true : false,
      interestedPaidLead: form.getFieldValue('interestedPaidLead') === 'Yes' ? true : false,
      spokenLanguages: spokenLanguages || form.getFieldValue('spokenLanguages'),
      countryCode: '+91',
      address: {
        addressLine1: addressLine1 || form.getFieldValue('addressLine1'),
        addressLine2: addressLine2 || form.getFieldValue('addressLine2'),
        city: city || form.getFieldValue('city'),
        pinCode: pinCode || form.getFieldValue('pinCode'),
        state: state || form.getFieldValue('state')
      },
      profilePicture: imageUrlPath || data?.profilePicture || '',
      businessDetails: {
        businessImage: businessImageUrlPath || data?.businessDetails?.businessImage || '',
        businessName: businessName || form.getFieldValue('businessName') || '',
        businessType: businessType || form.getFieldValue('businessType'),
        isShop: isShop || form.getFieldValue('isShop') === 'Yes' ? true : false,
        ownerName: ownerName || form.getFieldValue('ownerName') || '',
        primaryBusinessCategory:
          primaryBusinessCategory || form.getFieldValue('primaryBusinessCategory'),
        primaryBusinessSubService:
          primaryBusinessSubService || form.getFieldValue('primaryBusinessSubService'),
        secondaryBusinessCategory:
          secondaryBusinessCategory || form.getFieldValue('secondaryBusinessCategory') || [],
        secondaryBusinessSubService:
          secondaryBusinessSubService || form.getFieldValue('secondaryBusinessSubService') || [],
        serviceCity: serviceCity || form.getFieldValue('serviceCity'),
        serviceArea: serviceArea || form.getFieldValue('serviceArea')
      },
      accountDetails: {
        IFSCCode: IFSCCode || form.getFieldValue('IFSCCode'),
        accountHolderName: accountHolderName || form.getFieldValue('accountHolderName'),
        accountNumber: accountNumber || form.getFieldValue('accountNumber'),
        aadhaarBackImage: imageUrlPathBack || data?.accountDetails?.aadhaarBackImage || '',
        aadhaarFrontImage: imageUrlPathFront || data?.accountDetails?.aadhaarFrontImage || '',
        aadhaarNumber: aadhaarNumber || form.getFieldValue('aadhaarNumber'),
        bankName: bankName || form.getFieldValue('bankName'),
        kyc: kyc || form.getFieldValue('kyc'),
        panNumber: panNumber || form.getFieldValue('panNumber') || undefined
      },
      location: {
        lat: latitude.toString(),
        lng: longitude.toString()
      },
      isOnline: false,
      _id: data?._id,
      signUpStep: 3
    };
    if (current === 0) {
      if (phoneNumber != data?.phoneNumber) {
        checkPhoneNumber({ phoneNumber, countryCode: '+91' })
          .then(() => {
            setCurrent(current + 1);
          })
          .catch((_err) => {
            message.error(_err?.message);
          });
      } else setCurrent(current + 1);
    } else if (current != 2) {
      setCurrent(current + 1);
    } else {
      if (form.getFieldValue('kyc') != data?.accountDetails?.kyc && kyc === 'Online') {
        if (!isOtpSent) {
          sendOtpFromAadhaarNumber({ aadhaarNumber })
            .then((res) => {
              setOtpSent(true);
              setOtpResponse(res?.data);
              message.success(res?.message);
            })
            .catch((_err) => {
              message.error(_err?.message);
            });
        } else {
          const reqPayload: otpVerifyReqForm = {
            otp: otp,
            accessToken: otpResponse?.accessToken,
            refId: otpResponse?.refId
          };
          aadhaarNumberOtpVerify(reqPayload)
            .then((res) => {
              message.success(res?.message);
              postUpdateVendorApi(requestPayload);
            })
            .catch((_err) => {
              message.error(_err?.message);
            });
        }
      } else {
        postUpdateVendorApi(requestPayload);
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: '',
      content: 'First-content'
    },
    {
      title: '',
      content: 'Second-content'
    },
    {
      title: '',
      content: 'Third-content'
    }
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  // const validateRatedYou = (_: any, value: any) => {
  //   const numericValue = parseInt(value, 10);
  //   if (numericValue > 10000) {
  //     return Promise.reject('Value cannot be more than 10,000');
  //   }
  //   return Promise.resolve();
  // };

  return (
    <Wrapper>
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <Form form={form} onFinish={onSubmit}>
          {/* <div className="d-flex justify-content-end mb-30 m-130">
            <Button type="primary" size="large" htmlType="submit">
              Save
            </Button>
          </div> */}

          <Steps current={current} items={items} className="stepContainer" direction="horizontal" />
          <div className="mt-30">
            {steps[current].content === 'First-content' && (
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24}>
                  <label>
                    <span style={commonStyles.colorCode}>*</span> Profile Image
                  </label>{' '}
                  <UploadImage
                    setImageUrl={setImageUrl}
                    imageUrl={
                      imageUrl ?? data?.profilePicture
                        ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.vendor}/${data?.profilePicture}`
                        : toAbsoluteUrl('/asset/dummy.png')
                    }
                    setImageUrlPath={setImageUrlPath}
                    moduleName={uploadImageEnum.vendor}
                    imageValidation={imageValidation}
                    setImageValidation={setImageValidation}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="First Name"
                    placeholder="Please enter first Name"
                    name={'firstName'}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your first name'
                      },
                      {
                        pattern: /^(?!\s*$)[A-Za-z\s]+$/,
                        message:
                          'First name should only contain alphabets and cannot be only spaces'
                      },
                      {
                        max: 50,
                        message: 'First name cannot exceed 50 characters'
                      },
                      {
                        min: 2,
                        message: 'First name should be at least 2 char long '
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Last Name"
                    placeholder="Please enter last name "
                    name={'lastName'}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your last name'
                      },
                      {
                        pattern: /^(?!\s*$)[A-Za-z\s]+$/,
                        message: 'Last name should only contain alphabets and cannot be only spaces'
                      },
                      {
                        max: 50,
                        message: 'Last name cannot exceed 50 characters'
                      },
                      {
                        min: 2,
                        message: 'Last name should be at least 2 char long '
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Phone Number"
                    placeholder="Please enter phone number "
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your phone number'
                      },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: 'Phone number should be 10 digits long and contain only numbers'
                      }
                    ]}
                  />
                </Col>
                {/* <Col xs={24} lg={12}>
                  <RenderTextInput label="Email" placeholder="Please enter email " />
                </Col> */}
                <Col xs={24} lg={12}>
                  <RenderAddVendorSelectInput
                    label="Total Experience"
                    placeholder="Please enter total experience "
                    name={'totalExperience'}
                    optionLabel={staticJson?.totalExperience}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter total experience'
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderAddVendorSelectInput
                    label="Past Working Experience"
                    placeholder="Please select past working experience "
                    name="pastWorkingExperience"
                    rules={[
                      {
                        required: true,
                        message: 'Please select past working experience '
                      }
                    ]}
                    optionLabel={staticJson?.pastWorkingExperience}
                  />
                </Col>
                {/* <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Total Rating"
                    placeholder="Please enter total rating"
                    name={'totalRating'}
                    rules={[
                      {
                        pattern: /^[0-9]+$/, // Only allow numbers
                        message: 'Please enter a valid number'
                      },
                      () => ({
                        validator(_: any, value: any) {
                          if (value && parseInt(value, 10) > 5) {
                            return Promise.reject(new Error('Rating should not be more than 5'));
                          }
                          return Promise.resolve();
                        }
                      })
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="How many people rated you?"
                    placeholder="Please enter how many people rated you"
                    name={'ratedYou'}
                    rules={[
                      {
                        pattern: /^[0-9]+$/, // Only allow numbers
                        message: 'Please enter a valid number'
                      },
                      {
                        validator: validateRatedYou // Using the custom validator function
                      }
                    ]}
                  />
                </Col>{' '}
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="How many people review you?"
                    placeholder="Please enter how many people review you"
                    name={'reviewYou'}
                    rules={[
                      {
                        pattern: /^[0-9]+$/, // Only allow numbers
                        message: 'Please enter a valid number'
                      },
                      {
                        validator: validateRatedYou // Using the custom validator function
                      }
                    ]}
                  />
                </Col> */}
                <Col xs={24} lg={12}>
                  <RenderAddVendorSelectInput
                    label="Availability"
                    placeholder="Please select availability"
                    name="isAllTimeAvailable"
                    rules={[
                      {
                        required: true,
                        message: 'Please select availability'
                      }
                    ]}
                    optionLabel={staticJson?.availability}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderAddVendorSelectInput
                    label="Interested in paid leads"
                    placeholder="Please select Interested in paid leads"
                    name="interestedPaidLead"
                    rules={[
                      {
                        required: true,
                        message: 'Please select Interested in paid leads'
                      }
                    ]}
                    optionLabel={staticJson?.availability}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderAddVendorSelectInput
                    label="Spoken language"
                    placeholder="Please select Spoken language"
                    name="spokenLanguages"
                    optionLabel={staticJson?.spokenLanguage}
                    mode={'multiple'}
                    rules={[
                      {
                        required: true,
                        message: 'Please select Spoken language'
                      }
                    ]}
                  />
                </Col>
                <SearchInput
                  col={{ xs: 24, lg: 12 }}
                  label="Address"
                  name="address"
                  placeholder="Search here...."
                  onPlaceSelected={handlePlaceSelected}
                  options={{
                    componentRestrictions: { country: 'in' }
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Address'
                    },
                    {
                      whitespace: true,
                      message: 'Address cannot be blank'
                    }
                  ]}
                />
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="State"
                    placeholder="Please enter State"
                    name={'state'}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter state'
                      },
                      {
                        whitespace: true,
                        message: 'State cannot be blank'
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="City"
                    placeholder="Please enter City"
                    name={'city'}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter city'
                      },
                      {
                        whitespace: true,
                        message: 'City cannot be blank'
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Pin code"
                    placeholder="Please enter Pin code"
                    name={'pinCode'}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter Pin code'
                      },
                      {
                        pattern: /^[1-9][0-9]{5}$/,
                        message: 'Please enter a valid pin code'
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Address Line 1"
                    placeholder="Please enter address line 1"
                    name={'addressLine1'}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter address line 1'
                      },
                      {
                        whitespace: true,
                        message: 'Address line 1 cannot be blank'
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Address Line 2"
                    placeholder="Please enter address line 2"
                    name={'addressLine2'}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter address line 2'
                      },
                      {
                        whitespace: true,
                        message: 'Address line 2 cannot be blank'
                      }
                    ]}
                  />
                </Col>
              </Row>
            )}

            {steps[current].content === 'Second-content' && (
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24}>
                  <label>Business Image</label>
                  <UploadImage
                    setImageUrl={setBusinessImageUrl}
                    imageUrl={
                      (businessImageUrl ?? data?.businessDetails?.businessImage) &&
                      `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.vendor}/${data?.businessDetails?.businessImage}`
                    }
                    setImageUrlPath={setBusinessImageUrlPath}
                    moduleName={uploadImageEnum.vendor}
                    // imageValidation={businessImageValidation}
                    // setImageValidation={setBusinessImageValidation}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Owner name"
                    placeholder="Please enter your owner name"
                    name={'ownerName'}
                    rules={[
                      {
                        max: 50,
                        message: 'Owner name cannot exceed 50 characters'
                      },
                      {
                        min: 2,
                        message: 'Owner name should be at least 2 char long '
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Business name"
                    placeholder="Please enter your business name"
                    name={'businessName'}
                    rules={[
                      {
                        max: 50,
                        message: 'Business name cannot exceed 50 characters'
                      },
                      {
                        min: 2,
                        message: 'Business name should be at least 2 char long '
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderSelectInput
                    label="Primary business category"
                    placeholder="Please select primary business category "
                    name="primaryBusinessCategory"
                    rules={[
                      {
                        required: true,
                        message: 'Please select primary business category '
                      }
                    ]}
                    optionLabel={categoryList}
                    onChange={onselectCategoryId}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderSelectInput
                    label="Primary business sub category"
                    placeholder="Please select primary business sub category"
                    name={'primaryBusinessSubService'}
                    optionLabel={subCategoryList}
                    mode={'multiple'}
                    rules={[
                      {
                        required: true,
                        message: 'Please select primary business sub category'
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderSelectInput
                    label="Secondary business category"
                    placeholder="Please select secondary business category"
                    name="secondaryBusinessCategory"
                    mode={'multiple'}
                    optionLabel={categoryList}
                    onChange={onselectSecondaryCategoryId}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please select Secondary business category'
                    //   }
                    // ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderSelectInput
                    label="Secondary business sub category"
                    placeholder="Please select secondary business sub category"
                    name="secondaryBusinessSubService"
                    mode={'multiple'}
                    optionLabel={secondarySubCategoryList}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please select Secondary business sub category'
                    //   }
                    // ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderSelectInput
                    label="Service City"
                    placeholder="Please select service city"
                    name="serviceCity"
                    rules={[
                      {
                        required: true,
                        message: 'Please select service city'
                      }
                    ]}
                    optionLabel={serviceCities}
                    onChange={onSelectCity}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderSelectInput
                    label="Service Area"
                    placeholder="Please select service areas"
                    name="serviceArea"
                    mode={'multiple'}
                    optionLabel={serviceAreas}
                    rules={[
                      {
                        required: true,
                        message: 'Please select service areas'
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderAddVendorSelectInput
                    label="Business type"
                    placeholder="Please select secondary type"
                    name="businessType"
                    rules={[
                      {
                        required: true,
                        message: 'Please select secondary type'
                      }
                    ]}
                    optionLabel={staticJson?.businessType}
                  />
                </Col>
                <Col xs={24} lg={24}>
                  <label>Do you have any shop? </label>
                  <RenderRadio name="isShop" options={['Yes', 'No']} />
                </Col>
              </Row>
            )}
            {steps[current].content === 'Third-content' && (
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} lg={12}>
                  <RenderAddVendorSelectInput
                    label="Bank Name"
                    placeholder="Please select bank name"
                    name="bankName"
                    optionLabel={staticJson?.bankList}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Account Holder Name"
                    placeholder="Please enter account holder name "
                    name={'accountHolderName'}
                    rules={[
                      {
                        pattern: /^[a-zA-Z '-]+$/,
                        message:
                          'Please enter a valid account holder name with alphabetic characters only'
                      },
                      { min: 2, message: 'Account holder name must be at least 2 characters' },
                      { max: 50, message: 'Account holder name cannot exceed 50 characters' }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Account No"
                    placeholder="Please enter account no "
                    name={'accountNumber'}
                    rules={[
                      {
                        pattern: /^[0-9]+$/,
                        message: 'Please enter a valid account number with numeric characters only'
                      },
                      {
                        validator: (_: any, value: any) => {
                          if (value && value.length < 10) {
                            return Promise.reject('Account number must be 10 digits long');
                          }
                          return Promise.resolve();
                        }
                      }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="IFSC Code"
                    placeholder="Please enter IFSC code"
                    name={'IFSCCode'}
                    rules={[
                      { pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Please enter valid IFSC code' }
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="PAN Card Number"
                    placeholder="Please enter PAN card number"
                    name={'panNumber'}
                    maxLength={10}
                    rules={[
                      {
                        pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                        message: 'Please enter a valid PAN card number'
                      }
                    ]}
                  />
                </Col>

                <Col xs={24} lg={24}>
                  <label>KYC</label>
                  <RenderRadio
                    name="kyc"
                    options={['Offline', 'Online']}
                    onChange={onChange}
                    defaultValue={'Offline'}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <RenderTextInput
                    label="Adhar Number"
                    placeholder="Please enter adhar number "
                    name={'aadhaarNumber'}
                    onChange={() => setOtpSent(false)}
                    rules={[
                      { required: true, message: 'Please enter Aadhar number' },
                      {
                        len: 12,
                        message: 'Aadhar number must be 12 digits long'
                      }
                    ]}
                  />
                </Col>
                {form.getFieldValue('kyc') === 'Online' && isRadioSelected && isOtpSent && (
                  <Col xs={24} lg={12}>
                    <RenderTextInput
                      label="Enter OTP"
                      placeholder="Please enter OTP "
                      name={'otp'}
                      rules={[
                        { required: true, message: 'Please enter Aadhar number' },
                        {
                          len: 6,
                          message: 'OTP length should be 6 digits long'
                        }
                      ]}
                    />
                  </Col>
                )}
                <Col xs={24} lg={12}></Col>

                {isRadioSelected === 'Offline' && (
                  <>
                    {' '}
                    <Col xs={24} lg={12}>
                      <label>
                        <span style={commonStyles.colorCode}>*</span>Upload Adhar Front Image
                      </label>

                      <UploadImage
                        setImageUrl={setImageUrlFront}
                        imageUrl={
                          imageUrlFront ?? data?.accountDetails?.aadhaarFrontImage
                            ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.vendor}/${data?.accountDetails?.aadhaarFrontImage}`
                            : ''
                        }
                        setImageUrlPath={setImageUrlPathFront}
                        moduleName={uploadImageEnum.vendor}
                        imageValidation={imageValidationFront}
                        setImageValidation={setImageValidationFront}
                      />
                    </Col>
                    <Col xs={24} lg={12}>
                      <label>
                        <span style={commonStyles.colorCode}>*</span>Upload Adhar Back Image
                      </label>
                      <UploadImage
                        setImageUrl={setImageUrlBack}
                        imageUrl={
                          imageUrlBack ?? data?.accountDetails?.aadhaarBackImage
                            ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.vendor}/${data?.accountDetails?.aadhaarBackImage}`
                            : ''
                        }
                        setImageUrlPath={setImageUrlPathBack}
                        moduleName={uploadImageEnum.vendor}
                        imageValidation={imageValidationBack}
                        setImageValidation={setImageValidationBack}
                      />
                    </Col>
                  </>
                )}
              </Row>
            )}
          </div>
          <div className="d-flex mt-30 justify-content-end">
            {current > 0 && (
              <Button className="mr-20" onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            )}
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};

export default EditVendor;
