import { Wrapper } from './style';

import { Button, Form } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useSubAdminView } from 'services/hooks/subAdmin';

import { VITE_REACT_APP_IMAGE_URL, checkBoxOptions, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const pathNames: any = [
  {
    title: 'Sub Admin Management',
    href: ROUTES.subAdminManagement
  },
  {
    title: 'View'
  }
];

const ViewSubAdmin = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useSubAdminView(_id);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      access: data?.access ?? []
    });
  }, [data, form]);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.subAdminManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Profile Picture</div>
          <div className="right">
            {data?.profilePicture ? (
              <picture>
                <img
                  src={
                    data?.profilePicture
                      ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subAdmin}/${data?.profilePicture}`
                      : ''
                  }
                  alt="dummy"
                />
              </picture>
            ) : (
              '-'
            )}
          </div>
        </div>

        <div className="viewWrap">
          <div className="left">First Name</div>
          <div className="right">{data?.firstName ?? '-'}</div>
        </div>

        <div className="viewWrap">
          <div className="left">Last Name</div>
          <div className="right">{data?.lastName ?? '-'}</div>
        </div>

        <div className="viewWrap">
          <div className="left">Email</div>
          <div className="right">{data?.email ?? ''}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Phone Number</div>
          <div className="right">
            {data?.phoneNumber ? data?.countryCode + ' ' + data?.phoneNumber : '-'}
          </div>
        </div>
        <div className="viewWrap">
          <div className="left">Role</div>
          <div className="right">
            {data?.access?.length
              ? checkBoxOptions
                  .filter((option) => data?.access?.includes(option.value))
                  .map((option) => option?.label)
                  ?.join(', ')
              : '-'}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewSubAdmin;
