import { Wrapper } from './style';

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import React, { useState } from 'react';

import { RenderTextInput } from 'components/common/FormField';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';

import UploadImageSeoFileList from '../UploadImageSeoFileList';

const TestimonialCommon = (props: any) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrlPath, setImageUrlPath] = useState<string | undefined>();

  return (
    <Wrapper className="faq">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24}>
          <h3 className="faq-title">Testimonial</h3>
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 16]}>
            <Form.List name="testimonial">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ name, ...restField }) => {
                    const res = props.form.getFieldValue('testimonial');
                    return (
                      <>
                        <React.Fragment key={name}>
                          <Col xs={24} md={11}>
                            <Form.Item
                              label="Image"
                              name={[name, 'image']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please upload an image'
                                }
                              ]}
                            >
                              <UploadImageSeoFileList
                                form={props.form}
                                fileListName={'testimonial'}
                                keyIndex={name}
                                imageUrl={
                                  res[restField?.key]?.image
                                    ? `${VITE_REACT_APP_IMAGE_URL}${
                                        uploadImageEnum.jsonImage
                                      }/${res[restField?.key]?.image}`
                                    : ''
                                }
                                setImageUrl={setImageUrl}
                                setImageUrlPath={setImageUrlPath}
                                moduleName={uploadImageEnum.jsonImage}
                                imageUrlPath={imageUrl ?? imageUrlPath}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={11}>
                            <RenderTextInput
                              {...restField}
                              label={`name ${name + 1}`}
                              placeholder="Please Enter Name"
                              name={[name, 'name']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please Enter Name'
                                }
                              ]}
                            />
                          </Col>
                          <Col xs={24} md={11}>
                            <RenderTextInput
                              {...restField}
                              label={`designation ${name + 1}`}
                              placeholder="Please Enter Designation"
                              name={[name, 'designation']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please Enter Designation'
                                }
                              ]}
                            />
                          </Col>
                          <Col xs={24} md={11}>
                            <RenderTextInput
                              {...restField}
                              label={`about ${name + 1}`}
                              placeholder="Please Enter About"
                              name={[name, 'about']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please Enter About'
                                }
                              ]}
                            />
                          </Col>
                        </React.Fragment>
                        <Col xs={24} md={2}>
                          <div className="faqBtn">
                            <Button type="link" className="minusBtn" onClick={() => remove(name)}>
                              <MinusCircleOutlined />
                            </Button>
                          </div>
                        </Col>
                      </>
                    );
                  })}
                  <Col md={24}>
                    <div className="faqBtn">
                      <Button type="primary" className="plusBtn" onClick={() => add()}>
                        Add
                        <PlusCircleOutlined />
                      </Button>
                    </div>
                  </Col>
                </>
              )}
            </Form.List>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};
export default TestimonialCommon;
