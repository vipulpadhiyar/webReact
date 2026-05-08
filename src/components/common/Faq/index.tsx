import { Wrapper } from './style';

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import React from 'react';

import { RenderTextInput } from 'components/common/FormField';

const FaqCommon = () => {
  return (
    <Wrapper className="faq">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24}>
          <h3 className="faq-title">FAQs </h3>
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 16]}>
            <Form.List name="faq">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ name, ...restField }) => (
                    <>
                      <React.Fragment key={name}>
                        <Col xs={24} md={11}>
                          <RenderTextInput
                            {...restField}
                            maxLength={100}
                            label={`Question ${name + 1}`}
                            placeholder="Please Enter Question"
                            name={[name, 'question']}
                            rules={[
                              {
                                required: true,
                                message: 'Please Enter Question'
                              },
                              {
                                whitespace: true,
                                message: 'Question cannot be blank'
                              }
                            ]}
                          />
                        </Col>
                        <Col xs={24} md={11}>
                          <RenderTextInput
                            {...restField}
                            label={`Answer ${name + 1}`}
                            placeholder="Please Enter Answer"
                            name={[name, 'answer']}
                            rules={[
                              {
                                required: true,
                                message: 'Please Enter Answer'
                              },
                              {
                                whitespace: true,
                                message: 'Answer cannot be blank'
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

export default FaqCommon;
