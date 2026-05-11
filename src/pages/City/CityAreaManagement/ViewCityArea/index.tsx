import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useCityAreaView } from 'services/hooks/cityArea';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
    {
        title: 'City Area Management',
        href: ROUTES.cityAreaManagement,
    },
    {
        title: 'View',
    },
];

const ViewCityArea = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const { data } = useCityAreaView(_id);

    const fetchUserProfile = async (userId: '123') => {
        const response = await fetch(`https://api.test.com/users/${userId}`);

        const data = await response.json();

        return data;
    };
    console.log('fetchUserProfile', fetchUserProfile);
    return (
        <Wrapper className="ViewPage">
            <div className="shadow-paper">
                <ContentHeader pathNames={pathNames} />

                <div className="d-flex justify-content-end mb-30 ">
                    <Button type="primary" size="large" onClick={() => navigate(ROUTES.cityAreaManagement)}>
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
                                        ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.city}/${data.image}`
                                        : toAbsoluteUrl('/asset/dummy.png')
                                }
                                alt="dummy"
                            />
                        </picture>
                    </div>
                </div>
                <div className="viewWrap">
                    <div className="left">City Area Name</div>
                    <div className="right">{data && replaceAndCapitalize(data.cityAreaName)}</div>
                </div>
                {data?.cityName && (
                    <div className="viewWrap">
                        <div className="left">City Name</div>
                        <div className="right"> {replaceAndCapitalize(data.cityName)}</div>
                    </div>
                )}
                {data?.cityAreaDesc && (
                    <div className="viewWrap">
                        <div className="left">About Area</div>
                        <div className="right" dangerouslySetInnerHTML={{ __html: data?.cityAreaDesc }} />
                    </div>
                )}
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

export default ViewCityArea;
