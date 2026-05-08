import { Wrapper } from './style';

import { Col, Row } from 'antd';

import Meta from 'components/common/Meta';
import ContentHeader from 'components/layout/contentHeader';

import { useDashboard } from 'services/hooks/dashboard';

const pathNames: any = [
  {
    title: 'Dashboard'
  }
];

const Dashboard = () => {
  const { data } = useDashboard();
  return (
    <>
      <Meta title="Number Dekho - Home" />
      <Wrapper>
        <div className="shadow-paper">
          <ContentHeader pathNames={pathNames} />
          <Row gutter={[20, 20]}>
            {/* <Col xs={24}>
              <h2 className="pageTitle mb-20">Dashboard</h2>
            </Col> */}
            <Col xs={8} lg={6}>
              <div className="dashboardInfo">
                <span className="number">{data?.user ?? '-'}</span>
                <h2 className="infoTitle">Total Users</h2>
              </div>
            </Col>
            <Col xs={8} lg={6}>
              <div className="dashboardInfo">
                <span className="number">{data?.vendor ?? '-'}</span>
                <h2 className="infoTitle">Total Vendors</h2>
              </div>
            </Col>
            <Col xs={8} lg={6}>
              <div className="dashboardInfo">
                <span className="number">{data?.completeBooking ?? '-'}</span>
                <h2 className="infoTitle">Total Completed Bookings</h2>
              </div>
            </Col>
            <Col xs={8} lg={6}>
              <div className="dashboardInfo">
                <span className="number">{data?.pendingBooking ?? '-'}</span>
                <h2 className="infoTitle">Total Pending Bookings</h2>
              </div>
            </Col>
            <Col xs={8} lg={6}>
              <div className="dashboardInfo">
                <span className="number">{data?.cancelBooking ?? '-'}</span>
                <h2 className="infoTitle">Total Cancel Bookings</h2>
              </div>
            </Col>
          </Row>
        </div>
      </Wrapper>
    </>
  );
};

export default Dashboard;
