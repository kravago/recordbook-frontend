import React from "react";
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';


// { currentUser, logout}
function NavBar({ currentUser, logout }) {
  const loginLinks = (
    <>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
    </>);

  const userLinks = (
    <>
      <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
      <Nav.Link as={Link} to="/" onClick={logout}>Logout</Nav.Link>
    </>
  )

  return (
    <div>
    <Navbar expand="lg" variant="dark" bg="dark" className="navbar navbar-expand-lg">
      <div className="container-fluid">
          <Navbar.Brand as={Link} to="/">Recordbook</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/">Anime</Nav.Link>
              <Nav.Link as={Link} to="/">Records</Nav.Link>
              {currentUser ? userLinks: loginLinks}
            </Nav>
          </Navbar.Collapse>
      </div>
    </Navbar>
      
    </div>
  );
}

export default NavBar;