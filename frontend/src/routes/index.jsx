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
const WEB_NAME = "FreshHarvest";

const RequiredAuth = ({ children, path }) => {
  const location = useLocation();
  // Fixed the token selector
  const token = useSelector((state) => state.auth?.token);

  if (!token) {
    return <Navigate to={path} state={{ from: location }} replace />;
  }

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
const loginPage = {
  path: ENDPOINTS.AUTH.LOGIN,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/auth/features/Login"))),
  title: `Login - ${WEB_NAME}`,
};
const cartPage = {
  path: ENDPOINTS.USER.CART,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/cart/features"))),
  title: `Cart - ${WEB_NAME}`,
};
const orderPage = {
  path: ENDPOINTS.USER.ORDER,
  Layout: MainLayout,
  component: lazy(() => delayRoute()(import("../modules/order/features"))),
  title: `Order - ${WEB_NAME}`,
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

// Các trang khác sẽ được thêm vào đây
export const privateRouteData = [];
export const publicRoutesData = [
  landingPage,
  contactPage,
  categoryPage,
  productDetailPage,
  loginPage,
  cartPage,
  orderPage,
  paymentSuccessPage,
  wishlistPage,
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
