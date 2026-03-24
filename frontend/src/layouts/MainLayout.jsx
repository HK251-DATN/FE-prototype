import PropTypes from "prop-types";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Navigation />

      {/* <Breadcrumbs items={breadcrumbs} /> */}

      {/* Main content */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired, // hoặc .optional nếu bạn muốn không bắt buộc
};
