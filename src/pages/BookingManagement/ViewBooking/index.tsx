import { Wrapper } from './style';

import { Button, Image, Table } from 'antd';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useBookingView } from 'services/hooks/booking';

import { BookingType, VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { replaceAndCapitalize } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Booking Management',
    href: ROUTES.bookingManagement
  },
  {
    title: 'View'
  }
];

const ViewBooking = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useBookingView(_id);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span>{replaceAndCapitalize(name)}</span>
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value: string) => (value ? `₹ ${value}` : '-')
    },
    {
      title: 'GST',
      dataIndex: 'gst',
      key: 'gst',
      render: (value: string) => (value ? `${value}%` : '-')
    }
  ];

  const getTimeBetweenDate = (startDate: string, endDate: string) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    // Calculate the difference in minutes
    const differenceInMinutes = end.diff(start, 'minute');
    return `${differenceInMinutes} minutes`;
  };

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.bookingManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Booking Id</div>
          <div className="right">{data?.bookingNumber}</div>
        </div>
        <h4>Customer Details</h4>
        {data?.customerFullName && (
          <div className="viewWrap">
            <div className="left">Customer Name</div>
            <div className="right">{data?.customerFullName}</div>
          </div>
        )}
        {data?.customerPhoneNumber && (
          <div className="viewWrap">
            <div className="left">Customer Phone Number</div>
            <div className="right">{data?.customerPhoneNumber}</div>
          </div>
        )}
        {data?.customerEmail && (
          <div className="viewWrap">
            <div className="left">Customer Email</div>
            <div className="right">{data?.customerEmail?.toLowerCase()}</div>
          </div>
        )}
        <h4>Vendor Details</h4>
        {data?.uploadSelfieImage && (
          <div className="viewWrap">
            <div className="left">Vendor Selfie</div>
            <div className="right">
              <picture>
                <Image
                  width="100px"
                  height="70px"
                  src={`${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.bookingRequest}/${data?.uploadSelfieImage}`}
                  alt=""
                />
              </picture>
            </div>
          </div>
        )}
        {data?.vendorFullName && (
          <div className="viewWrap">
            <div className="left">Vendor Full Name</div>
            <div className="right">{data?.vendorFullName}</div>
          </div>
        )}
        {data?.vendorEmail && (
          <div className="viewWrap">
            <div className="left">Vendor Email</div>
            <div className="right">{data?.vendorEmail}</div>
          </div>
        )}
        {data?.vendorPhoneNumber && (
          <div className="viewWrap">
            <div className="left">Vendor Phone Number</div>
            <div className="right">{data?.vendorPhoneNumber}</div>
          </div>
        )}
        {data?.rating && (
          <div className="viewWrap">
            <div className="left">Vendor Rating</div>
            <div className="right">{data?.rating}</div>
          </div>
        )}
        {(data?.vendorShare || data?.vendorShare === 0) && (
          <div className="viewWrap">
            <div className="left">Vendor Share</div>
            <div className="right">₹ {data?.vendorShare}</div>
          </div>
        )}
        {(data?.vendorTotal || data?.vendorTotal === 0) && (
          <div className="viewWrap">
            <div className="left">Vendor Total</div>
            <div className="right">₹ {data?.vendorTotal}</div>
          </div>
        )}
        {(data?.serviceStartDate || data?.serviceEndDate) && <h4>Work time Details</h4>}
        {data?.serviceEndDate && (
          <div className="viewWrap">
            <div className="left">Completion date and time</div>
            <div className="right">{dayjs(data?.serviceEndDate)?.format('M/D/YYYY h:mm A')}</div>
          </div>
        )}
        {data?.serviceStartDate && data?.serviceEndDate && (
          <div className="viewWrap">
            <div className="left">Time take to finish</div>
            <div className="right">
              {getTimeBetweenDate(data?.serviceStartDate, data?.serviceEndDate)}
            </div>
          </div>
        )}
        <h4>Other Details</h4>
        {data?.uploadWorkImage?.length ? (
          <div className="viewWrap">
            <div className="left">Work Images</div>
            <div className="right">
              {data?.uploadWorkImage?.map((val: string) => {
                return (
                  <picture>
                    <Image
                      width="100px"
                      height="70px"
                      src={`${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.bookingRequest}/${val}`}
                      alt=""
                    />
                  </picture>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className="viewWrap">
          <div className="left">Category Name</div>
          <div className="right">{data && replaceAndCapitalize(data?.categoryName)}</div>
        </div>
        <div className="viewWrap">
          <div className="left">City</div>
          <div className="right">{data?.userAddress?.city ?? '-'}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Payment Method</div>
          <div className="right">{data?.paymentMethod}</div>
        </div>
        {data?.couponCode ? (
          <div className="viewWrap">
            <div className="left">Coupon Code</div>
            <div className="right">{data?.couponCode}</div>
          </div>
        ) : null}
        {data?.discount ? (
          <div className="viewWrap">
            <div className="left">Discount</div>
            <div className="right">₹ {data?.discount}</div>
          </div>
        ) : null}
        <div className="viewWrap">
          <div className="left">Total Amount</div>
          <div className="right">₹ {data?.totalAmount}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Admin Share</div>
          <div className="right">₹ {data?.NDShare}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Admin Total</div>
          <div className="right">₹ {data?.NDTotal}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Service Charges</div>
          <div className="right">₹ {data?.serviceCharge}</div>
        </div>
        {Number(data?.visitationFee) > 0 ? (
          <div className="viewWrap">
            <div className="left">Night Charges</div>
            <div className="right">₹ {data?.nightCharges}</div>
          </div>
        ) : null}
        {Number(data?.visitationFee) > 0 ? (
          <div className="viewWrap">
            <div className="left">Visiting Fees</div>
            <div className="right">₹ {data?.visitationFee}</div>
          </div>
        ) : null}
        <div className="viewWrap">
          <div className="left">Sub Total</div>
          <div className="right">₹ {data?.subTotal}</div>
        </div>
        {data?.userAddress?.address && (
          <div className="viewWrap">
            <div className="left">Address</div>
            <div className="right">{data?.userAddress?.addressLine1}</div>
          </div>
        )}
        <div className="viewWrap">
          <div className="left">Booking status</div>
          <div className="right">{replaceAndCapitalize(data?.status)}</div>
        </div>
        {data?.reason && (
          <div className="viewWrap">
            <div className="left">Cancellation Reason</div>
            <div className="right">{data?.reason}</div>
          </div>
        )}
        {data?.bookingType && (
          <div className="viewWrap">
            <div className="left">Booking Type</div>
            <div className="right">
              {data?.bookingType === BookingType.INSTANT ? 'Instant' : 'Schedule'}
            </div>
          </div>
        )}
        {data?.bookingType === BookingType.SCHEDULE && (
          <div className="viewWrap">
            <div className="left">Schedule</div>
            <div className="right">{`${dayjs(data?.scheduleDate).format(
              'MM/DD/YYYY'
            )} (${data?.scheduleSlot})`}</div>
          </div>
        )}

        <h4>Service List</h4>
        <Table columns={columns} dataSource={data?.service} />
      </div>
    </Wrapper>
  );
};

export default ViewBooking;
