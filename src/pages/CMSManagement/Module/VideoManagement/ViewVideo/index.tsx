import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useVideoView } from 'services/hooks/video';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Video Management',
    href: ROUTES.videoManagement
  },
  {
    title: 'View'
  }
];

const ViewVideo = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useVideoView(_id);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.videoManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Video</div>
          <div className="right">
            <video
              src={
                data?.video
                  ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.video}/${data?.video}`
                  : toAbsoluteUrl('/asset/dummy.png')
              }
              style={{ width: '400px', height: '400px' }}
              controls
            />
          </div>
        </div>

        <div className="viewWrap">
          <div className="left">Video Name</div>
          <div className="right">{data?.name ?? ''}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewVideo;
