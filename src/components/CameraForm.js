import React, { useRef, useEffect, useState } from "react";
import RequirePhotos from "./RequirePhotos";
import CameraAccess from "./CameraAccess";

function CameraForm() {
  return (
    <div>
      <div className="require-div">
        <RequirePhotos></RequirePhotos>
      </div>
        <CameraAccess></CameraAccess>
    </div>
  );
}

export default CameraForm;
