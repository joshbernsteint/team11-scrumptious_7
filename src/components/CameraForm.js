import React from "react";
import RequirePhotos from "./RequirePhotos";
import CameraAccess from "./CameraAccess";
import PermissionForm from "./PermissionForm";
import StripeContainer from "./StripeContainer";
import { Stack } from "react-bootstrap";

function CameraForm(props) {
  return (
    <div>
      <Stack gap = {2}>
        <PermissionForm spaTranslation = {props.spaTranslation}></PermissionForm>
        <StripeContainer spaTranslation={props.spaTranslation}></StripeContainer>
        <RequirePhotos spaTranslation = {props.spaTranslation}></RequirePhotos>
        <CameraAccess spaTranslation = {props.spaTranslation}> </CameraAccess>
        <br/> {/* Don't judge me, I did what I have to do */}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </Stack>
    </div>
  );
}

export default CameraForm;
