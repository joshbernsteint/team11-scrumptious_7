import React, { useRef, useEffect, useState } from "react";

function CameraAccess(props) {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const streamRef = useRef(null);
  const cameraOnRef = useRef(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [cameraRequest, setCameraRequest] = useState("Open Camera");
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const spanishTranslation = props.spaTranslation;

  useEffect(() => {}, [cameraRequest]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const clickHandler = async () => {
    if (!cameraOnRef.current) {
      await startStream();
    } else {
      await stopStream(streamRef.current);
    }
  };

  const startStream = async () => {
    try {
      let streamWidth = windowSize[0] / 1.3;
      let streamHeigt = windowSize[1] / 1.5;
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { width: streamWidth, height: streamHeigt },
      });
    } catch (e) {
      if (e.constructor.name === "DOMException") {
        let alertMessage;
        if(!spanishTranslation){
          alertMessage = "Please provide camera access to this site."
        }else{
          alertMessage = "Proporcione acceso de cámara a este sitio"
        }
        return alert("Please provide camera access to this site.");
      }
      console.log(e);
    }
    let video = videoRef.current;
    video.srcObject = streamRef.current;
    try {
      await video.play();
      cameraOnRef.current = true;
    } catch (e) {
      console.log(e);
    }
    setCameraRequest("Close Camera");
  };

  const stopStream = async (stream) => {
    await stream.getTracks().forEach((track) => {
      track.stop();
    });
    let video = videoRef.current;
    video.pause();
    video.src = "";
    video.srcObject = null;
    cameraOnRef.current = false;
    streamRef.current = null;
    setCameraRequest("Open Camera");
  };

  const takePhoto = () => {
    const width = windowSize[0] * 0.2;
    const height = windowSize[1] * 0.2;
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    let context = photo.getContext("2d");
    context.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let context = photo.getContext("2d");
    context.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  return (
    <div className="form">
      <div className="video">
        <video ref={videoRef}></video>
        <div className="takePhoto">
          {cameraOnRef.current && (
            <button onClick={takePhoto}>{!spanishTranslation? "Take Photo":"Tomar foto"}</button>
          )}
        </div>
      </div>

      <div className="cameraPower">
        <button className="form-btn" id="cameraRequest" onClick={clickHandler}>
          {!spanishTranslation && cameraRequest ? cameraRequest : 
          spanishTranslation && cameraRequest==="Close Camera"? "Cerrar la camara": "Abrir la camara"}
        </button>
        {cameraRequest === 'Close Camera' ? <span className="message">{!spanishTranslation?"Close camera before leaving page.":"Cerrar la camara antes de salir de la pagina"}</span>: <></>}
      </div>
      <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        {hasPhoto && <button onClick={closePhoto}>{!spanishTranslation?"Close Photo":"Cerrar foto"}</button>}
      </div>
    </div>
  );
}

export default CameraAccess;
