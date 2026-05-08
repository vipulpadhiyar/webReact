import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useHomeBannerView } from 'services/hooks/homeBanner';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Home Banner Management',
    href: ROUTES.homeBannerManagement
  },
  {
    title: 'View'
  }
];

const ViewHomeBanner = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useHomeBannerView(_id);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.homeBannerManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Home Banner Image</div>
          <div className="right">
            <picture>
              <img
                src={
                  data?.image && data?.image !== ''
                    ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.homePageBanner}/${data?.image}`
                    : toAbsoluteUrl('/asset/dummy.png')
                }
                alt="dummy"
              />
            </picture>
          </div>
        </div>

        <div className="viewWrap">
          <div className="left">Home Banner Name</div>
          <div className="right">{data?.name ?? ''}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewHomeBanner;
