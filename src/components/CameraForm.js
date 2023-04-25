import React, { useState } from "react";
import RequirePhotos from "./RequirePhotos";
import CameraAccess from "./CameraAccess";
import PermissionForm from "./PermissionForm";
import StripeContainer from "./StripeContainer";

function CameraForm(props) {
  const [showCamera, setShowCamera] = useState(true);
  const [showUpload, setShowUpload] = useState(true);
  const [showPerms, setShowPerms] = useState(true);
  const [showPay, setShowPay] = useState(true);
  const spanishTranslation = props.spaTranslation;

  return (
    <div>
    {showCamera ? (
      <button className="form-btn" onClick={() => setShowCamera(!showCamera)}>
      {!spanishTranslation ? "Hide Camera Form" : "Ocultar la camara"}</button>
      ) : (
      <button className="form-btn" onClick={() => setShowCamera(!showCamera)}>
      {!spanishTranslation ? "Show Camera Form" : "Mostrar la camara"}</button>
      )}
    {showUpload ? (
      <button className="form-btn" onClick={() => setShowUpload(!showUpload)}>
      {!spanishTranslation ? "Hide Image Upload" : "Ocultar subido de imagen"}</button>
       ) : (
      <button className="form-btn" onClick={() => setShowUpload(!showUpload)}>
       {!spanishTranslation ? "Show Image Upload" : "Mostrar subido de imagen"}</button>
      )}
    {showPerms ? (
          <button className="form-btn" onClick={() => setShowPerms(!showPerms)}>
          {!spanishTranslation ? "Hide Permission Request" : "Ocultar la solicitud de Permiso"}</button>
          ) : (
          <button className="form-btn" onClick={() => setShowPerms(!showPerms)}>
          {!spanishTranslation ? "Show Permission Request" : "Mostrar la solicitud de Permiso"}</button>
          )}
    {showPay ? (
      <button className="form-btn" onClick={() => setShowPay(!showPay)}>
      {!spanishTranslation ? "Hide Payment Form" : "Ocultar la camara"}</button>
      ) : (
      <button className="form-btn" onClick={() => setShowPay(!showPay)}>
      {!spanishTranslation ? "Show Payment Form" : "Mostrar la camara"}</button>
      )}
      <div className="App">
      <br />

        {showCamera && <CameraAccess spaTranslation = {props.spaTranslation}> </CameraAccess>}
        <br />
        {showUpload && <RequirePhotos spaTranslation = {props.spaTranslation}></RequirePhotos>}
        <br />
        {showPerms && <PermissionForm spaTranslation = {props.spaTranslation}></PermissionForm>}
        <br />
        {showPay && <StripeContainer spaTranslation={props.spaTranslation}></StripeContainer>}
      </div>
    </div>
  );
}

export default CameraForm;
