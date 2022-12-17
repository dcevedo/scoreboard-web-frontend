import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import alerts from "../helpers/alerts";
import AuthService from '../services/auth.service';

const PageNavBar = ({ currentUser, setCurrentUser }) => {

  useEffect(() => {
    AuthService.getCurrentUser().then(user => {
      if (user) {
        setCurrentUser(user);
      }
      else{
        setCurrentUser(null);      
      }
    });
  }, [setCurrentUser])

  const logout = async () => {
    const res = await AuthService.logout();
    if (!res.err) {
      setCurrentUser(null);
      alerts.LogoutAlert();
    }
    else {
      // alerts.ErrorAlert(res.message);
    }
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="m-4 rounded shadow" >
      <Container>
        <Link className="navbar-brand" to="/">
          <FontAwesomeIcon icon={faMedal} size="2x" />
          <span className="website-name ms-2">Marcadores</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0">
            {currentUser ? authUserPages(logout) : guestUserPages()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const authUserPages = (logout) => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li><li className="nav-item">
        <Link className="nav-link" to="/sports">Deportes</Link>
      </li><li className="nav-item">
        <Link className="nav-link" to="/teams">Equipos</Link>
      </li><li className="nav-item">
        <Link to="/">
          <Button variant="outline-secondary" onClick={logout}>Logout</Button>
        </Link>
      </li>
    </>
  )
}

const guestUserPages = () => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li><li className="nav-item">
        <Link className="nav-link" to="/register">Registro</Link>
      </li><li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </>
  )
}
export default PageNavBar