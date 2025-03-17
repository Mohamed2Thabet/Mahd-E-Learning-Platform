import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {  useState } from "react";
import './header.css'
const Header = () => {
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <Navbar expand="lg" className="bg-dark" data-aos="fade-up">
      <Container>
        <Navbar.Brand href="#" className="text-white">
          <img data-aos="fade-up" src="image/logo.png" alt="" width={"40px"}/>MAHD
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto ms-auto my-2 my-lg-0" data-aos="fade-up"
            // style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {["Home", "Link", "Services", "About", "Contact"].map((item) => (
              <Nav.Link
              
                key={item}
                href="#"
                onClick={() => setActiveLink(item)}
                style={{
                  color: activeLink === item ? "#FFF" : "#868F8A",
                  transition: "color 0.3s ease",
                  fontWeight: activeLink === item ? "bold" : "normal",
                }}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
          <Form className="d-flex gap-4">
            <NavLink to="/login">
              <Button variant="success" className="text-uppercase fw-semibold rounded-5 py-2 px-4" data-aos="fade-up">
          Log in
        </Button>
      </NavLink>

      <NavLink to="/signin" className="ms-2"> 
              <Button variant="outline-success" className="text-uppercase fw-semibold rounded-5 py-2 px-4" data-aos="fade-up">
          Sign in
        </Button>
      </NavLink>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
