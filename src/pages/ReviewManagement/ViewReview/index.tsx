import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useReviewView } from 'services/hooks/review';

import { ROUTES } from 'utils/constants/routes';

const pathNames: any = [
  {
    title: 'Review Management',
    href: ROUTES.reviewManagement
  },
  {
    title: 'View'
  }
];

const ViewReview = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useReviewView(_id);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.reviewManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Vendor name</div>
          <div className="right">{data?.vendorFullName}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Review</div>
          <div className="right">{data?.review}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Rating</div>
          <div className="right">{data?.rating}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Status</div>
          <div className="right">{data?.status}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewReview;
