import React, { useRef, useEffect, useState } from "react";
import RequirePhotos from "./RequirePhotos";
import CameraAccess from "./CameraAccess";
import PermissionForm from "./PermissionForm";

function CameraForm() {
  return (
    <div>
      <div className="require-div">
        <RequirePhotos></RequirePhotos>
      </div>
        <CameraAccess></CameraAccess>
        <PermissionForm></PermissionForm>
    </div>
  );
}

export default CameraForm;
