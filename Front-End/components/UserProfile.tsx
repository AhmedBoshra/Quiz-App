import React from "react";
import { ReactDOM } from "react";

const UserProfile = (props: any) => {
  return (
    <div>
      <h1>username: {props.username}</h1>
      <h2>userType: {props.userType}</h2>
    </div>
  );
};

export default UserProfile;
