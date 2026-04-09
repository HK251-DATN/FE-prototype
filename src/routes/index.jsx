/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Loading from "../components/Loading";
import RequiredPermission from "../components/RequiredPermission";
import { ENDPOINTS } from "./endPoints";
import LandingLayout from "../layouts/LandingLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../modules/error/features";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const WEB_NAME = "FreshHarvest";

const RequiredAuth = ({ children, path }) => {
  const location = useLocation();
  const token = useSelector((state) => state.auth?.token);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  console.log("RequiredAuth mounted:", {
    currentPath: location.pathname,
    hasToken: !!token,
    tokenValue: token ? token.substring(0, 20) + "..." : "NONE",
  });
  useEffect(() => {
    if (!token) {
      setIsRedirecting(true);
      toast.error("Bạn cần đăng nhập để truy cập trang này!", {
        autoClose: 1500,
        toastId: "auth-error",
      });
      // Tạo độ trễ trước khi chuyển trang (ví dụ 1.5 giây)
      const timer = setTimeout(() => {
        navigate(path, { state: { from: location }, replace: true });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [token, navigate, location, path]);

  if (!token) {
    console.warn(`No token found - Redirecting to ${path}`);

    // return <Navigate to={path} state={{ from: location }} replace />;
    return <Loading />;
  }

  console.log(`Token valid - Allowing access to ${location.pathname}`);
  return children;
};

RequiredAuth.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

const delayRoute = (ms = 500) => {
  return (promise) =>
    promise.then(
      (data) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(data), ms);
        }),
    );
};

// Routes configuration

const landingPage = {
  path: ENDPOINTS.INDEX.HOME,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/landing/features"))),
  title: WEB_NAME,
};
const contactPage = {
  path: ENDPOINTS.INDEX.CONTACT,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/contact/features"))),
  title: `Contact - ${WEB_NAME}`,
};
const categoryPage = {
  path: ENDPOINTS.INDEX.CATEGORY,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/category/features"))),
  title: `Category - ${WEB_NAME}`,
};
const productDetailPage = {
  path: ENDPOINTS.INDEX.PRODUCT_DETAIL,
  Layout: MainLayout,
  component: lazy(() =>
    delayRoute()(import("../modules/productDetail/features")),
  ),
  title: `Product Detail - ${WEB_NAME}`,
};
const productDetailPage2 = {
  path: ENDPOINTS.INDEX.PRODUCT_DETAIL_2,
  Layout: MainLayout,
  component: lazy(() =>
    delayRoute()(import("../modules/productDetail/features/indexOld")),
  ),
  title: `Product Detail2 - ${WEB_NAME}`,
};
const productDetailPage1 = {
  path: ENDPOINTS.INDEX.PRODUCT_DETAIL_1,
  Layout: MainLayout,
  component: lazy(() =>
    delayRoute()(import("../modules/productDetail/features/indexNew2")),
  ),
  title: `Product Detail1 - ${WEB_NAME}`,
};
const loginPage = {
  path: ENDPOINTS.AUTH.LOGIN,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/auth/features/Login"))),
  title: `Login - ${WEB_NAME}`,
};
const signupPage = {
  path: ENDPOINTS.AUTH.SIGNUP,
  Layout: MainLayout,
  component: lazy(() =>
    delayRoute()(import("../modules/auth/features/Signup")),
  ),
  title: `Signup - ${WEB_NAME}`,
};
const cartPage = {
  path: ENDPOINTS.USER.CART,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/cart/features"))),
  title: `Cart - ${WEB_NAME}`,
};
const orderingPage = {
  path: ENDPOINTS.USER.ORDERING,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/order/features"))),
  title: `Ordering - ${WEB_NAME}`,
};
const paymentSuccessPage = {
  path: ENDPOINTS.USER.PAYMENT_SUCCESS,
  Layout: MainLayout,
  component: lazy(() =>
    delayRoute()(import("../modules/successPayment/features")),
  ),
  title: `Payment Success - ${WEB_NAME}`,
};
const wishlistPage = {
  path: ENDPOINTS.USER.WISHLIST,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/wishlist/features"))),
  title: `Wishlist - ${WEB_NAME}`,
};
const userProfilePage = {
  path: ENDPOINTS.USER.PROFILE,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/profile/features"))),
  title: `User Profile - ${WEB_NAME}`,
};
const userPasswordPage = {
  path: ENDPOINTS.USER.PASSWORD,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/profile/features"))),
  title: `User Password - ${WEB_NAME}`,
};
const userAddressPage = {
  path: ENDPOINTS.USER.ADDRESS,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/profile/features"))),
  title: `User Address - ${WEB_NAME}`,
};
const userOrderPage = {
  path: ENDPOINTS.USER.ORDER,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/profile/features"))),
  title: `User Order - ${WEB_NAME}`,
};
const userVoucherPage = {
  path: ENDPOINTS.USER.VOUCHER,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/profile/features"))),
  title: `User Voucher - ${WEB_NAME}`,
};
const userFarmPage = {
  path: ENDPOINTS.USER.FARM,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/profile/features"))),
  title: `User Farm - ${WEB_NAME}`,
};

// Các trang khác sẽ được thêm vào đây
export const privateRouteData = [
  cartPage,
  orderingPage,
  paymentSuccessPage,
  wishlistPage,
  userProfilePage,
  userPasswordPage,
  userAddressPage,
  userOrderPage,
  userVoucherPage,
  userFarmPage,
];
export const publicRoutesData = [
  landingPage,
  contactPage,
  categoryPage,
  productDetailPage,
  productDetailPage2,
  productDetailPage1,
  loginPage,
  signupPage,
];

// Improved route rendering function
const renderRoutes = (routes, isPrivate = false) => {
  return routes.map((route, index) => {
    const {
      component: Component,
      path,
      Layout,
      requiredPermissions,
      ...rest
    } = route;

    const content = (
      <Suspense fallback={<Loading />}>
        {Layout ? (
          <Layout>
            <Component />
          </Layout>
        ) : (
          <Component />
        )}
      </Suspense>
    );

    let element = content;

    if (isPrivate) {
      element = (
        <RequiredAuth path={ENDPOINTS.AUTH.LOGIN}>
          {requiredPermissions ? (
            <RequiredPermission
              path={ENDPOINTS.USER.DASHBOARD}
              requiredPrivileges={requiredPermissions}
            >
              {content}
            </RequiredPermission>
          ) : (
            content
          )}
        </RequiredAuth>
      );
    }

    return (
      <Route
        {...rest}
        key={`${isPrivate ? "private" : "public"}-route-${index}`}
        path={path}
        element={element} // ✅ Fix: sử dụng biến element đã build đúng
      />
    );
  });
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes(publicRoutesData)}
        {renderRoutes(privateRouteData, true)}
        <Route
          path="*"
          element={
            <LandingLayout>
              <Suspense fallback={<Loading />}>
                <NotFoundPage />
              </Suspense>
            </LandingLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
