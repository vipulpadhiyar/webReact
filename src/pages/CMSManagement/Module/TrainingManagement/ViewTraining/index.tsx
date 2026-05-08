import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { requestPayloadGetFaq } from 'services/api/faq/type';
import { useTrainingView } from 'services/hooks/training';

import { cmsTypeEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const ViewTraining = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const requestPayload: requestPayloadGetFaq = {
    cmsType: cmsTypeEnum.training,
    _id: _id
  };
  const { data } = useTrainingView(requestPayload);
  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.trainingManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Title</div>
          <div className="right">{data?.titleKey}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Content</div>
          <div className="right">{data?.content}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Link</div>
          <div className="right">{data?.link}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewTraining;
