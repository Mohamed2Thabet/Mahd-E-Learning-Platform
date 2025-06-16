import React, { useState } from "react";
import styled from "styled-components";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPlus, FaEdit, FaTrash, FaCreditCard } from "react-icons/fa";

// ✅ Main card container
const CardContainer = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px;
  color: var(--text-light);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 24px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

// ✅ Header section
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--heading-color);
  letter-spacing: -0.01em;

  @media (max-width: 480px) {
    font-size: 18px;
    text-align: center;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  color: var(--heading-color);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 230, 118, 0.3);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.3);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 12px 16px;
  }
`;

// ✅ Payment method item container
const PaymentMethodItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

// ✅ Card info section
const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 24px;
  color: var(--primary);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;

  ${PaymentMethodItem}:hover & {
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--primary);
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 28px;
    font-size: 20px;
  }
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const CardNumber = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    font-size: 14px;
    gap: 6px;
  }
`;

const CardExpiry = styled.div`
  font-size: 14px;
  color: var(--text-secondary);

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const DefaultBadge = styled.span`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--heading-color);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 4px rgba(0, 230, 118, 0.2);

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 3px 6px;
  }
`;

// ✅ Action buttons
const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--text-light);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }

  &.edit {
    &:hover {
      color: var(--primary);
      border-color: var(--primary);
      box-shadow: 0 2px 8px rgba(0, 230, 118, 0.2);
    }
  }

  &.delete {
    &:hover {
      color: #f44336;
      border-color: #f44336;
      box-shadow: 0 2px 8px rgba(244, 67, 54, 0.2);
    }
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 13px;
    flex: 1;
    justify-content: center;
  }
`;

// ✅ Empty state
const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;

  @media (max-width: 480px) {
    font-size: 36px;
    margin-bottom: 12px;
  }
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  margin: 0 0 20px 0;
  color: var(--text-secondary);

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

// ✅ Loading state
const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: var(--text-secondary);
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid var(--border-color);
  border-top: 2px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 12px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// ✅ Helper function to get card icon with better styling
const getCardIcon = (type) => {
  const iconProps = {
    size: 24,
    style: { filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }
  };

  switch (type.toLowerCase()) {
    case 'visa':
      return <FaCcVisa {...iconProps} style={{ ...iconProps.style, color: '#1434CB' }} />;
    case 'mastercard':
      return <FaCcMastercard {...iconProps} style={{ ...iconProps.style, color: '#EB001B' }} />;
    case 'amex':
      return <FaCcAmex {...iconProps} style={{ ...iconProps.style, color: '#006FCF' }} />;
    default:
      return <FaCreditCard {...iconProps} />;
  }
};

const PaymentMethodCard = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '5555',
      expiry: '08/26',
      isDefault: false,
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async (id) => {
    setIsLoading(true);
    console.log('Edit payment method:', id);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Add edit functionality here
      alert(`Edit payment method ${id}`);
    } catch (error) {
      console.error('Error editing payment method:', error);
      alert('Failed to edit payment method. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this payment method?')) {
      return;
    }

    setIsLoading(true);
    console.log('Delete payment method:', id);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Remove from state
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
      alert('Payment method removed successfully');
    } catch (error) {
      console.error('Error deleting payment method:', error);
      alert('Failed to remove payment method. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = async () => {
    setIsLoading(true);
    console.log('Add new payment method');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Add new payment method functionality here
      alert('Add new payment method dialog would open here');
    } catch (error) {
      console.error('Error adding payment method:', error);
      alert('Failed to add payment method. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (id) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Update default status
      setPaymentMethods(prev => prev.map(method => ({
        ...method,
        isDefault: method.id === id
      })));

      alert('Default payment method updated');
    } catch (error) {
      console.error('Error setting default payment method:', error);
      alert('Failed to update default payment method.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <CardContainer>
        <Header>
          <Title>Payment Methods</Title>
        </Header>
        <LoadingState>
          <LoadingSpinner />
          Processing request...
        </LoadingState>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <Header>
        <Title>Payment Methods</Title>
        <AddButton onClick={handleAddNew} disabled={isLoading}>
          <FaPlus size={14} />
          Add Card
        </AddButton>
      </Header>

      {paymentMethods.length > 0 ? (
        paymentMethods.map((method) => (
          <PaymentMethodItem key={method.id}>
            <CardInfo>
              <CardIcon>
                {getCardIcon(method.type)}
              </CardIcon>
              <CardDetails>
                <CardNumber>
                  {method.type} ending in {method.last4}
                  {method.isDefault && <DefaultBadge>Default</DefaultBadge>}
                </CardNumber>
                <CardExpiry>Expires {method.expiry}</CardExpiry>
              </CardDetails>
            </CardInfo>

            <ActionButtons>
              <ActionButton
                className="edit"
                onClick={() => handleEdit(method.id)}
                disabled={isLoading}
              >
                <FaEdit size={12} />
                Edit
              </ActionButton>

              {!method.isDefault && (
                <ActionButton
                  onClick={() => handleSetDefault(method.id)}
                  disabled={isLoading}
                >
                  Set Default
                </ActionButton>
              )}

              {!method.isDefault && (
                <ActionButton
                  className="delete"
                  onClick={() => handleDelete(method.id)}
                  disabled={isLoading}
                >
                  <FaTrash size={12} />
                  Remove
                </ActionButton>
              )}
            </ActionButtons>
          </PaymentMethodItem>
        ))
      ) : (
        <EmptyState>
          <EmptyStateIcon>💳</EmptyStateIcon>
          <EmptyStateText>No payment methods added yet</EmptyStateText>
          <AddButton onClick={handleAddNew} disabled={isLoading}>
            <FaPlus size={14} />
            Add Your First Card
          </AddButton>
        </EmptyState>
      )}
    </CardContainer>
  );
};

export default PaymentMethodCard;
