import {
  DashboardOutlined,
  LineChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { authStore } from 'services/store/auth';

import { SubAdminRole } from 'utils/constants';
import { toAbsoluteUrl } from 'utils/functions';

import { StyledLayout } from '../Layout.Styled';

function createMenuItem(
  link?: string,
  label?: string,
  key?: any,
  icon?: any,
  children?: any,
  type?: any
) {
  return {
    link,
    key,
    icon,
    children,
    label,
    type
  };
}

const items = [
  createMenuItem(
    '/dashboard',
    'Dashboard',
    '1',
    <DashboardOutlined />,
    null,
    SubAdminRole.DASHBOARD
  ),
  createMenuItem(
    '/category-management',
    'Category Management',
    '2',
    <UserOutlined />,
    null,
    SubAdminRole.SERVICE
  ),
  createMenuItem(
    '/sub-category-management',
    'Sub-Category Management',
    '3',
    <UserOutlined />,
    null,
    SubAdminRole.SERVICE
  ),
  createMenuItem(
    '/service-management',
    'Service Management',
    '4',
    <UserOutlined />,
    null,
    SubAdminRole.SERVICE
  ),
  createMenuItem(
    '/sub-service-management',
    'Sub-Service Management',
    '5',
    <UserOutlined />,
    null,
    SubAdminRole.SERVICE
  ),
  createMenuItem(
    '/city-management',
    'City Management',
    'sub1',
    <UserOutlined />,
    [
      createMenuItem('/city-management', 'City', '6', <UserOutlined />),
      createMenuItem('/city-area-management', 'City Area', '7', <UserOutlined />),
      createMenuItem('/city-category-management', 'City Category', '8', <UserOutlined />)
    ],
    SubAdminRole.CITY
  ),
  createMenuItem(
    '/booking-management',
    'Booking Management',
    '9',
    <UserOutlined />,
    null,
    SubAdminRole.BOOKING
  ),
  createMenuItem(
    '/vendor-payment-management',
    'Vendor Payment',
    '29',
    <UserOutlined />,
    null,
    SubAdminRole.VENDOR_PAYMENT
  ),
  createMenuItem(
    '/payment-history-management',
    'Payment History Management',
    '39',
    <UserOutlined />,
    null,
    SubAdminRole.PAYMENT_HISTORY
  ),
  createMenuItem(
    '/sub-admin-management',
    'Sub Admin Management',
    '50',
    <UserOutlined />,
    null,
    SubAdminRole.ALL
  ),
  createMenuItem(
    '/vendor-management',
    'Vendor Management',
    '10',
    <UserOutlined />,
    null,
    SubAdminRole.VENDOR
  ),
  createMenuItem(
    '/customer-management',
    'Customer Management',
    '11',
    <UserOutlined />,
    null,
    SubAdminRole.CUSTOMER
  ),
  createMenuItem(
    '/vendor-duty-analytics',
    'Analytics',
    'sub4',
    <LineChartOutlined />,
    [
      createMenuItem(
        '/vendor-duty-analytics',
        'Vendor Duty Analytics',
        '51',
        <LineChartOutlined />
      ),
      createMenuItem(
        '/vendor-leads-analytics',
        'Vendor Leads Analytics',
        '52',
        <LineChartOutlined />
      )
    ],
    SubAdminRole.ANALYTICS
  ),
  createMenuItem(
    '/support-ticket-management',
    'Support Ticket Management',
    '43',
    <UserOutlined />,
    null,
    SubAdminRole.SUPPORT_TICKET
  ),
  createMenuItem('/review-management', 'Review', '28', <UserOutlined />, null, SubAdminRole.REVIEW),
  createMenuItem('/coupon-management', 'Coupon', '27', <UserOutlined />, null, SubAdminRole.COUPON),
  createMenuItem(
    '/seo-management',
    'SEO',
    'sub2',
    <UserOutlined />,
    [
      createMenuItem('/all-seo-management', 'All', '12', <UserOutlined />),
      createMenuItem('/city-seo-management', 'City', '13', <UserOutlined />),
      createMenuItem('/category-seo-management', 'Category', '14', <UserOutlined />),
      createMenuItem('/city-area-seo-management', 'City Area', '15', <UserOutlined />),
      createMenuItem('/city-category-seo-management', 'City Category', '16', <UserOutlined />),
      createMenuItem(
        '/category-service-seo-management',
        'Category Service',
        '17',
        <UserOutlined />
      ),
      createMenuItem(
        '/city-category-service-seo-management',
        'City Category Service',
        '18',
        <UserOutlined />
      ),
      createMenuItem(
        '/city-area-category-seo-management',
        'City Area Category',
        '19',
        <UserOutlined />
      ),
      createMenuItem(
        '/city-area-category-service-seo-management',
        'City Area Category Service',
        '20',
        <UserOutlined />
      )
    ],
    SubAdminRole.SEO
  ),
  createMenuItem(
    '/cms-management',
    'CMS Management',
    'sub3',
    <UserOutlined />,
    [
      createMenuItem('/terms-and-conditions', 'Terms And Conditions', '21', <UserOutlined />),
      createMenuItem(
        '/terms-and-conditions-vendor',
        'Terms And Conditions Vendor',
        '40',
        <UserOutlined />
      ),
      createMenuItem('/privacy-policy', 'Privacy Policy', '22', <UserOutlined />),
      createMenuItem('/about-us', 'About Us', '23', <UserOutlined />),
      createMenuItem('/faq-management', 'FAQ', '24', <UserOutlined />),
      createMenuItem('/contactUs-management', 'Contact Us', '25', <UserOutlined />),
      createMenuItem('/training-management', 'Training', '26', <UserOutlined />),
      createMenuItem('/video-management', 'Video Management', '41', <UserOutlined />),
      createMenuItem('/home-banner-management', 'Home Banner Management', '49', <UserOutlined />),
      createMenuItem('/insurance', 'Insurance', '42', <UserOutlined />)
    ],
    SubAdminRole.CMS
  )
];
function compareLinkAndReturnKey(items: any, currentPath: any): any {
  let activeLinkKey;
  for (const item of items) {
    if (item?.children && Array.isArray(item?.children) && item.children.length > 0) {
      activeLinkKey = compareLinkAndReturnKey(item.children, currentPath);
    } else if (
      item.link === currentPath ||
      item.link === currentPath.split('/').splice(0, 3).join('/') ||
      currentPath.includes(item)
    ) {
      activeLinkKey = item.key;
      break;
    } else {
      continue;
    }
  }
  return activeLinkKey;
}
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = authStore();
  const [collapsed, setCollapsed] = useState(true);

  const filteredItems = useMemo(() => {
    return items?.filter(
      (item) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        userData?.access?.includes(item?.type) || userData?.access?.includes(SubAdminRole.ALL)
    );
  }, [userData.access]);

  const activeTab = useMemo(() => {
    const activeLinkKey = compareLinkAndReturnKey(items, location?.pathname);
    if (activeLinkKey) {
      return [activeLinkKey];
    } else {
      return [
        items?.find((item) => item?.link?.split('/')[1] === location?.pathname?.split('/')[1])
          ?.key ?? filteredItems?.[0]?.key
      ];
    }
  }, [location?.pathname, filteredItems]);

  return (
    <StyledLayout.Sider
      collapsible
      breakpoint="lg"
      collapsed={collapsed}
      width={300}
      collapsedWidth={60}
      onCollapse={(collapsed) => {
        setCollapsed(collapsed);
      }}
      trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    >
      <div className="logoWrapper">
        {collapsed ? (
          <img className="logoSm" alt="Logo" src={toAbsoluteUrl('/asset/logo.svg')} />
        ) : (
          <img alt="Logo" src={toAbsoluteUrl('/asset/logo.svg')} />
        )}
      </div>
      <Menu
        theme="dark"
        className="sidebarMenu"
        defaultSelectedKeys={activeTab}
        mode="inline"
        onClick={({ item }: any) => navigate(item.props.link)}
        items={filteredItems}
      />
    </StyledLayout.Sider>
  );
};

export default Sidebar;
