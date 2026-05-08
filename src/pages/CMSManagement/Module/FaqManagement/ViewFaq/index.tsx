import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { requestPayloadGetFaq } from 'services/api/faq/type';
import { useFaqView } from 'services/hooks/faq';

import { UserRoleFaq, cmsTypeEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const ViewFaq = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const requestPayload: requestPayloadGetFaq = {
    cmsType: cmsTypeEnum.faq,
    _id: _id
  };
  const { data } = useFaqView(requestPayload);
  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.faqManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Question</div>
          <div className="right">{data?.question}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Answer</div>
          <div className="right">{data?.answer}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Role</div>
          <div className="right">{data?.role === UserRoleFaq.VENDOR ? 'Vendor' : 'Customer'}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewFaq;
