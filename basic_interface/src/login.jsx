import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { HomeNavBar } from "./homeNavBar";
import { Link, useNavigate } from "react-router-dom";



export function LoginPage() {
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault()
        navigate("..")
    }
    return (
        <>
            <Stack gap={6}>
                <HomeNavBar/>
                <Form onSubmit={handleSubmit}>
                    <Stack className="align-items-center">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter Username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Stack>
                </Form>
            </Stack>

        </>
    )
}