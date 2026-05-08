import { Wrapper } from './style';

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import React from 'react';

import { RenderTextInput } from 'components/common/FormField';

const HowItWorksCommon = () => {
  return (
    <Wrapper className="faq">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24}>
          <h3 className="faq-title">How it works</h3>
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 16]}>
            <Form.List name="howItWork">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ name, ...restField }) => (
                    <>
                      <React.Fragment key={name}>
                        <Col xs={24} md={11}>
                          <RenderTextInput
                            {...restField}
                            label={`Title ${name + 1}`}
                            placeholder="Please Enter Title"
                            maxLength={100}
                            name={[name, 'title']}
                            rules={[
                              {
                                required: true,
                                message: 'Please Enter Title'
                              },
                              {
                                whitespace: true,
                                message: 'Title cannot be blank'
                              }
                            ]}
                          />
                        </Col>
                        <Col xs={24} md={11}>
                          <RenderTextInput
                            {...restField}
                            label={`Description ${name + 1}`}
                            placeholder="Please Enter Description"
                            name={[name, 'description']}
                            rules={[
                              {
                                required: true,
                                message: 'Please Enter Description'
                              },
                              {
                                whitespace: true,
                                message: 'Description cannot be blank'
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
                  ))}

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

export default HowItWorksCommon;
