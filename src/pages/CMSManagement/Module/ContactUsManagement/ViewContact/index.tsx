import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { requestPayloadGetFaq } from 'services/api/faq/type';
import { useContactUsView } from 'services/hooks/contactUs';

import { VITE_REACT_APP_IMAGE_URL, cmsTypeEnum, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { toAbsoluteUrl } from 'utils/functions';

const ViewCategory = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const requestPayload: requestPayloadGetFaq = {
    cmsType: cmsTypeEnum.contactsUs,
    _id: _id
  };
  const { data } = useContactUsView(requestPayload);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.contactUsManagement)}>
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
                    ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.cms}/${data?.image}`
                    : toAbsoluteUrl('/asset/dummy.png')
                }
                alt="dummy"
              />
            </picture>
          </div>
        </div>
        <div className="viewWrap">
          <div className="left">First Name</div>
          <div className="right">{data?.firstName}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Last Name</div>
          <div className="right"> {data?.lastName}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Phone Number</div>
          <div className="right">{data?.phoneNumber}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Email</div>
          <div className="right">{data?.email}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewCategory;
