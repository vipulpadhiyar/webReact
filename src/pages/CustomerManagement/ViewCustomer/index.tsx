import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useCustomerView } from 'services/hooks/customer';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Customer Management',
    href: ROUTES.customerManagement
  },
  {
    title: 'View'
  }
];

const ViewCustomer = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useCustomerView(_id);
  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames}></ContentHeader>
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.customerManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Profile Image</div>
          <div className="right">
            <picture>
              <img
                src={
                  data?.profilePicture
                    ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.customer}/${data?.profilePicture}`
                    : toAbsoluteUrl('/asset/dummy.png')
                }
                alt="dummy"
              />
            </picture>
          </div>
        </div>
        <div className="viewWrap">
          <div className="left">Full Name</div>
          <div className="right">{data?.fullName ? data?.fullName : 'Full name not available'}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Phone Number</div>
          <div className="right">{`${data?.countryCode} ${data?.phoneNumber}`}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Email</div>
          <div className="right">{data?.email ? data?.email : 'Email not available'}</div>
        </div>
        {/* <div className="viewWrap">
          <div className="left">Country Code</div>
          <div className="right">{data?.countryCode}</div>
        </div> */}
      </div>
    </Wrapper>
  );
};

export default ViewCustomer;
