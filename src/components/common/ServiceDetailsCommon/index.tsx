import { Wrapper } from './style';

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import React from 'react';

import { RenderCkEditor } from 'components/common/FormField';

const ServiceDetailsCommon = (props: any) => {
  const { title, fieldsData, setFieldsData } = props;

  const handleEditorChange = (index: number, newContent: string) => {
    const newFieldsData = [...fieldsData];
    newFieldsData[index].title = newContent;
    setFieldsData(newFieldsData);
  };

  const handleAdd = () => {
    setFieldsData([...fieldsData, { title: '' }]);
  };

  const handleRemove = (index: number) => {
    const newFieldsData = fieldsData.filter((_: any, i: any) => i !== index);
    setFieldsData(newFieldsData);
  };

  return (
    <Wrapper className="faq">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24}>
          <h3 className="faq-title">{title}</h3>
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 16]}>
            {fieldsData?.map((field: any, index: any) => (
              <React.Fragment key={index}>
                <Col xs={24} lg={12}>
                  <Form.Item initialValue={field.title}>
                    {/* <RenderCkEditor
                      data={field.title}
                      onChange={(newContent: any) =>
                        handleEditorChange(index, newContent.editor.getData())
                      }
                    /> */}
                    <RenderCkEditor
                      value={field.title}
                      onChange={(newContent: any) => handleEditorChange(index, newContent)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={2}>
                  <div className="faqBtn">
                    <Button type="link" className="minusBtn" onClick={() => handleRemove(index)}>
                      <MinusCircleOutlined />
                    </Button>
                  </div>
                </Col>
              </React.Fragment>
            ))}
            <Col md={24}>
              <div className="faqBtn">
                <Button type="primary" className="plusBtn" onClick={handleAdd}>
                  Add
                  <PlusCircleOutlined />
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ServiceDetailsCommon;
