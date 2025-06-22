import React, { useEffect, useState } from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { fetchProfile } from "../../store/profileSlice";

const Header = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const profileData =JSON.parse(localStorage.getItem("user")); // أو أي key مخزن فيه اليوزر
  
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const user = profileData;
  useEffect(() => {
    if (isAuthenticated && !profileData?.id) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated, profileData?.id]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    ...(isAuthenticated
      ? [
        {
          name: "Dashboard",
          path:
            user?.role === "Educator"
              ? "/dashboard/instructor"
              : "/dashboard/student"
        },
        { name: "Community", path: "/community" },
        { name: "Settings", path: "/settings" },
      ]
      : []),
    { name: "Help Center", path: "/help-center" },
    { name: "Download App", path: "/download-app" },
  ];

  return (
    <StyledNavbar expand="lg" >
      <StyledContainer>
        <BrandLogo as={Link} to="/" >
          <LogoImage
            src="image/logo.png"
            alt="Logo"
            width="40px"
          />
          <BrandText>MAHD</BrandText>
        </BrandLogo>

        <CustomToggler aria-controls="navbarScroll">
          <BsList size={25} />
        </CustomToggler>

        <StyledNavbarCollapse id="navbarScroll">
          <StyledNav >
            {navItems.map((item) => (
              <StyledNavLink
                as={Link}
                to={item.path}
                key={item.name}
                onClick={() => setActiveLink(item.name)}
                $active={activeLink === item.name}
              >
                {item.name}
              </StyledNavLink>
            ))}
          </StyledNav>

          <AuthSection>
            {!isAuthenticated ? (
              <AuthButtons>
                <AuthLink to="/login">
                  <LoginButton>
                    Log in
                  </LoginButton>
                </AuthLink>
                <AuthLink to="/signup">
                  <SignUpButton>
                    Sign Up
                  </SignUpButton>
                </AuthLink>
              </AuthButtons>
            ) : (
              <ProfileSection>
                <ProfileLink
                  to={
                    user?.role === "Educator"
                      ? "/dashboard/instructor/profile"
                      : "/dashboard/student/profile"
                  }
                >
                  <ProfileAvatar
                    src={user?.avatar || "/image/default-avatar.jpg"}
                    alt="Profile"
                  />
                  <UserInfo>
                    <UserName>{user?.firstName || 'User'}</UserName>
                    <UserRole>{user?.role || 'student'}</UserRole>
                  </UserInfo>
                </ProfileLink>
              </ProfileSection>
            )}
            <ThemeToggleWrapper>
              <ThemeToggle />
            </ThemeToggleWrapper>
          </AuthSection>
        </StyledNavbarCollapse>
      </StyledContainer>
    </StyledNavbar>
  );
};

export default Header;


// Styled Components
const StyledNavbar = styled(Navbar)`
  background: var(--card-background);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  padding: 0.75rem 0;

  @media (max-width: 991.98px) {
    padding: 0.5rem 0;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 991.98px) {
    flex-wrap: wrap;
  }
`;

const BrandLogo = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 575.98px) {
    margin-right: auto;
  }
`;

const LogoImage = styled.img`
  margin-right: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(5deg) scale(1.05);
  }

  @media (max-width: 575.98px) {
    width: 35px !important;
    margin-right: 0.5rem;
  }
`;

const BrandText = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary) 0%, #00d4aa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;

  @media (max-width: 575.98px) {
    font-size: 1.25rem;
  }
`;

const CustomToggler = styled(Navbar.Toggle)`
  border: none;
  background: var(--background-dark);
  border-radius: 8px;
  padding: 0.5rem;
  color: var(--text-light);
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary);
    color: var(--background-dark);
    transform: scale(1.05);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.2);
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

const StyledNavbarCollapse = styled(Navbar.Collapse)`
  @media (max-width: 991.98px) {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }
`;

const StyledNav = styled(Nav)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;

  @media (max-width: 991.98px) {
    flex-direction: column;
    align-items: stretch;
    margin: 0 0 1rem 0;
    gap: 0.25rem;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  color: var(--text-secondary) !important;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.75rem 1rem !important;
  border-radius: 8px;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;

  ${props => props.$active && `
    color: var(--primary) !important;
    background: rgba(0, 230, 118, 0.1);
    font-weight: 600;
  `}

  &:hover {
    color: var(--primary) !important;
    background: rgba(0, 230, 118, 0.05);
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  ${props => props.$active && `
    &::after {
      width: 80%;
    }
  `}

  @media (max-width: 991.98px) {
    text-align: center;
    padding: 0.75rem !important;
    margin: 0.125rem 0;

    &::after {
      display: none;
    }
  }

  @media (max-width: 575.98px) {
    font-size: 0.9rem;
    padding: 0.625rem !important;
  }
`;

const AuthSection = styled(Form)`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 991.98px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  @media (max-width: 575.98px) {
    gap: 0.5rem;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 575.98px) {
    gap: 0.5rem;
    flex-direction: column;
    width: 100%;
  }
`;

const AuthLink = styled(NavLink)`
  text-decoration: none;

  @media (max-width: 575.98px) {
    width: 100%;
  }
`;

const LoginButton = styled.button`
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: var(--primary);
    color: var(--background-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 230, 118, 0.3);
  }

  @media (max-width: 575.98px) {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

const SignUpButton = styled.button`
  background: var(--primary);
  border: 2px solid var(--primary);
  color: var(--background-dark);
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: var(--primary-dark);
    border-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 230, 118, 0.4);
  }

  @media (max-width: 575.98px) {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: rgba(0, 230, 118, 0.05);
    border-color: var(--primary);
    transform: translateY(-1px);
  }

  @media (max-width: 991.98px) {
    justify-content: center;
  }

  @media (max-width: 575.98px) {
    gap: 0.5rem;
    padding: 0.375rem;
  }
`;

const ProfileAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 230, 118, 0.3);
  }

  @media (max-width: 575.98px) {
    width: 35px;
    height: 35px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 767.98px) {
    display: none;
  }
`;

const UserName = styled.span`
  color: var(--text-light);
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.2;
`;

const UserRole = styled.span`
  color: var(--text-secondary);
  font-size: 0.75rem;
  text-transform: capitalize;
  line-height: 1.2;
`;

const ThemeToggleWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 575.98px) {
    order: -1;
  }
`;
