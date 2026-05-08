import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useCategoryView } from 'services/hooks/category';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Category Management',
    href: ROUTES.categoryManagement
  },
  {
    title: 'View'
  }
];

const ViewCategory = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useCategoryView(_id);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.categoryManagement)}>
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
                    ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.category}/${data?.image}`
                    : toAbsoluteUrl('/asset/dummy.png')
                }
                alt="dummy"
              />
            </picture>
          </div>
        </div>
        {data?.featureImage && (
          <div className="viewWrap">
            <div className="left">Feature Image</div>
            <div className="right">
              <picture>
                <img
                  src={
                    data?.featureImage
                      ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.category}/${data?.featureImage}`
                      : toAbsoluteUrl('/asset/dummy.png')
                  }
                  alt="dummy"
                />
              </picture>
            </div>
          </div>
        )}
        <div className="viewWrap">
          <div className="left">Category Name</div>
          <div className="right">{data ? replaceAndCapitalize(data?.name) : ''}</div>
        </div>
        {data?.aboutCategory && (
          <div className="viewWrap">
            <div className="left">About Category</div>
            <div className="right" dangerouslySetInnerHTML={{ __html: data?.aboutCategory }} />
          </div>
        )}
        <div className="viewWrap">
          <div className="left">Number of Sub Category</div>
          <div className="right">{data?.subCategoryCount}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Rating</div>
          <div className="right">{data?.rating}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Apply one km duty algorithm</div>
          <div className="right">{data?.isOneKmAlgorithm ? 'true' : 'false'}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewCategory;
