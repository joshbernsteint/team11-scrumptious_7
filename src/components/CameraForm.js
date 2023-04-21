import React from "react";
import RequirePhotos from "./RequirePhotos";
import CameraAccess from "./CameraAccess";
import PermissionForm from "./PermissionForm";
import StripeContainer from "./StripeContainer";

function CameraForm() {
  return (
    <div>
      <div className="App">
        <RequirePhotos></RequirePhotos>
        <CameraAccess></CameraAccess>
        <PermissionForm></PermissionForm>
        <StripeContainer></StripeContainer>
      </div>
    </div>
  );
}

export default CameraForm;
