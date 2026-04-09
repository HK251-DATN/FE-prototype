import { useState } from "react";
import AccountSidebar from "@/modules/profile/components/account/AccountSidebar";
import ProfileSection from "@/modules/profile/components/account/ProfileSection";
import PasswordSection from "@/modules/profile/components/account/PasswordSection";
import AddressSection from "@/modules/profile/components/account/AddressSection";
import OrdersSection from "@/modules/profile/components/account/OrderSection";
import VoucherSection from "@/modules/profile/components/account/VoucherSection";
import FarmSection from "@/modules/profile/components/account/FarmSection";
import { Outlet, useLocation } from "react-router-dom";

const Account = () => {
  // const [activeTab, setActiveTab] = useState("profile");
  const location = useLocation();
  const activeTab = location.pathname.split("/").pop();
  const renderContent = () => {
    if (location.pathname.includes("/profile")) return <ProfileSection />;
    if (location.pathname.includes("/password")) return <PasswordSection />;
    if (location.pathname.includes("/address")) return <AddressSection />;
    if (location.pathname.includes("/order")) return <OrdersSection />;
    if (location.pathname.includes("/voucher")) return <VoucherSection />;
    if (location.pathname.includes("/farm")) return <FarmSection />;
    return <ProfileSection />;
  };
  return (
    <div className="min-h-screen bg-background bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <AccountSidebar activeTab={activeTab} />
          <div className="flex-1 min-w-0">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
