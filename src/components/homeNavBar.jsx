import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Popover,OverlayTrigger, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./homeNavBar.module.css";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function HomeNavBar(props) {
  const [uid, setUid] = useState(undefined);
  const auth = getAuth();
  const spanishTranslation = props.spaTranslation;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.log("User not signed in");
      }
    });
  }, [auth, uid]);

  return (
    <>
      <Navbar className={styles.bar}>
        <Container fluid>
          <Navbar.Brand href="/" className={styles.brand}>
            <img
              alt=""
              src="/solar_panel.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            {!spanishTranslation?"Scrumptious Solar Services":"Scrumptious Servicios Solares"}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            style={{ alignItems: "right", justifyContent: "right" }}
          >
            <Nav className={`my-1 my-lg-2 ${styles.nav}`} navbarScroll>
              {uid && (
                <Nav.Link href="/" className={`${styles.navLink}`}>
                  {!spanishTranslation?"Home":"Inicio"}
                </Nav.Link>
              )}
              {uid && (
                <Nav.Link href="/tasks" className={`${styles.navLink}`}>
                  {!spanishTranslation?"Tasks":"Tareas"}
                </Nav.Link>
              )}
              {uid && (
                <Nav.Link href="/camera" className={`${styles.navLink}`}>
                  {!spanishTranslation?"Forms":"Formularios"}
                </Nav.Link>
              )}
              <Nav.Link href="/login" className={`${styles.navLink}`}>
                {!spanishTranslation?"Login":"Iniciar sesión"}
              </Nav.Link>
              <Nav.Link href="/login/register" className={`${styles.navLink}`}>
                {!spanishTranslation?"Register":"Registrar"}
              </Nav.Link>
              <Nav.Link href = "/inquiry" className={`${styles.navLink}`} target='_blank'>{!spanishTranslation?"Inquiry Form":"Formulario de consulta"}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <>
        {['bottom'].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`popover-positioned-${placement}`}>
              <Popover.Header as="h3">{!spanishTranslation?"Show user ID":"Mostrar ID de usuario"}</Popover.Header>
              <Popover.Body>
              {uid && <p style={{fontFamily: "Verdana, Geneva, Tahoma, sans-serif"}}><b>{!spanishTranslation?"User ID:":"ID de usuario:"}</b> {uid}</p>}
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="success" style={{borderRadius: "50%",height: "60px",width: "60px",textAlign: "center",fontSize: "x-small",left: "50%"}}><p style={{margin: "0 auto"}}>{!spanishTranslation?"Show ID":"Mostrar ID"}</p></Button>
        </OverlayTrigger>
        ))}
       </>
      </Navbar>
    </>
  );
}
