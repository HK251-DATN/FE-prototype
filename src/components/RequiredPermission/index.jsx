import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ENDPOINTS } from "../../routes/endPoints";

const RequiredPermission = ({ children, path, requiredPrivileges = [] }) => {
  const location = useLocation();
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [checked, setChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!token) return;

    if (requiredPrivileges.length > 0) {
      const userPrivileges = user?.scope?.split(" ") || [];
      const granted = requiredPrivileges.every((priv) =>
        userPrivileges.includes(priv),
      );
      setHasAccess(granted);

      if (!granted) {
        import("react-toastify").then(({ toast }) =>
          toast.error("No access to this page!"),
        );
      }
    } else {
      setHasAccess(true);
    }

    setChecked(true);
  }, [token, requiredPrivileges]);

  if (!token) {
    return <Navigate to={path} state={{ from: location }} replace />;
  }

  if (!checked) return null; // Chờ kiểm tra xong mới render children

  if (!hasAccess) {
    return <Navigate to={ENDPOINTS.USER.DASHBOARD} replace />;
  }

  return children;
};

export default RequiredPermission;

// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// function RequiredPermission({ children, requiredPrivileges, path }) {
//   const location = useLocation();
//   const userPermissions = useSelector((state) => state.auth?.permissions || []);

//   // Nếu không có quyền yêu cầu
//   if (
//     requiredPrivileges &&
//     !requiredPrivileges.every((perm) =>
//       userPermissions.some((up) => up.per_code === perm),
//     )
//   ) {
//     toast.error("Bạn không có quyền truy cập trang này");
//     return <Navigate to={path} state={{ from: location }} replace />;
//   }

//   return children;
// }

// export default RequiredPermission;
