import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useCityView } from 'services/hooks/city';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'City Management',
    href: ROUTES.cityManagement
  },
  {
    title: 'View'
  }
];

const ViewCity = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useCityView(_id);
  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.cityManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Image</div>
          <div className="right">
            <picture>
              <img
                src={
                  data?.image
                    ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.city}/${data?.image}`
                    : toAbsoluteUrl('/asset/dummy.png')
                }
                alt="dummy"
              />
            </picture>
          </div>
        </div>
        <div className="viewWrap">
          <div className="left">City Name</div>
          <div className="right">{data && replaceAndCapitalize(data?.name)}</div>
        </div>
        {data?.aboutCity && (
          <div className="viewWrap">
            <div className="left">About City</div>
            <div className="right" dangerouslySetInnerHTML={{ __html: data?.aboutCity }} />
          </div>
        )}
        <div className="viewWrap">
          <div className="left">Number of Area</div>
          <div className="right">{data?.cityAreaCount}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Show this city in top 5</div>
          <div className="right">{data?.showInTop ? 'Yes' : 'No'}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Status</div>
          <div className="right">{data?.enableBooking ? 'Enable booking' : 'Only for listing'}</div>
        </div>
        {/* <h3 className="faq-title">Faq</h3>
        {data?.faq &&
          data?.faq.length > 0 &&
          data?.faq?.map((item: faqList) => {
            return (
              <div className="viewWrap">
                <div className="left">{item?.question}</div>
                <div className="right">{item?.answer}</div>
              </div>
            );
          })} */}
      </div>
    </Wrapper>
  );
};

export default ViewCity;
