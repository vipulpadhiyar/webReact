import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { usePaymentHistoryView } from 'services/hooks/paymentHistory';

import { ROUTES } from 'utils/constants/routes';

const pathNames: any = [
  {
    title: 'Payment History Management',
    href: ROUTES.paymentHistoryManagement
  },
  {
    title: 'View'
  }
];

const ViewPaymentHistory = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = usePaymentHistoryView(_id);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(ROUTES.paymentHistoryManagement)}
          >
            Back
          </Button>
        </div>
        {data?.bookingNumber && (
          <div className="viewWrap">
            <div className="left">Booking Number</div>
            <div className="right">{data?.bookingNumber}</div>
          </div>
        )}

        {data?.vendorName && (
          <div className="viewWrap">
            <div className="left">Vendor Full Name</div>
            <div className="right">{data?.vendorName}</div>
          </div>
        )}
        {data?.customerName && (
          <div className="viewWrap">
            <div className="left">Customer Name</div>
            <div className="right">{data?.customerName}</div>
          </div>
        )}

        {data?.amount && (
          <div className="viewWrap">
            <div className="left">Total Amount</div>
            <div className="right">{data?.amount}</div>
          </div>
        )}
        {data?.customerPhoneNumber && (
          <div className="viewWrap">
            <div className="left">Customer Phone Number</div>
            <div className="right">{data?.customerPhoneNumber}</div>
          </div>
        )}
        {data?.vendorPhoneNumber && (
          <div className="viewWrap">
            <div className="left">Vendor Phone Number</div>
            <div className="right">{data?.vendorPhoneNumber}</div>
          </div>
        )}
        {data?.paymentMethod && (
          <div className="viewWrap">
            <div className="left">Payment Method</div>
            <div className="right">{data?.paymentMethod}</div>
          </div>
        )}

        {data?.transactionStatus && (
          <div className="viewWrap">
            <div className="left">Payment status</div>
            <div className="right">{data?.transactionStatus}</div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ViewPaymentHistory;
