import { lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthGuard from 'components/common/AuthGuard';
import ProtectedRoute from 'components/common/ProtectedRoute';

import { authStore } from 'services/store/auth';

import { SubAdminRole } from 'utils/constants';
// import AuthGuard from '../components/common/AuthGuard';
import { ROUTES } from 'utils/constants/routes';
import { renderRoute } from 'utils/functions';

const Layout = lazy(() => import('../components/layout'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const SignIn = lazy(() => import('./Auth/Modules/SignIn'));
const ForgotPassword = lazy(() => import('./Auth/Modules/ForgotPassword'));
const ResetPassword = lazy(() => import('./Auth/Modules/ResetPassword'));
const ChangePassword = lazy(() => import('./Auth/Modules/ChangePassword'));
const Dashboard = lazy(() => import('./Dashboard'));
const VendorDutyAnalytics = lazy(() => import('./Analytics/VendorDutyAnalytics'));
const VendorLeadsAnalytics = lazy(() => import('./Analytics/VendorLeadsAnalytics'));
const TermsAndCondition = lazy(() => import('./CMSManagement/Module/TermsAndConditions'));
const TermsAndConditionVendor = lazy(
  () => import('./CMSManagement/Module/TermsAndConditionsVendor')
);
const Insurance = lazy(() => import('./CMSManagement/Module/Insurance'));
const PrivacyPolicy = lazy(() => import('./CMSManagement/Module/PrivacyPolicy'));
const CategoryManagement = lazy(() => import('./CategoryManagement'));
const AddCategory = lazy(() => import('./CategoryManagement/AddCategory'));
const EditCategory = lazy(() => import('./CategoryManagement/EditCategory'));
const ViewCategory = lazy(() => import('./CategoryManagement/ViewCategory'));
const ServiceManagement = lazy(() => import('./ServiceManagement'));
const AddService = lazy(() => import('./ServiceManagement/AddService'));
const EditService = lazy(() => import('./ServiceManagement/EditService'));
const ViewService = lazy(() => import('./ServiceManagement/ViewService'));
const CityManagement = lazy(() => import('./City/CityManagement'));
const AddCity = lazy(() => import('./City/CityManagement/AddCity'));
const EditCity = lazy(() => import('./City/CityManagement/EditCity'));
const ViewCity = lazy(() => import('./City/CityManagement/ViewCity'));
const CityAreaManagement = lazy(() => import('./City/CityAreaManagement'));
const AddCityArea = lazy(() => import('./City/CityAreaManagement/AddCityArea'));
const EditCityArea = lazy(() => import('./City/CityAreaManagement/EditCityArea'));
const ViewCityArea = lazy(() => import('./City/CityAreaManagement/ViewCityArea'));
const CityCategoryManagement = lazy(() => import('./City/CityCategoryManagement'));
const AddCityCategory = lazy(() => import('./City/CityCategoryManagement/AddCityCategory'));
const EditCityCategory = lazy(() => import('./City/CityCategoryManagement/EditCityCategory'));
const ViewCityCategory = lazy(() => import('./City/CityCategoryManagement/ViewCityCategory'));
const VendorManagement = lazy(() => import('./VendorManagement'));
const AddVendor = lazy(() => import('./VendorManagement/AddVendor'));
const EditVendor = lazy(() => import('./VendorManagement/EditVendor'));
const ViewVendor = lazy(() => import('./VendorManagement/ViewVendor'));
const CustomerManagement = lazy(() => import('./CustomerManagement'));
const AddCustomer = lazy(() => import('./CustomerManagement/AddCustomer'));
const EditCustomer = lazy(() => import('./CustomerManagement/EditCustomer'));
const ViewCustomer = lazy(() => import('./CustomerManagement/ViewCustomer'));
const FaqManagement = lazy(() => import('./CMSManagement/Module/FaqManagement'));
const ContactUsManagement = lazy(() => import('./CMSManagement/Module/ContactUsManagement'));
const ViewFaq = lazy(() => import('./CMSManagement/Module/FaqManagement/ViewFaq'));
const EditFaq = lazy(() => import('./CMSManagement/Module/FaqManagement/EditFaq'));
const AddFaq = lazy(() => import('./CMSManagement/Module/FaqManagement/AddFaq'));
const ViewContact = lazy(() => import('./CMSManagement/Module/ContactUsManagement/ViewContact'));
const EditContact = lazy(() => import('./CMSManagement/Module/ContactUsManagement/EditContact'));
const TrainingManagement = lazy(() => import('./CMSManagement/Module/TrainingManagement'));
const AddTraining = lazy(() => import('./CMSManagement/Module/TrainingManagement/AddTraining'));
const ViewTraining = lazy(() => import('./CMSManagement/Module/TrainingManagement/ViewTraining'));
const EditTraining = lazy(() => import('./CMSManagement/Module/TrainingManagement/EditTraining'));
const AddCitySeoManagement = lazy(() => import('./SeoManagement/AddCitySeo'));
const AddCategorySeoManagement = lazy(() => import('./SeoManagement/AddCategorySeo'));
const AddCityAreaSeoManagement = lazy(() => import('./SeoManagement/AddCityAreaSeo'));
const AddCityCategorySeoManagement = lazy(() => import('./SeoManagement/AddCityCategorySeo'));
const AddCategoryServiceSeoManagement = lazy(() => import('./SeoManagement/AddCategoryServiceSeo'));
const AddCityCategoryServiceSeoManagement = lazy(
  () => import('./SeoManagement/AddCityCategoryServiceSeo')
);
const AddCityAreaCategorySeoManagement = lazy(
  () => import('./SeoManagement/AddCityAreaCategorySeo')
);
const AddCityAreaCategoryServiceSeoManagement = lazy(
  () => import('./SeoManagement/AddCityAreaCategoryServiceSeo')
);
const AddAllSeoManagement = lazy(() => import('./SeoManagement/AddAllSeo'));
const SubCategoryManagement = lazy(() => import('./SubCategoryManagement'));
const AddSubCategory = lazy(() => import('./SubCategoryManagement/AddSubCategory'));
const EditSubCategory = lazy(() => import('./SubCategoryManagement/EditSubCategory'));
const ViewSubCategory = lazy(() => import('./SubCategoryManagement/ViewSubCategory'));
const SubServiceManagement = lazy(() => import('./SubServiceManagement'));
const AddSubService = lazy(() => import('./SubServiceManagement/AddSubService'));
const EditSubService = lazy(() => import('./SubServiceManagement/EditSubService'));
const ViewSubService = lazy(() => import('./SubServiceManagement/ViewSubService'));
const ViewBooking = lazy(() => import('./BookingManagement/ViewBooking'));
const BookingManagement = lazy(() => import('./BookingManagement'));
const ViewPaymentHistory = lazy(() => import('./PaymentHistoryManagement/ViewPaymentHistory'));
const PaymentHistoryManagement = lazy(() => import('./PaymentHistoryManagement'));
const ReviewManagement = lazy(() => import('./ReviewManagement'));
const ViewReview = lazy(() => import('./ReviewManagement/ViewReview'));
const AddReview = lazy(() => import('./ReviewManagement/AddReview'));
const EditReview = lazy(() => import('./ReviewManagement/EditReview'));
const CouponManagement = lazy(() => import('./CouponManagement'));
const ViewCoupon = lazy(() => import('./CouponManagement/ViewCoupon'));
const AddCoupon = lazy(() => import('./CouponManagement/AddCoupon'));
const EditCoupon = lazy(() => import('./CouponManagement/EditCoupon'));
const AboutUs = lazy(() => import('./CMSManagement/Module/AboutUs'));
const VendorPaymentManagement = lazy(() => import('./VendorPaymentManagement'));
const ViewVendorPayment = lazy(() => import('./VendorPaymentManagement/ViewVendorPayment/'));
const SubAdminManagement = lazy(() => import('./SubAdminManagement'));
const AddSubAdmin = lazy(() => import('./SubAdminManagement/AddSubAdmin'));
const EditSubAdmin = lazy(() => import('./SubAdminManagement/EditSubAdmin'));
const ViewSubAdmin = lazy(() => import('./SubAdminManagement/ViewSubAdmin'));
const VideoManagement = lazy(() => import('./CMSManagement/Module/VideoManagement'));
const AddVideo = lazy(() => import('./CMSManagement/Module/VideoManagement/AddVideo'));
const EditVideo = lazy(() => import('./CMSManagement/Module/VideoManagement/EditVideo'));
const ViewVideo = lazy(() => import('./CMSManagement/Module/VideoManagement/ViewVideo'));
const HomeBannerManagement = lazy(() => import('./CMSManagement/Module/HomeBannerManagement'));
const AddHomeBanner = lazy(
  () => import('./CMSManagement/Module/HomeBannerManagement/AddHomeBanner')
);
const EditHomeBanner = lazy(
  () => import('./CMSManagement/Module/HomeBannerManagement/EditHomeBanner')
);
const ViewHomeBanner = lazy(
  () => import('./CMSManagement/Module/HomeBannerManagement/ViewHomeBanner')
);
const SupportTicketManagement = lazy(() => import('./SupportTicketManagement'));

const Routing = () => {
  const { userData } = authStore();

  const [defaultRoute, setDefaultRoute] = useState<any>();

  useEffect(() => {
    if (userData?.access?.length) {
      const getInitialRoute = renderRoute(userData?.access);
      setDefaultRoute(getInitialRoute);
    }
  }, [userData?.access]);

  return (
    <Routes>
      <Route path={ROUTES.signIn} element={<SignIn />} />
      <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
      <Route path={ROUTES.resetPassword(':token')} element={<ResetPassword />} />
      <Route
        path={ROUTES.default}
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route path={ROUTES.pageNotFound} element={<PageNotFound />} />
        <Route path={ROUTES.changePassword} element={<ChangePassword />} />
        <Route
          path={ROUTES.dashboard}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.DASHBOARD} element={<Dashboard />} />
          }
        />
        <Route
          path={ROUTES.vendorDutyAnalytics}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.ANALYTICS}
              element={<VendorDutyAnalytics />}
            />
          }
        />
        <Route
          path={ROUTES.vendorLeadsAnalytics}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.ANALYTICS}
              element={<VendorLeadsAnalytics />}
            />
          }
        />
        <Route
          path={ROUTES.termsAndConditions}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<TermsAndCondition />} />
          }
        />
        <Route
          path={ROUTES.termsAndConditionsVendor}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.CMS}
              element={<TermsAndConditionVendor />}
            />
          }
        />
        <Route
          path={ROUTES.insurance}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<Insurance />} />}
        />
        <Route
          path={ROUTES.privacyPolicy}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<PrivacyPolicy />} />}
        />

        <Route
          path={ROUTES.categoryManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SERVICE}
              element={<CategoryManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addCategory}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<AddCategory />} />
          }
        />
        <Route
          path={ROUTES.editCategory(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<EditCategory />} />
          }
        />
        <Route
          path={ROUTES.viewCategory(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<ViewCategory />} />
          }
        />
        <Route
          path={ROUTES.serviceManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<ServiceManagement />} />
          }
        />
        <Route
          path={ROUTES.addService}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<AddService />} />
          }
        />
        <Route
          path={ROUTES.editService(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<EditService />} />
          }
        />
        <Route
          path={ROUTES.viewService(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<ViewService />} />
          }
        />
        <Route
          path={ROUTES.cityManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<CityManagement />} />
          }
        />
        <Route
          path={ROUTES.addCity}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<AddCity />} />}
        />
        <Route
          path={ROUTES.editCity(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<EditCity />} />}
        />
        <Route
          path={ROUTES.viewCity(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<ViewCity />} />}
        />
        <Route
          path={ROUTES.cityAreaManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<CityAreaManagement />} />
          }
        />
        <Route
          path={ROUTES.addCityArea}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<AddCityArea />} />}
        />
        <Route
          path={ROUTES.editCityArea(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<EditCityArea />} />}
        />
        <Route
          path={ROUTES.viewCityArea(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<ViewCityArea />} />}
        />
        <Route
          path={ROUTES.cityCategoryManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.CITY}
              element={<CityCategoryManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addCityCategory}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<AddCityCategory />} />
          }
        />
        <Route
          path={ROUTES.editCityCategory(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<EditCityCategory />} />
          }
        />
        <Route
          path={ROUTES.viewCityCategory(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CITY} element={<ViewCityCategory />} />
          }
        />
        <Route
          path={ROUTES.viewFaq(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<ViewFaq />} />}
        />
        <Route
          path={ROUTES.editFaq(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<EditFaq />} />}
        />
        <Route
          path={ROUTES.supportTicket}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SUPPORT_TICKET}
              element={<SupportTicketManagement />}
            />
          }
        />
        <Route
          path={ROUTES.vendorManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.VENDOR} element={<VendorManagement />} />
          }
        />
        <Route
          path={ROUTES.addVendor}
          element={<ProtectedRoute requiredAccess={SubAdminRole.VENDOR} element={<AddVendor />} />}
        />
        <Route
          path={ROUTES.editVendor(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.VENDOR} element={<EditVendor />} />}
        />
        <Route
          path={ROUTES.viewVendor(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.VENDOR} element={<ViewVendor />} />}
        />
        <Route
          path={ROUTES.customerManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.CUSTOMER}
              element={<CustomerManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addCustomer}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CUSTOMER} element={<AddCustomer />} />
          }
        />
        <Route
          path={ROUTES.editCustomer}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CUSTOMER} element={<EditCustomer />} />
          }
        />
        <Route
          path={ROUTES.viewCustomer(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CUSTOMER} element={<ViewCustomer />} />
          }
        />
        <Route
          path={ROUTES.faqManagement}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<FaqManagement />} />}
        />
        <Route
          path={ROUTES.addFaq}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<AddFaq />} />}
        />
        <Route
          path={ROUTES.contactUsManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<ContactUsManagement />} />
          }
        />
        <Route
          path={ROUTES.viewContactUs(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<ViewContact />} />}
        />
        <Route
          path={ROUTES.editContactUs(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<EditContact />} />}
        />
        <Route
          path={ROUTES.trainingManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<TrainingManagement />} />
          }
        />
        <Route
          path={ROUTES.viewTraining(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<ViewTraining />} />}
        />
        <Route
          path={ROUTES.editTraining(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<EditTraining />} />}
        />
        <Route
          path={ROUTES.addTraining}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<AddTraining />} />}
        />
        <Route
          path={ROUTES.addAllSeoManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SEO} element={<AddAllSeoManagement />} />
          }
        />
        <Route
          path={ROUTES.addCitySeoManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SEO} element={<AddCitySeoManagement />} />
          }
        />
        <Route
          path={ROUTES.addCategorySeoManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SEO}
              element={<AddCategorySeoManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addCityAreaSeoManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SEO}
              element={<AddCityAreaSeoManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addCityCategorySeoManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SEO}
              element={<AddCityCategorySeoManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addCategoryServiceSeoManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SEO}
              element={<AddCategoryServiceSeoManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addCityCategoryServiceSeoManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SEO}
              element={<AddCityCategoryServiceSeoManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addCityAreaCategorySeoManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SEO}
              element={<AddCityAreaCategorySeoManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addCityAreaCategoryServiceSeoManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SEO}
              element={<AddCityAreaCategoryServiceSeoManagement />}
            />
          }
        />
        <Route
          path={ROUTES.subCategoryManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SERVICE}
              element={<SubCategoryManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addSubCategory}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<AddSubCategory />} />
          }
        />
        <Route
          path={ROUTES.editSubCategory(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<EditSubCategory />} />
          }
        />
        <Route
          path={ROUTES.viewSubCategory(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<ViewSubCategory />} />
          }
        />
        <Route
          path={ROUTES.subServiceManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.SERVICE}
              element={<SubServiceManagement />}
            />
          }
        />
        <Route
          path={ROUTES.addSubService}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<AddSubService />} />
          }
        />
        <Route
          path={ROUTES.editSubService(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<EditSubService />} />
          }
        />
        <Route
          path={ROUTES.viewSubService(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.SERVICE} element={<ViewSubService />} />
          }
        />
        <Route
          path={ROUTES.bookingManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.BOOKING} element={<BookingManagement />} />
          }
        />
        <Route
          path={ROUTES.viewBooking(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.BOOKING} element={<ViewBooking />} />
          }
        />
        <Route
          path={ROUTES.paymentHistoryManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.PAYMENT_HISTORY}
              element={<PaymentHistoryManagement />}
            />
          }
        />
        <Route
          path={ROUTES.viewPaymentHistory(':_id')}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.PAYMENT_HISTORY}
              element={<ViewPaymentHistory />}
            />
          }
        />
        <Route
          path={ROUTES.reviewManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.REVIEW} element={<ReviewManagement />} />
          }
        />
        <Route
          path={ROUTES.viewReview(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.REVIEW} element={<ViewReview />} />}
        />
        <Route
          path={ROUTES.editReview(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.REVIEW} element={<EditReview />} />}
        />
        <Route
          path={ROUTES.addReview}
          element={<ProtectedRoute requiredAccess={SubAdminRole.REVIEW} element={<AddReview />} />}
        />
        <Route
          path={ROUTES.couponManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.COUPON} element={<CouponManagement />} />
          }
        />
        <Route
          path={ROUTES.viewCoupon(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.COUPON} element={<ViewCoupon />} />}
        />
        <Route
          path={ROUTES.editCoupon(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.COUPON} element={<EditCoupon />} />}
        />
        <Route
          path={ROUTES.addCoupon}
          element={<ProtectedRoute requiredAccess={SubAdminRole.COUPON} element={<AddCoupon />} />}
        />
        <Route
          path={ROUTES.aboutUs}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<AboutUs />} />}
        />
        <Route
          path={ROUTES.vendorPaymentManagement}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.VENDOR_PAYMENT}
              element={<VendorPaymentManagement />}
            />
          }
        />
        <Route
          path={ROUTES.viewVendorPayment(':_id')}
          element={
            <ProtectedRoute
              requiredAccess={SubAdminRole.VENDOR_PAYMENT}
              element={<ViewVendorPayment />}
            />
          }
        />
        <Route
          path={ROUTES.subAdminManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.ALL} element={<SubAdminManagement />} />
          }
        />
        <Route
          path={ROUTES.addSubAdmin}
          element={<ProtectedRoute requiredAccess={SubAdminRole.ALL} element={<AddSubAdmin />} />}
        />
        <Route
          path={ROUTES.editSubAdmin(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.ALL} element={<EditSubAdmin />} />}
        />
        <Route
          path={ROUTES.viewSubAdmin(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.ALL} element={<ViewSubAdmin />} />}
        />
        <Route
          path={ROUTES.videoManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<VideoManagement />} />
          }
        />
        <Route
          path={ROUTES.addVideo}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<AddVideo />} />}
        />
        <Route
          path={ROUTES.editVideo(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<EditVideo />} />}
        />
        <Route
          path={ROUTES.viewVideo(':_id')}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<ViewVideo />} />}
        />
        <Route
          path={ROUTES.homeBannerManagement}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<HomeBannerManagement />} />
          }
        />
        <Route
          path={ROUTES.addHomeBanner}
          element={<ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<AddHomeBanner />} />}
        />
        <Route
          path={ROUTES.editHomeBanner(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<EditHomeBanner />} />
          }
        />
        <Route
          path={ROUTES.viewHomeBanner(':_id')}
          element={
            <ProtectedRoute requiredAccess={SubAdminRole.CMS} element={<ViewHomeBanner />} />
          }
        />
        <Route path={ROUTES.default} element={<Navigate replace to={defaultRoute} />} />
        <Route path="*" element={<Navigate replace to={ROUTES.pageNotFound} />} />
      </Route>
      <Route path="*" element={<Navigate replace to={ROUTES.default} />} />
    </Routes>
  );
};

export default Routing;
