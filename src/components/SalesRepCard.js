import React, { useState, useEffect } from "react";
import { Stack, Button, Modal } from "react-bootstrap"
import "../App.css"


export function SalesRepCard(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const spanishTranslation = props.spaTranslation;
    return (
        <Stack className="sales-card" style={{zIndex: "10"}}>
            <h1 className="sales-card-item"><u>{!spanishTranslation?"Sales Rep Homepage":"Página del representante de ventas"}</u></h1>
            <Stack direction="horizontal" gap={2}>
                <Stack style={{alignItems: "center", margin: "2%",borderRadius: "10%",width: "60%"}}>
                    <h3 style={{color: "white"}}>{!spanishTranslation?"Inquiry Responses":"Respuestas de consulta"}</h3>
                    <br/>
                    <Button variant = "info" style={{margin: "0",width: "50%"}} target = "_blank" href="https://docs.google.com/spreadsheets/d/1ITqMdQxgDy4OfC9he4OXq5yyx3gKwTLuG9Gf4VxcMOg/edit#gid=899548777">{!spanishTranslation?"General Purpose link":"Propósito general"}</Button>
                    <Button variant = "info" style={{margin: "2%",width: "50%"}} onClick={handleShow}>{!spanishTranslation?"Specific Country/Region":"Elige un lugar"}</Button>
                </Stack>
                <Stack style={{alignItems: "center", margin: "2%",borderRadius: "10%"}}>
                    {/* <h3 style={{color: "white"}}>[Other data to go here]</h3> */}
                </Stack>
                <Stack>
                </Stack>
            </Stack>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{!spanishTranslation?"Choose a specific page":"Elige una pagina"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={2}>
                    <Button style={{width: "100%"}} target="_blank" href="https://docs.google.com/spreadsheets/d/1ITqMdQxgDy4OfC9he4OXq5yyx3gKwTLuG9Gf4VxcMOg/edit#gid=521987288" variant="info">{!spanishTranslation?"USA":"EE.UU"}</Button>
                    <Button style={{width: "100%"}} target="_blank" href="https://docs.google.com/spreadsheets/d/1ITqMdQxgDy4OfC9he4OXq5yyx3gKwTLuG9Gf4VxcMOg/edit#gid=172495931" variant="info">{!spanishTranslation?"Canada":"Canadá"}</Button>
                    <Button style={{width: "100%"}} target="_blank" href="https://docs.google.com/spreadsheets/d/1ITqMdQxgDy4OfC9he4OXq5yyx3gKwTLuG9Gf4VxcMOg/edit#gid=2017434518" variant="info">{!spanishTranslation?"Mexico":"México"}</Button>
                    <Button style={{width: "100%"}} target="_blank" href="https://docs.google.com/spreadsheets/d/1ITqMdQxgDy4OfC9he4OXq5yyx3gKwTLuG9Gf4VxcMOg/edit#gid=462828378" variant="info">{!spanishTranslation?"Europe":"Europa"}</Button>
                    <Button style={{width: "100%"}} target="_blank" href="https://docs.google.com/spreadsheets/d/1ITqMdQxgDy4OfC9he4OXq5yyx3gKwTLuG9Gf4VxcMOg/edit#gid=669821536" variant="info">{!spanishTranslation?"Oceania":"Oceanía"}</Button>
                    <Button style={{width: "100%"}} target="_blank" href="https://docs.google.com/spreadsheets/d/1ITqMdQxgDy4OfC9he4OXq5yyx3gKwTLuG9Gf4VxcMOg/edit#gid=115211509" variant="info">Asia</Button>
                    <Button style={{width: "100%"}} target="_blank" href="https://docs.google.com/spreadsheets/d/1ITqMdQxgDy4OfC9he4OXq5yyx3gKwTLuG9Gf4VxcMOg/edit#gid=2019151894" variant="info">{!spanishTranslation?"Other":"Otro"}</Button>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                {!spanishTranslation?"Close":"Cerrar"}
                </Button>
            </Modal.Footer>
            <div aria-label='featured-selector'/>
            </Modal>
        </Stack>
    )
}