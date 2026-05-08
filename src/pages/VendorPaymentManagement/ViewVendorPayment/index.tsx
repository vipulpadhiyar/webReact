import { Wrapper } from './style';

import { Button, Table } from 'antd';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useVendorPaymentView } from 'services/hooks/vendorPayment';

import { ROUTES } from 'utils/constants/routes';

const pathNames: any = [
  {
    title: 'Vendor Payment Management',
    href: ROUTES.vendorPaymentManagement
  },
  {
    title: 'View'
  }
];

const ViewVendorPayment = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useVendorPaymentView(_id);
  const columns = [
    {
      title: 'Booking Number',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber'
    },
    {
      title: 'Final Amount',
      dataIndex: 'finalAmt',
      key: 'finalAmt'
    },
    {
      title: 'Admin share',
      dataIndex: 'NDTotal',
      key: 'NDTotal'
    },
    {
      title: 'Vendor share',
      dataIndex: 'vendorShare',
      key: 'vendorShare'
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod'
    }
  ];
  const settledColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number, row: any) => (row?.isPaidByAdmin ? `₹ -${value}` : `₹ ${value}`)
    },
    {
      title: 'Settlement Date',
      dataIndex: 'settleDate',
      key: 'settleDate',
      render: (value: string) => dayjs(value).format('M/D/YYYY h:mm A')
    }
  ];

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(ROUTES.vendorPaymentManagement)}
          >
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">First Name</div>
          <div className="right">{data?.firstName}</div>
        </div>
        {data?.lastName && (
          <div className="viewWrap">
            <div className="left">Last Name</div>
            <div className="right">{data?.lastName}</div>
          </div>
        )}
        <div className="viewWrap">
          <div className="left">Phone Number</div>
          <div className="right">{data?.phoneNumber}</div>
        </div>
        {data && (
          <div className="viewWrap">
            <div className="left">Total Amount</div>
            <div className="right">{+data?.amount.toFixed(2)}</div>
          </div>
        )}
        <div className="viewWrap">
          <div className="left">Total Completed Services</div>
          <div className="right">{data?.totalCompletedService}</div>
        </div>
        <h4>Bank Details</h4>
        <div className="viewWrap">
          <div className="left">Bank Name</div>
          <div className="right">{data?.accountDetails?.bankName ?? '-'}</div>
        </div>

        <div className="viewWrap">
          <div className="left">Account Holder Name</div>
          <div className="right">{data?.accountDetails?.accountHolderName ?? '-'}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Account Number</div>
          <div className="right">{data?.accountDetails?.accountNumber ?? '-'}</div>
        </div>
        <div className="viewWrap">
          <div className="left">IFSC Code</div>
          <div className="right">{data?.accountDetails?.IFSCCode ?? '-'}</div>
        </div>
        <h4>Order List</h4>
        <Table columns={columns} dataSource={data?.bookingDetails} />
        {data?.settle && data?.settle?.length > 0 ? (
          <>
            <h4>Settlement List</h4>
            <Table columns={settledColumns} dataSource={data?.settle} />
          </>
        ) : null}
      </div>
    </Wrapper>
  );
};

export default ViewVendorPayment;
