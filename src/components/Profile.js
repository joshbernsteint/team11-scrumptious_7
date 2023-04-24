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
  let spaTra = props.spaTranslation;
  return (
    <div>
      <h1>Profile</h1>
      <p>UID: {uid}</p>
      <AuthDetails spaTranslation={spaTra} />
    </div>
  );
};

export default Profile;
