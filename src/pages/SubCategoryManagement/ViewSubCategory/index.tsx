import { Wrapper } from './style';

import { Button, Image, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useSubCategoryView } from 'services/hooks/subCategory';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Sub Category Management',
    href: ROUTES.subCategoryManagement
  },
  {
    title: 'View'
  }
];

const ViewSubCategory = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useSubCategoryView(_id);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(ROUTES.subCategoryManagement)}
          >
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
                    ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subCategory}/${data?.image}`
                    : toAbsoluteUrl('/asset/dummy.png')
                }
                alt="dummy"
              />
            </picture>
          </div>
        </div>
        <div className="viewWrap">
          <div className="left">Sub-Category Name</div>
          <div className="right">{data ? replaceAndCapitalize(data?.name) : ''}</div>
        </div>
        {data?.aboutSubCategory && (
          <div className="viewWrap">
            <div className="left">About Sub-Category</div>
            <div className="right" dangerouslySetInnerHTML={{ __html: data?.aboutSubCategory }} />
          </div>
        )}
        <div className="viewWrap">
          <div className="left">Number of Service</div>
          <div className="right">{data?.serviceCount}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Banner</div>
          <div className="right">
            <Space size={16} align="center" wrap>
              {data?.bannerMedia?.length
                ? data?.bannerMedia?.map((val) => {
                    if (val?.thumbnail) {
                      return (
                        <video
                          src={`${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subCategory}/${val?.media}`}
                          className="video-view"
                          controls
                        />
                      );
                    } else {
                      return (
                        <Image
                          className="img-view"
                          src={`${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subCategory}/${val?.media}`}
                          alt="banner-image"
                        />
                      );
                    }
                  })
                : '-'}
            </Space>
          </div>
        </div>
        {/* <h3 className="faq-title">Faq</h3> */}

        {/* {data?.faq &&
          data?.faq.length > 0 &&
          data?.faq?.map((item: faqList) => {
            if (item?.question || item?.answer)
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

export default ViewSubCategory;
