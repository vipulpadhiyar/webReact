import { Wrapper } from './style';

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useCouponView } from 'services/hooks/coupon';

import { ROUTES } from 'utils/constants/routes';
import { formatDate, replaceAndCapitalize } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Coupon Management',
    href: ROUTES.couponManagement
  },
  {
    title: 'View'
  }
];

const ViewCoupon = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useCouponView(_id);

  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.couponManagement)}>
            Back
          </Button>
        </div>
        <div className="viewWrap">
          <div className="left">Coupon Code</div>
          <div className="right">{data?.couponCode}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Discount Type</div>
          <div className="right">{data?.discountType}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Discount</div>
          <div className="right">{data?.discount}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Category Name</div>
          <div className="right">
            {' '}
            {!data?.totalAmountDiscount
              ? data?.categoryName?.map((obj: string, index: number) => {
                  if (index === data?.categoryName.length - 1) {
                    return `${replaceAndCapitalize(obj)}`;
                  }
                  return `${replaceAndCapitalize(obj)}, `;
                })
              : 'ALL'}
          </div>
        </div>
        <div className="viewWrap">
          <div className="left">User Phone Number</div>
          <div className="right">
            {' '}
            {data && data?.userPhoneNum.length > 0
              ? data?.userPhoneNum.map((obj: string, index: number) => {
                  if (index === data?.userPhoneNum.length - 1) {
                    return `${obj.charAt(0).toUpperCase() + obj.slice(1).replace(/-/g, ' ')}`;
                  }
                  return `${obj.charAt(0).toUpperCase() + obj.slice(1).replace(/-/g, ' ')}, `;
                })
              : 'Applicable for all'}
          </div>
        </div>
        <div className="viewWrap">
          <div className="left">Usage Limit</div>
          <div className="right">{data?.usageLimit}</div>
        </div>
        <div className="viewWrap">
          <div className="left">Per User Usage Limit</div>
          <div className="right">{data?.userUsageLimit}</div>
        </div>
        {data?.validateDate && (
          <div className="viewWrap">
            <div className="left">Validate date</div>
            <div className="right">{formatDate(data?.validateDate)}</div>
          </div>
        )}
        <div className="viewWrap">
          <div className="left">Apply On Total Amount</div>
          <div className="right">{data?.totalAmountDiscount ? 'Yes' : 'No'}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewCoupon;
