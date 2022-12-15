import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import "./index.css"

import PageSport from "./components/PageSport";
import PageHome from "./components/PageHome";
import PageTeam from "./components/PageTeam";

import { Container, Nav, Navbar } from "react-bootstrap";

function App() {
  return (
    <div className="container-fluid">
      <Navbar bg="dark" expand="lg" variant="dark" className="m-4 rounded shadow" >
        <Container>
        <Link className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faMedal} size="2x" />
            <span className="website-name ms-2">Marcadores</span>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">Deportes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Equipos</Link>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<PageHome/>} />
        <Route exact path="/sports" element={<PageSport/>} />
        <Route exact path="/teams" element={<PageTeam/>} />
      </Routes>
    </div>
  );
}

export default App;