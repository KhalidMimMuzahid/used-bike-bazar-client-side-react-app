import { useEffect, useState } from "react";

const useRole = (userUid) => {
  const [role, setRole] = useState("buyer");
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (userUid) {
      fetch(`http://localhost:5000/role?userUid=${userUid}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data?.role);
          setRoleLoading(false);
        });
    }
  }, [userUid]);
  return [role, roleLoading];
};
export default useRole;
