import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./homeNavBar.module.css";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function HomeNavBar() {
  const [uid, setUid] = useState(undefined);
  const auth = getAuth();

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
            Scrumptious Solar Services
          </Navbar.Brand>
          <Navbar.Brand href="/" className={styles.brandImg}>
            <img
              alt=""
              src="/solar_panel.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" className="norm" />
          <Navbar.Collapse
            id="navbarScroll"
            style={{ alignItems: "right", justifyContent: "right" }}
          >
            <Nav className={`my-1 my-lg-2 ${styles.nav}`} navbarScroll>
              <NavDropdown className={`dropdown-menu ${styles.dropdown}`}>
                {uid && <NavDropdown.Item href="/">Home</NavDropdown.Item>}
                {uid && (
                  <NavDropdown.Item href="/tasks">Tasks</NavDropdown.Item>
                )}
                {uid && (
                  <NavDropdown.Item href="/camera">Forms</NavDropdown.Item>
                )}
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/login/register">
                  Register
                </NavDropdown.Item>
                <NavDropdown.Item href="/inquiry">
                  Inquiry Form
                </NavDropdown.Item>
                {uid && (
                  <NavDropdown.Item href="/progress">Progress</NavDropdown.Item>
                )}
              </NavDropdown>
              <div className={styles.navItems}>
                {uid && (
                  <Nav.Link href="/" className={`${styles.navLink}`}>
                    Home
                  </Nav.Link>
                )}
                {uid && (
                  <Nav.Link href="/tasks" className={`${styles.navLink}`}>
                    Tasks
                  </Nav.Link>
                )}
                {uid && (
                  <Nav.Link href="/camera" className={`${styles.navLink}`}>
                    Forms
                  </Nav.Link>
                )}
                <Nav.Link href="/login" className={`${styles.navLink}`}>
                  Login
                </Nav.Link>
                <Nav.Link
                  href="/login/register"
                  className={`${styles.navLink}`}
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  href="/inquiry"
                  className={`${styles.navLink}`}
                  target="_blank"
                >
                  Inquiry Form
                </Nav.Link>
                {uid && (
                  <Nav.Link
                    href={"/progress/" + uid}
                    className={`${styles.navLink}`}
                  >
                    Progress
                  </Nav.Link>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>

          <>
            {["bottom"].map((placement) => (
              <OverlayTrigger
                trigger="click"
                key={placement}
                placement={placement}
                overlay={
                  <Popover id={`popover-positioned-${placement}`}>
                    <Popover.Header as="h3">Show user ID</Popover.Header>
                    <Popover.Body>
                      {uid && (
                        <p
                          style={{
                            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                          }}
                        >
                          <b>User ID:</b> {uid}
                        </p>
                      )}
                    </Popover.Body>
                  </Popover>
                }
              >
                <Button
                  variant="success"
                  style={{
                    borderRadius: "50%",
                    height: "50px",
                    width: "50px",
                    textAlign: "center",
                    fontSize: "x-small",
                    left: "50%",
                  }}
                >
                  <p style={{ margin: "0 auto" }}>Show ID</p>
                </Button>
              </OverlayTrigger>
            ))}
          </>
        </Container>
      </Navbar>
    </>
  );
}
