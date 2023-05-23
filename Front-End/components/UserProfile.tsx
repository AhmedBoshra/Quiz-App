import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    username: "",
    userType: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { username, userType } = location.state;
      setUser({
        username,
        userType,
      });
    }
  }, [location.state]);

  return (
    <div>
      <h1>username: {user.username}</h1>
      <h1>usertype: {user.userType}</h1>
    </div>
  );
};

export default UserProfile;
