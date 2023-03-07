import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomeNavBar } from './homeNavBar';
import {LoggedIn} from './loggedIn'
import { LoginPage } from './login';
import { Home } from './home';


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Row>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/:id" element={<LoggedIn />}>
          <Route index element = {<LoggedIn />} />
        </Route>
        <Route path="*" element={<Navigate to ="/" />} /> 
      </Routes>
    </BrowserRouter>
    </Row>
    </>
  )
}

export default App
