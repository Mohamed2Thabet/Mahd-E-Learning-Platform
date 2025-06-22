import React from 'react';
import { Button, Card } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { FaTabletAlt } from "react-icons/fa";
import styled from 'styled-components';

// Styled Components
const StyledDeviceCard = styled(Card)`
  background-color: var(--card-background, #181d19) !important;
  color: var(--text-light, rgba(255, 255, 255, 0.87)) !important;
  border: 1px solid var(--border-color, #333) !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
  
  h5 {
    color: var(--heading-color, white);
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
`;

const DeviceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid var(--border-color, #333);
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 1rem;
    margin: 0 -0.5rem;
  }
`;

const DeviceInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DeviceNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const DeviceIcon = styled(FaTabletAlt)`
  color: var(--primary, #00E676) !important;
  margin-right: 0.5rem;
  font-size: 18px;
`;

const DeviceName = styled.span`
  color: var(--text-light, rgba(255, 255, 255, 0.87));
  font-weight: 500;
  font-size: 1rem;
`;

const DeviceStatus = styled.small`
  color: var(--text-secondary, rgba(255, 255, 255, 0.6)) !important;
  margin-left: 1.625rem; /* Align with device name (icon width + margin) */
  font-size: 0.875rem;
`;

const StyledRemoveButton = styled(Button)`
  background: none !important;
  border: none !important;
  color: #dc3545 !important;
  padding: 0.25rem 0.5rem !important;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  border-radius: 6px;
  
  &:hover {
    color: #ff6b6b !important;
    background-color: rgba(220, 53, 69, 0.1) !important;
    transform: translateY(-1px);
  }
  
  &:focus {
    color: #ff6b6b !important;
    background-color: rgba(220, 53, 69, 0.1) !important;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    margin-right: 0.25rem;
    font-size: 14px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.3;
  }
  
  p {
    margin: 0;
    font-size: 1rem;
  }
`;

export default function ConnectedDevices() {
  const devices = [
    { name: 'iPhone 13 Pro', status: 'Last active: 2 minutes ago' },
    { name: 'iPad Pro', status: 'Last active: 1 hour ago' },
    { name: 'Living Room TV', status: 'Last active: 2 days ago' },
  ];

  const handleRemoveDevice = (deviceName) => {
    // Add your remove device logic here
    console.log('Removing device:', deviceName);
  };

  return (
    <StyledDeviceCard className="p-4">
      <h5>Connected Devices</h5>
      {devices.length > 0 ? (
        devices.map((device, idx) => (
          <DeviceItem key={idx}>
            <DeviceInfo>
              <DeviceNameContainer>
                <DeviceIcon />
                <DeviceName>{device.name}</DeviceName>
              </DeviceNameContainer>
              <DeviceStatus>{device.status}</DeviceStatus>
            </DeviceInfo>
            <StyledRemoveButton
              onClick={() => handleRemoveDevice(device.name)}
              aria-label={`Remove ${device.name}`}
            >
              <BsTrash />
              Remove
            </StyledRemoveButton>
          </DeviceItem>
        ))
      ) : (
        <EmptyState>
          <FaTabletAlt />
          <p>No devices connected</p>
        </EmptyState>
      )}
    </StyledDeviceCard>
  );
}