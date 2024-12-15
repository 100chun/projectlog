import React, { useEffect, useState } from "react";

const UserStatus = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  return (
    <div>
      {userId ? (
        <p>Logged in as: {userId}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};

export default UserStatus;