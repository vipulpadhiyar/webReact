import { Wrapper } from './style';

import { Button, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ContentHeader from 'components/layout/contentHeader';

import { useVendorView } from 'services/hooks/vendor';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { renderDate, replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Vendor Management',
    href: ROUTES.vendorManagement
  },
  {
    title: 'View'
  }
];

const ViewVendor = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useVendorView(_id);
  return (
    <Wrapper className="ViewPage">
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="d-flex justify-content-end mb-30 ">
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.vendorManagement)}>
            Back
          </Button>
        </div>
        <h3>Personal Information</h3>
        <Row justify={'space-between'} gutter={[0, 10]} wrap>
          <div className="viewWrap">
            <div className="left">Image</div>
            <div className="right">
              <picture>
                <img
                  src={
                    data?.profilePicture
                      ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.vendor}/${data?.profilePicture}`
                      : toAbsoluteUrl('/asset/dummy.png')
                  }
                  alt="dummy"
                />
              </picture>
            </div>
          </div>
          <div className="viewWrap">
            <div className="left">First Name</div>
            <div className="right">{data?.firstName}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Last Name</div>
            <div className="right">{data?.lastName}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Phone Number</div>
            <div className="right">{data?.phoneNumber}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Past Working Experience</div>
            <div className="right">{data?.pastWorkingExperience}</div>
          </div>
          {/* <div className="viewWrap">
            <div className="left">Total Rating</div>
            <div className="right">{data?.totalRating}</div>
          </div>
          <div className="viewWrap">
            <div className="left">How many people rated you?</div>
            <div className="right">{data?.ratedYou}</div>
          </div>
          <div className="viewWrap">
            <div className="left">How many people review you?</div>
            <div className="right">{data?.reviewYou}</div>
          </div> */}
          <div className="viewWrap">
            <div className="left">Availability</div>
            <div className="right">{data?.isAllTimeAvailable ? 'Yes' : 'No'}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Interested in paid leads</div>
            <div className="right">{data?.interestedPaidLead ? 'Yes' : 'No'}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Spoken Language</div>
            <div className="right">
              {data?.spokenLanguages.map((obj, index) => {
                if (index === data?.spokenLanguages.length - 1) {
                  return `${obj}`;
                }
                return `${obj}, `;
              })}
            </div>
          </div>
          <div className="viewWrap">
            <div className="left">Address Line 1</div>
            <div className="right">{data?.address?.addressLine1}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Address Line 2</div>
            <div className="right">{data?.address?.addressLine2}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Pin Code</div>
            <div className="right">{data?.address?.pinCode}</div>
          </div>
          <div className="viewWrap">
            <div className="left">City</div>
            <div className="right">{data?.address?.city}</div>
          </div>
          <div className="viewWrap">
            <div className="left">State</div>
            <div className="right">{data?.address?.state}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Latitude</div>
            <div className="right">{data?.location?.coordinates?.[1] || '-'}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Longitude</div>
            <div className="right">{data?.location?.coordinates?.[0] || '-'}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Last Open App Date</div>
            <div className="right">{renderDate(data?.lastOpenAppDate ?? '')}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Last Login Date</div>
            <div className="right">{renderDate(data?.lastLoginDate ?? '')}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Last Location Updated Date</div>
            <div className="right">{renderDate(data?.lastLocationUpdateDate ?? '')}</div>
          </div>
        </Row>

        <h3>Business Information</h3>
        <Row justify={'space-between'} gutter={[0, 10]} wrap>
          <div className="viewWrap">
            <div className="left">Business Image</div>
            <div className="right">
              {data?.businessDetails?.businessImage ? (
                <picture>
                  <img
                    src={`${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.vendor}/${data?.businessDetails?.businessImage}`}
                    alt="dummy"
                  />
                </picture>
              ) : (
                'Image not available'
              )}
            </div>
          </div>
          <div className="viewWrap">
            <div className="left">Owner Name</div>
            <div className="right">
              {data?.businessDetails?.ownerName ? data?.businessDetails?.ownerName : '-'}
            </div>
          </div>
          <div className="viewWrap">
            <div className="left">Business Name</div>
            <div className="right">
              {data?.businessDetails?.businessName
                ? replaceAndCapitalize(data?.businessDetails?.businessName)
                : '-'}
            </div>
          </div>
          <div className="viewWrap">
            <div className="left">Primary Category Name</div>
            <div className="right">
              {replaceAndCapitalize(data?.businessDetails?.primaryBusinessCategory?.name)}
            </div>
          </div>
          <div className="viewWrap">
            <div className="left">Primary Sub Category Name</div>
            <div className="right">
              {' '}
              {data?.businessDetails?.primaryBusinessSubService.map((obj, index) => {
                if (index === data?.businessDetails?.primaryBusinessSubService.length - 1) {
                  return `${replaceAndCapitalize(obj?.name)}`;
                }
                return `${replaceAndCapitalize(obj?.name)}, `;
              })}
            </div>
          </div>
          {data && data?.businessDetails?.secondaryBusinessCategory?.length > 0 && (
            <div className="viewWrap">
              <div className="left">Secondary Business Category</div>
              <div className="right">
                {' '}
                {data?.businessDetails?.secondaryBusinessCategory.map((obj, index) => {
                  if (index === data?.businessDetails?.primaryBusinessSubService.length - 1) {
                    return `${replaceAndCapitalize(obj?.name)}`;
                  }
                  return `${replaceAndCapitalize(obj?.name)}, `;
                })}
              </div>
            </div>
          )}
          {data && data?.businessDetails?.secondaryBusinessSubService.length > 0 && (
            <div className="viewWrap">
              <div className="left">Secondary Business Sub Category</div>
              <div className="right">
                {' '}
                {data?.businessDetails?.secondaryBusinessSubService.map((obj, index) => {
                  if (index === data?.businessDetails?.secondaryBusinessSubService.length - 1) {
                    return `${replaceAndCapitalize(obj?.name)}`;
                  }
                  return `${replaceAndCapitalize(obj?.name)}, `;
                })}
              </div>
            </div>
          )}
          <div className="viewWrap">
            <div className="left">Service City</div>
            <div className="right">
              {data?.businessDetails?.serviceCity?.name
                ? replaceAndCapitalize(data?.businessDetails?.serviceCity?.name)
                : '-'}
            </div>
          </div>
          {data && data?.businessDetails?.serviceArea?.length > 0 && (
            <div className="viewWrap">
              <div className="left">Service Areas</div>
              <div className="right">
                {' '}
                {data?.businessDetails?.serviceArea?.map((obj, index) => {
                  if (index === data?.businessDetails?.serviceArea?.length - 1) {
                    return `${replaceAndCapitalize(obj?.name)}`;
                  }
                  return `${replaceAndCapitalize(obj?.name)}, `;
                })}
              </div>
            </div>
          )}

          <div className="viewWrap">
            <div className="left">Secondary Type</div>
            <div className="right">{data?.businessDetails?.businessType ?? '-'}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Do you have any shop?</div>
            <div className="right">{data?.businessDetails?.isShop ? 'Yes' : 'No'}</div>
          </div>
        </Row>

        <h3>Account Information</h3>
        <Row justify={'space-between'} gutter={[0, 10]} wrap>
          <div className="viewWrap">
            <div className="left">Bank Name</div>
            <div className="right">{data?.accountDetails?.bankName || '-'}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Account Holder Name</div>
            <div className="right">{data?.accountDetails?.accountHolderName || '-'}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Account Number</div>
            <div className="right">{data?.accountDetails?.accountNumber || '-'}</div>
          </div>
          <div className="viewWrap">
            <div className="left">IFSC Code</div>
            <div className="right">{data?.accountDetails?.IFSCCode || '-'}</div>
          </div>
          <div className="viewWrap">
            <div className="left">PAN Card Number</div>
            <div className="right">{data?.accountDetails?.panNumber || '-'}</div>
          </div>
          <div className="viewWrap">
            <div className="left">Aadhar Card Number</div>
            <div className="right">{data?.accountDetails?.aadhaarNumber || '-'}</div>
          </div>
        </Row>
      </div>
    </Wrapper>
  );
};

export default ViewVendor;
