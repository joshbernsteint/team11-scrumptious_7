import React, { useRef, useEffect, useState } from "react";
import RequirePhotos from "./RequirePhotos";
import CameraAccess from "./CameraAccess";
import PermissionForm from "./PermissionForm";

function CameraForm() {
  return (
    <div>
      <div className="require-div">
        <RequirePhotos></RequirePhotos>
        <CameraAccess></CameraAccess>
        <PermissionForm></PermissionForm>
      </div>
    </div>
  );
}

export default CameraForm;
