import React, { useRef, useEffect, useState } from "react";
import RequirePhotos from "./RequirePhotos";
import CameraAccess from "./CameraAccess";
import PermissionForm from "./PermissionForm";

function CameraForm(props) {
  return (
    <div>
      <div className="require-div">
        <RequirePhotos spaTranslation = {props.spaTranslation}></RequirePhotos>
        <CameraAccess spaTranslation = {props.spaTranslation}> </CameraAccess>
        <PermissionForm spaTranslation = {props.spaTranslation}></PermissionForm>
      </div>
    </div>
  );
}

export default CameraForm;
