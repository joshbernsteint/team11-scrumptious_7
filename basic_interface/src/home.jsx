import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { HomeNavBar } from './homeNavBar';

export function Home(){
    return (
        <>
            <Stack>
                <HomeNavBar />
                <h1>Home Page Here</h1>

            </Stack>
        </>
    )
}