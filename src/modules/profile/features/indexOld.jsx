// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { logout } from "../../../store/slices/authSlice";
// import authService from "../../../services/authService";
// import { ENDPOINTS } from "../../../routes/endPoints";
// import "./profile.css";

// function Profile() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth?.user);
//   const token = useSelector((state) => state.auth?.token);

//   const [profile, setProfile] = useState(null);
//   const [groups, setGroups] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState("info");

//   const userId = user?.id;

//   useEffect(() => {
//     if (!userId || !token) {
//       toast.error("Vui lòng đăng nhập");
//       navigate(ENDPOINTS.AUTH.LOGIN);
//       return;
//     }
//     loadProfile();
//   }, [userId, token]);

//   const loadProfile = async () => {
//     setLoading(true);
//     try {
//       const response = await authService.getUser(userId);
//       if (response.type === "GOOD") {
//         setProfile(response.data);
//       }
//     } catch (error) {
//       console.error("Load profile error:", error);
//       toast.error("Không thể tải thông tin cá nhân");
//     }
//     setLoading(false);
//   };

//   const loadGroups = async () => {
//     try {
//       const response = await authService.getUserGroups(userId);
//       if (response.type === "GOOD") {
//         setGroups(response.data || []);
//       }
//     } catch (error) {
//       console.error("Load groups error:", error);
//     }
//   };

//   const loadPermissions = async () => {
//     try {
//       const response = await authService.getUserPermissions(userId);
//       if (response.type === "GOOD") {
//         setPermissions(response.data || []);
//       }
//     } catch (error) {
//       console.error("Load permissions error:", error);
//     }
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     if (tab === "groups" && groups.length === 0) loadGroups();
//     if (tab === "permissions" && permissions.length === 0) loadPermissions();
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     authService.logout();
//     toast.success("Đăng xuất thành công");
//     navigate(ENDPOINTS.AUTH.LOGIN);
//   };

//   if (loading) {
//     return <div className="profile-loading">Đang tải thông tin...</div>;
//   }

//   return (
//     <div className="profile-container">
//       {/* Sidebar */}
//       <aside className="profile-sidebar">
//         <div className="avatar">{user?.email?.[0].toUpperCase() || "?"}</div>
//         <h2 className="user-email">{user?.email}</h2>
//         <div className="user-id">ID #{userId}</div>

//         <nav className="sidebar-nav">
//           <button
//             className={`nav-item ${activeTab === "info" ? "active" : ""}`}
//             onClick={() => handleTabChange("info")}
//           >
//             👤 Thông tin
//           </button>
//           <button
//             className={`nav-item ${activeTab === "groups" ? "active" : ""}`}
//             onClick={() => handleTabChange("groups")}
//           >
//             👥 Nhóm
//           </button>
//           <button
//             className={`nav-item ${activeTab === "permissions" ? "active" : ""}`}
//             onClick={() => handleTabChange("permissions")}
//           >
//             🔑 Quyền hạn
//           </button>
//         </nav>

//         <button className="btn-logout" onClick={handleLogout}>
//           Đăng xuất
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="profile-main">
//         {/* Info Tab */}
//         {activeTab === "info" && (
//           <section className="tab-content">
//             <h3>Thông tin cá nhân</h3>
//             {profile ? (
//               <div className="info-grid">
//                 <div className="info-field">
//                   <label>Email</label>
//                   <span>{profile.userEmail || user?.email}</span>
//                 </div>
//                 <div className="info-field">
//                   <label>User ID</label>
//                   <span>#{profile.userId || userId}</span>
//                 </div>
//               </div>
//             ) : (
//               <p>Không có thông tin</p>
//             )}
//           </section>
//         )}

//         {/* Groups Tab */}
//         {activeTab === "groups" && (
//           <section className="tab-content">
//             <h3>Nhóm của tôi ({groups.length})</h3>
//             {groups.length === 0 ? (
//               <p className="empty-state">Bạn chưa thuộc nhóm nào</p>
//             ) : (
//               <ul className="groups-list">
//                 {groups.map((g) => (
//                   <li key={g.groupId} className="group-item">
//                     <strong>{g.groupName}</strong>
//                     {g.groupDes && <p>{g.groupDes}</p>}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </section>
//         )}

