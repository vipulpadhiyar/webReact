import { commonStyles } from 'components/common/UploadImage/styles';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RenderCkEditor, RenderSelectInput, RenderTextInput } from 'components/common/FormField';
import UploadImage from 'components/common/UploadImage';
import ContentHeader from 'components/layout/contentHeader';

import { cityListView } from 'services/api/city/type';
import { cityAreaAPI } from 'services/api/cityArea';
import { cityAreaRequestParma } from 'services/api/cityArea/type';
import { useCityAreaView } from 'services/hooks/cityArea';
import { cityAreaKeys } from 'services/hooks/queryKeys';

import { VITE_REACT_APP_IMAGE_URL, fieldLength, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import {
    aboutCategoryValidator,
    generateLengthValidationRules,
    getCityList,
    getLatLongFromCityName,
    replaceAndCapitalize,
    toAbsoluteUrl,
} from 'utils/functions';
import axios from 'axios';

const pathNames: any = [
    {
        title: 'City Area Management',
        href: ROUTES.cityAreaManagement,
    },
    {
        title: 'Edit',
    },
];

const EditCityArea = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { _id } = useParams();
    const [form] = Form.useForm();
    const { updateCityArea } = cityAreaAPI;
    const { data } = useCityAreaView(_id);
    const [imageUrl, setImageUrl] = useState<string>();
    const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();
    const [cityList, setCityList] = useState<any>();

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
            setCityList(
                data?.map((v: any) => {
                    return { ...v, name: replaceAndCapitalize(v?.name) };
                }),
            );
        });
    }, []);

    const loadUsers = async () => {
        const response = await axios.get('/users');
        return response.data;
    };

    console.log('loadUsers', loadUsers);

    useEffect(() => {
        const formattedName = data?.cityAreaName ? replaceAndCapitalize(data?.cityAreaName) : '';
        form.setFieldsValue({
            cityId: data?.cityId,
            name: formattedName,
            aboutArea: data?.cityAreaDesc,
            faq: data?.faq,
        });
    }, [data]);

    const onSubmit = async ({ cityId, name, aboutArea }: cityAreaRequestParma) => {
        const cityName = cityList?.find((val: any) => val?._id === cityId);
        const areaLatLong = await getLatLongFromCityName(cityName?.name, name);
        const requestPayload: cityAreaRequestParma = {
            aboutArea,
            cityId,
            name,
            // faq: faq,
            image: imageUrlPath || data?.image || '',
            _id: data?._id,
            lat: areaLatLong?.lat ?? 0,
            lng: areaLatLong?.lng ?? 0,
            postalCode: areaLatLong?.postalCode ?? '',
        };
        updateCityArea(requestPayload)
            .then((res) => {
                message.success(res?.message);
                queryClient.invalidateQueries(cityAreaKeys.all);
                navigate(ROUTES.cityAreaManagement);
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
                    <Button type="primary" size="large" htmlType="submit">
                        Save
                    </Button>
                </div>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24}>
                        <label>
                            <span style={commonStyles.colorCode}>*</span> City Area Image
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
                        <RenderSelectInput
                            showSearch
                            label="City Name"
                            placeholder="Please select city Name"
                            name="cityId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select city Name',
                                },
                            ]}
                            optionLabel={cityList}
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
                                fieldLength.maximumName,
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
                                            'Please enter about area',
                                        ),
                                    required: true,
                                    message: 'Please enter about area',
                                },
                            ]}
                        >
                            {/* <ReactQuill theme="snow" onChange={(e) => form.setFieldValue('aboutCategory', e)} /> */}
                            {/* <RenderCkEditor
                data={Form.useWatch('aboutArea', form)}
                onChange={(newContent: any) => {
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
              placeholder="Please enter about area"
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

export default EditCityArea;
