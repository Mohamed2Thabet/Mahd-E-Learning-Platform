import React, { useState, useEffect } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FaBars, FaUserCircle, FaTimes, FaCog } from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FiCreditCard, FiLock, FiTablet, FiUser, FiBell, FiShield } from 'react-icons/fi';

// ✅ Enhanced sidebar data with categories
const sidebarSections = [
  {
    title: "Account",
    links: [
      // { to: "/account", label: "Account Overview", icon: <FaUserCircle />, description: "View your account summary" },
      { to: "/dashboard/instructor/profile", label: "Profile Info", icon: <FiUser />, description: "Manage personal information" }
    ]
  },
  {
    title: "Security",
    links: [
      { to: "/settings", label: "Privacy & Security", icon: <FiLock />, description: "Control privacy settings" },
      { to: "/notifications", label: "Notifications", icon: <FiBell />, description: "Manage notification preferences" },
      // { to: "/security", label: "Security Center", icon: <FiShield />, description: "Advanced security options" }
    ]
  },
  {
    title: "Billing",
    links: [
      { to: "/billing", label: "Billing & Subscription", icon: <FiCreditCard />, description: "Manage payments & plans" },
      // { to: "/devices", label: "Connected Devices", icon: <FiTablet />, description: "View connected devices" }
    ]
  }
];

// ✅ Professional fixed sidebar
const FixedSidebar = styled.div`
  background: var(--background-dark);
  color: var(--text-light);
  padding: 24px 16px;
  width: 280px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  z-index: 1000;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--card-background);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--primary) 30%,
      var(--primary-dark) 70%,
      transparent 100%
    );
  }
  
  @media (min-width: 769px) {
    display: block;
  }
`;

const SidebarHeader = styled.div`
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
`;

const SidebarTitle = styled.h4`
  color: var(--heading-color);
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  svg {
    color: var(--primary);
    font-size: 1.2rem;
  }
`;

const SidebarSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin: 0;
  opacity: 0.8;
`;

const SectionContainer = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h6`
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 12px 16px;
  opacity: 0.7;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  color: var(--text-secondary) !important;
  text-decoration: none !important;
  border-radius: 10px;
  margin-bottom: 6px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  position: relative;
  gap: 12px;
  
  &:hover {
    background: var(--card-background);
    color: var(--text-light) !important;
    border-color: var(--border-color);
    transform: translateX(4px);
    
    svg {
      color: var(--primary);
      transform: scale(1.1);
    }
  }
  
  &.active {
    background: var(--card-background);
    color: var(--text-light) !important;
    border-color: var(--primary);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--primary);
      border-radius: 0 2px 2px 0;
    }
    
    svg {
      color: var(--primary);
    }
    
    .link-description {
      color: var(--primary);
      opacity: 0.8;
    }
  }
  
  svg {
    font-size: 1.1rem;
    margin-top: 2px;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }
`;

const LinkContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const LinkLabel = styled.div`
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 2px;
`;

const LinkDescription = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
  line-height: 1.3;
  color: var(--text-secondary);
`;

// ✅ Floating action button
const FloatingButton = styled(Button)`
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  width: 60px !important;
  height: 60px !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark)) !important;
  border: none !important;
  color: white !important;
  font-size: 1.3rem !important;
  z-index: 1050 !important;
  box-shadow: 0 6px 20px rgba(0, 230, 118, 0.4) !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  
  &:hover {
    transform: scale(1.1) !important;
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.5) !important;
    background: linear-gradient(135deg, var(--primary-dark), var(--primary)) !important;
  }
  
  &:active {
    transform: scale(0.95) !important;
  }
  
  @media (min-width: 769px) {
    display: none !important;
  }
`;

// ✅ Enhanced Offcanvas styling
const StyledOffcanvas = styled(Offcanvas)`
  background: var(--background-dark) !important;
  color: var(--text-light) !important;
  border-right: 1px solid var(--border-color);
  
  .offcanvas-header {
    border-bottom: 1px solid var(--border-color);
    padding: 20px 24px;
    
    .offcanvas-title {
      color: var(--heading-color);
      font-weight: 600;
      font-size: 1.2rem;
    }
    
    .btn-close {
      background: var(--card-background);
      border-radius: 6px;
      opacity: 0.8;
      
      &:hover {
        opacity: 1;
        background: var(--border-color);
      }
    }
  }
  
  .offcanvas-body {
    padding: 24px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
  opacity: ${props => props.$show ? '1' : '0'};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const ContentWrapper = styled.div`
  margin-left: ${props => props.$sidebarOpen ? '280px' : '0'};
  transition: margin-left 0.3s ease;

  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const SidebarContent = ({ onLinkClick }) => (
  <>
    <SidebarHeader>
      <SidebarTitle>
        <FaCog />
        Settings
      </SidebarTitle>
      <SidebarSubtitle>Manage your account preferences</SidebarSubtitle>
    </SidebarHeader>

    {sidebarSections.map((section, sectionIndex) => (
      <SectionContainer key={sectionIndex}>
        <SectionTitle>{section.title}</SectionTitle>
        {section.links.map((link, linkIndex) => (
          <StyledNavLink
            to={link.to}
            key={linkIndex}
            onClick={onLinkClick}
          >
            {link.icon}
            <LinkContent>
              <LinkLabel>{link.label}</LinkLabel>
              <LinkDescription className="link-description">
                {link.description}
              </LinkDescription>
            </LinkContent>
          </StyledNavLink>
        ))}
      </SectionContainer>
    ))}
  </>
);

const SideBarSettings = ({ children }) => {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLinkClick = () => {
    if (isMobile) {
      handleClose();
    }
  };

  return (
    <>
      <FloatingButton onClick={handleShow}>
        {show ? <FaTimes /> : <FaBars />}
      </FloatingButton>

      <FixedSidebar>
        <SidebarContent onLinkClick={handleLinkClick} />
      </FixedSidebar>

      <StyledOffcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        backdrop={true}
        scroll={false}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>
            <FaCog className="me-2" />
            Settings Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent onLinkClick={handleLinkClick} />
        </Offcanvas.Body>
      </StyledOffcanvas>

      <ContentWrapper $sidebarOpen={!isMobile}>
        {children}
      </ContentWrapper>
    </>
  );
};

export default SideBarSettings;