//         {/* Permissions Tab */}
//         {activeTab === "permissions" && (
//           <section className="tab-content">
//             <h3>Quyền hạn của tôi ({permissions.length})</h3>
//             {permissions.length === 0 ? (
//               <p className="empty-state">Không có quyền hạn nào</p>
//             ) : (
//               <div className="permissions-list">
//                 {permissions.map((p) => (
//                   <span key={p.perId} className="permission-tag">
//                     {p.perName}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }

// export default Profile;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../store/slices/authSlice";
import authService from "../../../services/authService";
import { ENDPOINTS } from "../../../routes/endPoints";
import {
  User,
  ClipboardList,
  Heart,
  ShoppingCart,
  Settings,
  LogOut,
  Users,
  Key,
  Camera,
} from "lucide-react";
import "./profile.css";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.token);

  const [activeTab, setActiveTab] = useState("info");
  const [groups, setGroups] = useState([]);
  const [permissions, setPermissions] = useState([]);

  // Mock data
  const [userData, setUserData] = useState({
    fullName: "Người dùng",
    email: user?.email || "user@gmail.com",
    phone: "0201 234 5678",
    address: "123 Đường ABC, Thành phố HCM",
    avatar: "https://ui-avatars.com/api/?name=" + (user?.email || "User"),
  });

  // Mock order history
  const [orderHistory] = useState([
    {
      id: "#738",
      date: "9 Tháng 9, 2020",
      total: "$135.00 (5 sản phẩm)",
      status: "Đang xử lý",
      statusColor: "processing",
    },
    {
      id: "#703",
      date: "24 Tháng 5, 2020",
      total: "$25.00 (1 sản phẩm)",
      status: "Đang giao",
      statusColor: "shipping",
    },
    {
      id: "#130",
      date: "22 Tháng 10, 2020",
      total: "$250.00 (4 sản phẩm)",
      status: "Hoàn thành",
      statusColor: "completed",
    },
    {
      id: "#561",
      date: "1 Tháng 2, 2020",
      total: "$35.00 (1 sản phẩm)",
      status: "Hoàn thành",
      statusColor: "completed",
    },
  ]);

  // Mock recent updates
  const [recentUpdates] = useState([
    {
      title: "Hóa đơn mới",
      description: "Bạn nhận được hóa đơn từ đơn hàng #745",
      time: "2 giờ trước",
      type: "invoice",
    },
    {
      title: "Đơn hàng được xác nhận",
      description: "Đơn hàng #738 đã được xác nhận",
      time: "1 ngày trước",
      type: "order",
    },
  ]);

  const userId = user?.id;

  useEffect(() => {
    if (!userId || !token) {
      toast.error("Vui lòng đăng nhập");
      navigate(ENDPOINTS.AUTH.LOGIN);
      return;
    }
    loadUserData();
  }, [userId, token]);

  const loadUserData = async () => {
    try {
      // Gọi API để lấy thông tin user
      const response = await authService.getUser(userId);
      if (response.type === "GOOD") {
        // Cập nhật fullName từ email nếu không có
        setUserData((prev) => ({
          ...prev,
          email: response.data?.userEmail || user?.email,
        }));
      }
    } catch (error) {
      console.error("Load user data error:", error);
    }
  };

  const loadGroups = async () => {
    try {
      const response = await authService.getUserGroups(userId);
      if (response.type === "GOOD") {
        setGroups(response.data || []);
      }
    } catch (error) {
      console.error("Load groups error:", error);
    }
  };

  const loadPermissions = async () => {
    try {
      const response = await authService.getUserPermissions(userId);
      if (response.type === "GOOD") {
        setPermissions(response.data || []);
      }
    } catch (error) {
      console.error("Load permissions error:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "groups" && groups.length === 0) loadGroups();
    if (tab === "permissions" && permissions.length === 0) loadPermissions();
    if (tab === "orders") {
      // Orders tab không cần load vì đã có mock data
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    authService.logout();
    toast.success("Đăng xuất thành công");
    navigate(ENDPOINTS.AUTH.LOGIN);
  };

  return (
    <div className="profile-wrapper">
      {/* Sidebar Navigation */}
      <aside className="profile-sidebar">
        <nav className="sidebar-menu">
          <button
            className={`menu-item ${activeTab === "info" ? "active" : ""}`}
            onClick={() => handleTabChange("info")}
          >
            <User size={20} className="menu-icon" />
            <span>Thông tin cá nhân</span>
          </button>
          <button
            className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => handleTabChange("orders")}
          >
            <ClipboardList size={20} className="menu-icon" />
            <span>Lịch sử đơn hàng</span>
          </button>

          <button
            className={`menu-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => handleTabChange("settings")}
          >
            <Settings size={20} className="menu-icon" />
            <span>Cài đặt</span>
          </button>
          <button className="menu-item logout" onClick={handleLogout}>
            <LogOut size={20} className="menu-icon" />
            <span>Đăng xuất</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="profile-main">
        {/* Thông tin Tài khoản */}
        {activeTab === "info" && (
          <div className="profile-content">
            <h2 className="section-title">Thông tin tài khoản</h2>

            <div className="account-grid">
              {/* Left: Account Info */}
              <div className="account-info">
                <div className="form-group">
                  <label>Họ</label>
                  <input
                    type="text"
                    value="Người"
                    readOnly
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Tên</label>
                  <input
                    type="text"
                    value="Dùng"
                    readOnly
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Số tháng / Thời gian mua</label>
                  <input
                    type="text"
                    value="Mới"
                    readOnly
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    readOnly
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    value={userData.phone}
                    readOnly
                    className="form-input"
                  />
                </div>

                <button className="btn-save">Lưu thay đổi</button>
              </div>

              {/* Right: Avatar */}
              <div className="account-avatar">
                <div className="avatar-container">
                  <img
                    src={userData.avatar}
                    alt="Avatar"
                    className="avatar-img"
                  />
                </div>
                <button className="btn-change-image">Thay đổi ảnh</button>
              </div>
            </div>
          </div>
        )}

        {/* Lịch sử Đơn hàng */}
        {activeTab === "orders" && (
          <div className="profile-content">
            <div className="orders-header">
              <h2 className="section-title">Lịch sử đơn hàng</h2>
              {/* <a href="/user/order" className="view-all-link">
                Xem tất cả
              </a> */}
            </div>

            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>MÃ ĐƠN HÀNG</th>
                    <th>NGÀY</th>
                    <th>TỔNG CỘNG</th>
                    <th>TRẠNG THÁI</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.total}</td>
                      <td>
                        <span className={`status-badge ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cài đặt */}
        {activeTab === "settings" && (
          <div className="profile-content">
            <h2 className="section-title">Thay đổi mật khẩu</h2>

            <div className="password-section">
              <div className="form-group">
                <label>Mật khẩu hiện tại</label>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="form-input"
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Mật khẩu mới</label>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="form-input"
                  />
                </div>
              </div>

              <button className="btn-change-password">Thay đổi mật khẩu</button>
            </div>
          </div>
        )}

        {/* Nhóm */}
        {activeTab === "groups" && (
          <div className="profile-content">
            <h2 className="section-title">Nhóm của tôi</h2>
            {groups.length === 0 ? (
              <div className="empty-state">
                <p>👥 Bạn chưa thuộc nhóm nào</p>
              </div>
            ) : (
              <div className="groups-list">
                {groups.map((g) => (
                  <div key={g.groupId} className="group-card">
                    <strong>{g.groupName}</strong>
                    {g.groupDes && <p>{g.groupDes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quyền hạn */}
        {activeTab === "permissions" && (
          <div className="profile-content">
            <h2 className="section-title">Quyền hạn của tôi</h2>
            {permissions.length === 0 ? (
              <div className="empty-state">
                <p>🔑 Không có quyền hạn nào</p>
              </div>
            ) : (
              <div className="permissions-tags">
                {permissions.map((p) => (
                  <span key={p.perId} className="permission-tag">
                    {p.perName}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;
