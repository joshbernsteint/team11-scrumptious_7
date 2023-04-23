import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AuthDetails from "./AuthDetails";

const Profile = (props) => {
  const { uid } = props;

  return (
    <div>
      <h1>Profile</h1>
      <p>UID: {uid}</p>
      <AuthDetails />
    </div>
  );
};

export default Profile;
