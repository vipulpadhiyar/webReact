import { Wrapper } from './style';

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import React from 'react';

import { RenderSelectInput } from 'components/common/FormField';

const SecondaryBusiness = () => {
  return (
    <Wrapper className="faq">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24}>
          <Row gutter={[16, 16]}>
            <Form.List name="secondaryCategory">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ name, ...restField }) => (
                    <>
                      <React.Fragment key={name}>
                        <Col xs={24} md={11}>
                          <RenderSelectInput
                            {...restField}
                            label="Secondary business sub category"
                            placeholder="Please select Secondary business sub category"
                            name={[name, 'question']}
                            rules={[
                              {
                                message: 'Please select Secondary business sub category'
                              }
                            ]}
                            optionLabel={[]}
                          />
                        </Col>
                        <Col xs={24} md={11}>
                          <RenderSelectInput
                            {...restField}
                            label="Secondary type"
                            placeholder="Please select Secondary type"
                            name={[name, 'answer']}
                            rules={[
                              {
                                message: 'Please select Secondary type'
                              }
                            ]}
                            optionLabel={[]}
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

export default SecondaryBusiness;
