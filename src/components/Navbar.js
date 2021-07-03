import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function NavBar() {
  let history = useHistory();

  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    history.push("/");
  };

  return (
    <Navbar variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Text>
          Signed in as {localStorage.getItem("username").toUpperCase()}
        </Navbar.Text>
        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;