import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    username: "",
    userType: "",
  });
  const location = useLocation();

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">User Profile</h1>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.username}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>User Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.userType}
                  readOnly
                />
              </div>
              {user.userType === "superadmin" && (
                <Link to="/createadmin" className="btn btn-primary">
                  Create Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
