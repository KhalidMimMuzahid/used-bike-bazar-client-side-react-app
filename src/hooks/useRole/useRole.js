import { useEffect, useState } from "react";

const useRole = (userUid, useRoleRefreshwithToggle = false) => {
  // console.log("useruid", userUid, "roletoggle", useRoleRefreshwithToggle);
  console.log("useruid inside useRole ==", userUid);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [roleLoadingForUnSigned, setRoleLoadingForUnSigned] = useState(true);

  useEffect(() => {
    if (userUid) {
      fetch(`https://used-bike-bazar-server.vercel.app/role?userUid=${userUid}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data?.role);
          setRoleLoading(false);
          setRoleLoadingForUnSigned(false);
        });
    } else {
      setRole(null);
      setRoleLoadingForUnSigned(false);
    }
  }, [userUid, useRoleRefreshwithToggle]);
  console.log("role inside token ==", role);
  return [role, roleLoading, roleLoadingForUnSigned];
};
export default useRole;
