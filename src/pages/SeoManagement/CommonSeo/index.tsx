import { Button, Col, Form, Row, Tabs, message } from 'antd';
import { useEffect, useState } from 'react';

import FaqCommon from '../../../components/common/Faq';
import { RenderTextInput } from 'components/common/FormField';
import TestimonialCommon from 'components/common/Testimonial';
import PageHeader from 'components/layout/pageHeader';

import { seoAPI } from 'services/api/seo';
import { createSeoForm, seoForm } from 'services/api/seo/type';

const CommonSeo = (props: any) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<seoForm>();
  const { getSeoView, updateSeo } = seoAPI;
  const items = [
    {
      key: '1',
      label: 'FAQs',
      children: <FaqCommon />
    },
    {
      key: '2',
      label: 'Testimonials',
      children: <TestimonialCommon form={form} />
    }
  ];
  const onSubmit = ({
    faq,
    h1DataDescription,
    h1DataTitle,
    h2DataDescription,
    metaDataTitle,
    metaDataDescription,
    seoTitle,
    testimonial,
    h2DataTitle,
    metaTitle
  }: seoForm) => {
    const requestPayload: createSeoForm = {
      seoHybridId: formData?._id,
      faq: faq || formData?.faq,
      testimonial: testimonial === undefined ? formData?.testimonial : testimonial || [],
      type: props?.type,
      metadata: {
        h1DataDescription,
        h1DataTitle,
        h2DataDescription,
        h2DataTitle,
        metaDataDescription,
        metaDataTitle,
        seoTitle,
        metaTitle
      }
    };
    updateSeo(requestPayload)
      .then((res) => {
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  useEffect(() => {
    getSeoView(props.type)
      .then((res) => {
        setFormData(res);
        form.setFieldsValue({
          seoTitle: res?.metadata?.seoTitle,
          metaDataTitle: res?.metadata?.metaDataTitle,
          metaDataDescription: res?.metadata?.metaDataDescription,
          h1DataTitle: res?.metadata?.h1DataTitle,
          h1DataDescription: res?.metadata?.h1DataDescription,
          h2DataDescription: res?.metadata?.h2DataDescription,
          h2DataTitle: res?.metadata?.h2DataTitle,
          faq: res?.faq,
          testimonial: res?.testimonial,
          metaTitle: res?.metadata?.metaTitle
        });
      })
      .catch((err) => {
        message.error(err?.message);
      });
  }, []);

  return (
    <div className="shadow-paper">
      <PageHeader pageTitle={props?.name} />
      <Form onFinish={onSubmit} form={form}>
        <div className="d-flex justify-content-end mb-30 m-130">
          <Button type="primary" htmlType="submit" size="large">
            Save
          </Button>
        </div>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} lg={12}>
            <RenderTextInput
              disabled
              label="Seo Title"
              name={'seoTitle'}
              rules={[{ required: true }]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              placeholder={'Please enter meta title'}
              label="Meta Title"
              name={'metaTitle'}
              rules={[{ required: true, message: 'Please enter meta title' }]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Meta Keywords"
              name={'metaDataTitle'}
              placeholder={'Please enter meta keyword'}
              rules={[{ required: true, message: 'Please enter meta keyword' }]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Meta Description"
              name={'metaDataDescription'}
              placeholder={'Please enter meta description'}
              rules={[{ required: true, message: 'Please enter meta description' }]}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Page H1 Title"
              name={'h1DataTitle'}
              rules={[{ required: true, message: 'Please enter H1 title' }]}
              placeholder={'Please enter H1 title'}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Page H1 Description"
              name={'h1DataDescription'}
              rules={[{ required: true, message: 'Please enter H1 description' }]}
              placeholder={'Please enter H1 description'}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Page H2 Title"
              name={'h2DataTitle'}
              rules={[{ required: true, message: 'Please enter H2 title' }]}
              placeholder={'Please enter H2 title'}
            />
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Page H2 Description"
              name={'h2DataDescription'}
              rules={[{ required: true, message: 'Please enter H2 description' }]}
              placeholder={'Please enter H2 description'}
            />
          </Col>
          <Col xs={24}>
            <Tabs defaultActiveKey="1" items={items} indicatorSize={(origin) => origin - 16} />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CommonSeo;
