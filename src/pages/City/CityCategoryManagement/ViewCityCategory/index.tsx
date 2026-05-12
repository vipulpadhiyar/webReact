import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useCityCategoryView } from 'services/hooks/cityCategory';

import { ROUTES } from 'utils/constants/routes';
import { replaceAndCapitalize } from 'utils/functions';

const pathNames: any = [
  {
    title: 'City Category Management',
    href: ROUTES.cityCategoryManagement
  },
  {
    title: 'View'
  }
];

const ViewCityCategory = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useCityCategoryView(_id);
  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />

        <div className="d-flex justify-content-end mb-30 ">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(ROUTES.cityCategoryManagement)}
          >
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">City Name</div>
          <div className="right">{data && replaceAndCapitalize(data?.cityName)}</div>
        </div>
        {/* <div className="viewWrap">
          <div className="left">Area Name</div>
          <div className="right">
            {data &&
              data?.cityAreaName?.charAt(0).toUpperCase() +
                data?.cityAreaName?.slice(1).replace(/-/g, ' ')}
          </div>
        </div> */}
        <div className="viewWrap">
          <div className="left">Category Name</div>
          <div className="right">{data && replaceAndCapitalize(data?.categoryName)}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Service Count</div>
          <div className="right">{data?.serviceCount}</div>
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

export default ViewCityCategory;
