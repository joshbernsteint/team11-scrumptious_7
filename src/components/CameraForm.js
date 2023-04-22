import React from "react";
import RequirePhotos from "./RequirePhotos";
import CameraAccess from "./CameraAccess";
import PermissionForm from "./PermissionForm";
import StripeContainer from "./StripeContainer";

function CameraForm(props) {
  return (
    <div>
      <div className="App">
        <RequirePhotos spaTranslation = {props.spaTranslation}></RequirePhotos>
        <CameraAccess spaTranslation = {props.spaTranslation}> </CameraAccess>
        <PermissionForm spaTranslation = {props.spaTranslation}></PermissionForm>
        <StripeContainer></StripeContainer>
      </div>
    </div>
  );
}

export default CameraForm;
