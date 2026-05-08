import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { faqList } from 'services/api/category/type';
import { useServiceView } from 'services/hooks/service';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Service Management',
    href: ROUTES.serviceManagement
  },
  {
    title: 'View'
  }
];

const ViewService = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useServiceView(_id);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.serviceManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Image</div>
          <div className="right">
            <picture>
              <img
                src={
                  data?.image && data?.image !== ''
                    ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.service}/${data?.image}`
                    : toAbsoluteUrl('/asset/dummy.png')
                }
                alt="dummy"
              />
            </picture>
          </div>
        </div>
        <div className="viewWrap">
          <div className="left">Service Name</div>
          <div className="right">{data && replaceAndCapitalize(data?.name)}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Category Name</div>
          <div className="right">{data && replaceAndCapitalize(data?.categoryName)}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Sub Category Name</div>
          <div className="right">{data && replaceAndCapitalize(data?.subCategoryName)}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Is has sub-service?</div>
          <div className="right">{data?.isHasSubService ? 'Yes' : 'No'}</div>
        </div>
        {data?.aboutService && (
          <div className="viewWrap">
            <div className="left">About Service</div>
            <div className="right" dangerouslySetInnerHTML={{ __html: data?.aboutService }} />
          </div>
        )}
        {!data?.isHasSubService && (
          <>
            <div className="viewWrap">
              <div className="left">Service Price</div>
              <div className="right">{data?.price}</div>
            </div>
            <div className="viewWrap">
              <div className="left">Service Commission</div>
              <div className="right">{`${data?.commission}%`}</div>
            </div>
            <div className="viewWrap">
              <div className="left">GST</div>
              <div className="right">{`${data?.gst}%`}</div>
            </div>
            <div className="viewWrap">
              <div className="left">Rating</div>
              <div className="right">{data?.rating}</div>
            </div>
            <div className="viewWrap">
              <div className="left">Total number of rating</div>
              <div className="right">{data?.totalNumberOfRating}</div>
            </div>
          </>
        )}
        {data && data?.serviceDetails?.length > 0 && <h3 className="faq-title">Service Details</h3>}
        {data?.serviceDetails &&
          data?.serviceDetails?.length > 0 &&
          data?.serviceDetails?.map((item: any, i: any) => {
            if (item?.title) {
              return (
                <div className="viewWrap">
                  <div className="left">Title {i + 1}</div>
                  <div className="right">{item?.title}</div>
                </div>
              );
            }
          })}
        {data && data?.howItWork?.length > 0 && <h3 className="faq-title">How it work</h3>}
        {data?.howItWork &&
          data?.howItWork?.length > 0 &&
          data?.howItWork?.map((item: any, i: any) => {
            if (item?.title || item?.description) {
              return (
                <>
                  <div className="viewWrap">
                    <div className="left">Title {i + 1}</div>
                    <div className="right">{item?.title}</div>
                  </div>
                  <div className="viewWrap">
                    <div className="left">Description {i + 1}</div>
                    <div className="right">{item?.description}</div>
                  </div>
                </>
              );
            }
          })}
        {data && data?.faq?.length > 0 && <h3 className="faq-title">Faq</h3>}
        {data?.faq &&
          data?.faq?.length > 0 &&
          data?.faq?.map((item: faqList, i: any) => {
            if (item?.answer || item?.question) {
              return (
                <>
                  <div className="viewWrap">
                    <div className="left">Question {i + 1}</div>
                    <div className="right">{item?.question}</div>
                  </div>
                  <div className="viewWrap">
                    <div className="left">Answer {i + 1}</div>
                    <div className="right">{item?.answer}</div>
                  </div>
                </>
              );
            }
          })}

        {/* <Form form={form}>
          {data?.serviceDetails?.length && (
            <Col xs={24} lg={24}>
              <ServiceDetailsCommon disabled={true} title="Service Details" name="serviceDetails" />
            </Col>
          )}
          {data?.howItWork?.length && (
            <Col xs={24} lg={24}>
              <HowItWorksCommon disabled={true} />
            </Col>
          )}
          {data?.faq?.length && (
            <Col xs={24} lg={24}>
              <FaqCommon disabled={true} />
            </Col>
          )}
        </Form> */}
      </div>
    </Wrapper>
  );
};

export default ViewService;
