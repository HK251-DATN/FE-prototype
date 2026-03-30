import { useState } from "react";
import AccountSidebar from "../components/AccountSidebar";
import ProfileSection from "../components/ProfileSection";
import PasswordSection from "../components/PasswordSection";
import AddressSection from "../components/account/AddressSection";
import OrdersSection from "../components/account/OrderSection";
import VoucherSection from "../components/account/VoucherSection";
import FarmSection from "../components/account/FarmSection";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "password":
        return <PasswordSection />;
      case "addresses":
        return <AddressSection />;
      case "orders":
        return <OrdersSection />;
      case "vouchers":
        return <VoucherSection />;
      case "farms":
        return <FarmSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 min-w-0">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
