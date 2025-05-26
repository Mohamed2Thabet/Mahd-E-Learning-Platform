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
    { name: "Help Center", path: "/help-center" },
    { name: "Settings", path: "/settings" },
    { name: "Download App", path: "/download-app" },
  ];

  return (
    <Navbar
      expand="lg"
      className="custom-navbar position-relative"
      data-aos="fade-up"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="brand-logo d-flex align-items-center"
        >
          <img
            data-aos="fade-up"
            src="image/logo.png"
            alt="Logo"
            width="40px"
            className="me-2 logo-image"
          />
          <span className="brand-text">MAHD</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbarScroll"
          className="custom-toggler"
        >
          <BsList size={25} className="custom-toggler-icon" />
        </Navbar.Toggle>

        <Navbar.Collapse id="navbarScroll">
          <Nav className="navbar-nav-custom mx-auto" data-aos="fade-up">
            {navItems.map((item) => (
              <Nav.Link
                as={Link}
                to={item.path}
                key={item.name}
                onClick={() => setActiveLink(item.name)}
                className={`nav-link-custom ${activeLink === item.name ? 'active' : ''}`}
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>

          <Form className="auth-buttons d-flex gap-3">
            <NavLink to="/login" className="auth-link">
              <Button
                variant="outline-primary"
                className="btn-login"
                data-aos="fade-up"
              >
                Log in
              </Button>
            </NavLink>

            <NavLink to="/signin" className="auth-link">
              <Button
                variant="primary"
                className="btn-signin"
                data-aos="fade-up"
              >
                Sign Up
              </Button>
            </NavLink>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;