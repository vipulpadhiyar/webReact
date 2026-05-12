import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { faqList } from 'services/api/category/type';
import { useSubServiceView } from 'services/hooks/subService';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Sub Service Management',
    href: ROUTES.subServiceManagement
  },
  {
    title: 'View'
  }
];
const ViewSubService = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useSubServiceView(_id);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.subServiceManagement)}>
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
                    ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subService}/${data?.image}`
                    : toAbsoluteUrl('/asset/dummy.png')
                }
                alt="dummy"
              />
            </picture>
          </div>
        </div>
        <div className="viewWrap">
          <div className="left">Sub Service Name</div>
          <div className="right">{data && replaceAndCapitalize(data?.name)}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Service Name</div>
          <div className="right">{data && replaceAndCapitalize(data?.serviceName)}</div>
        </div>

        <div className="viewWrap">
          <div className="left">Sub Service Price</div>
          <div className="right">{data?.price}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Sub Service Commission</div>
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
        {data?.aboutSubService && (
          <div className="viewWrap">
            <div className="left">About Sub-Service</div>
            <div className="right" dangerouslySetInnerHTML={{ __html: data?.aboutSubService }} />
          </div>
        )}
        {data && data?.subServiceDetails?.length > 0 && (
          <h3 className="faq-title">SubService Details</h3>
        )}
        {data?.subServiceDetails &&
          data?.subServiceDetails?.length > 0 &&
          data?.subServiceDetails?.map((item: any, i: any) => {
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
        {/* {data && data?.faq.length > 0 && <h3 className="faq-title">Faq</h3>}
        {data?.faq &&
          data?.faq.length > 0 &&
          data?.faq?.map((item: faqList) => {
            if (item?.answer || item?.question) {
              return (
                <div className="viewWrap">
                  <div className="left">{item?.question}</div>
                  <div className="right">{item?.answer}</div>
                </div>
              );
            }
          })} */}
      </div>
    </Wrapper>
  );
};

export default ViewSubService;
