import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { BsList } from "react-icons/bs";
import './header.css';

const Header = () => {
  const [activeLink, setActiveLink] = useState("Home");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Community", path: "/community" },
    { name: "Help Center", path: "/helpcenter" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <Navbar expand="lg" className="bg-dark" data-aos="fade-up">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white d-flex align-items-center">
          <img data-aos="fade-up" src="image/logo.png" alt="Logo" width="40px" className="me-2" />
          MAHD
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll">
          <BsList size={25} className="custom-toggler-icon" />
        </Navbar.Toggle>

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto ms-auto my-2 my-lg-0" navbarScroll data-aos="fade-up">
            {navItems.map((item) => (
              <Nav.Link
                as={Link}
                to={item.path}
                key={item.name}
                onClick={() => setActiveLink(item.name)}
                style={{
                  color: activeLink === item.name ? "#FFF" : "#868F8A",
                  transition: "color 0.3s ease",
                  fontWeight: activeLink === item.name ? "bold" : "normal",
                }}
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>

          <Form className="d-flex gap-4">
            <NavLink to="/login">
              <Button variant="success" className="text-uppercase fw-semibold rounded-5 py-2 px-4" data-aos="fade-up">
                Log in
              </Button>
            </NavLink>

            <NavLink to="/signin">
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
