// import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, MenuProps, Row, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { authAPI } from 'services/api/auth';
import { authStore } from 'services/store/auth';

import { ROUTES } from 'utils/constants/routes';
import { toAbsoluteUrl } from 'utils/functions';

import { StyledLayout } from '../Layout.Styled';

const Header = () => {
  const navigate = useNavigate();
  const {
    actions: { authFail }
  } = authStore((state) => state);
  const onLogout = () => {
    authAPI
      .logoutAction()
      .then((res) => {
        message.success(res?.message);
        authFail();
      })
      .catch((err) => {
        message.success(err?.message);
      });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type="link" onClick={() => navigate(ROUTES.changePassword)}>
          Change password
        </Button>
      )
      // icon: <UserOutlined />
    },
    {
      key: '2',
      label: (
        <Button type="link" onClick={onLogout}>
          Logout
        </Button>
      )
      // icon: <LogoutOutlined />
    }
  ];

  return (
    <StyledLayout.Header style={{ textAlign: 'center' }}>
      <Row gutter={16} align={'middle'} justify={'space-between'}>
        <Col sm={20} md={20} className="d-flex align-items-center justify-content-start">
          {/* <h2 className="header-title">Dashboard</h2> */}
        </Col>
        <Col sm={4} md={4} className="d-flex align-items-center justify-content-end">
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            className="layout-header-dropdown"
            overlayClassName="layout-header-dropdown"
          >
            <Link to="" onClick={(e) => e.preventDefault()}>
              <Avatar
                size="large"
                src={toAbsoluteUrl('/asset/user_thumbnail.svg')}
                className="profile-avatar"
              />
            </Link>
          </Dropdown>
        </Col>
      </Row>
    </StyledLayout.Header>
  );
};

export default Header;
