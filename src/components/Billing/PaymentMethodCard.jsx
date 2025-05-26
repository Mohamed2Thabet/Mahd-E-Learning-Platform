// components/Billing/PaymentMethodCard.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// ✅ Main card container
const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px;
  color: #ffffff;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

// ✅ Header section
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
  letter-spacing: -0.01em;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(76, 175, 80, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// ✅ Payment method item container
const PaymentMethodItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

// ✅ Card info section
const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
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
  color: #4CAF50;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardNumber = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardExpiry = styled.div`
  font-size: 14px;
  color: #a0a0a0;
`;

const DefaultBadge = styled.span`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

// ✅ Action buttons
const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &.edit {
    &:hover {
      color: #4CAF50;
      border-color: #4CAF50;
    }
  }

  &.delete {
    &:hover {
      color: #f44336;
      border-color: #f44336;
    }
  }
`;

// ✅ Empty state
const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #a0a0a0;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  margin: 0 0 20px 0;
`;

// ✅ Helper function to get card icon
const getCardIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'visa':
      return <FaCcVisa />;
    case 'mastercard':
      return <FaCcMastercard />;
    case 'amex':
      return <FaCcAmex />;
    default:
      return <FaCcVisa />;
  }
};

const PaymentMethodCard = () => {
  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
    },
    // Add more payment methods here if needed
    // {
    //   id: 2,
    //   type: 'Mastercard',
    //   last4: '5555',
    //   expiry: '08/26',
    //   isDefault: false,
    // }
  ]);

  const handleEdit = (id) => {
    console.log('Edit payment method:', id);
    // Add edit functionality
  };

  const handleDelete = (id) => {
    console.log('Delete payment method:', id);
    // Add delete functionality
  };

  const handleAddNew = () => {
    console.log('Add new payment method');
    // Add new payment method functionality
  };

  return (
    <CardContainer>
      <Header>
        <Title>Payment Methods</Title>
        <AddButton onClick={handleAddNew}>
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
              >
                <FaEdit size={12} />
                Edit
              </ActionButton>
              {!method.isDefault && (
                <ActionButton
                  className="delete"
                  onClick={() => handleDelete(method.id)}
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
          <AddButton onClick={handleAddNew}>
            <FaPlus size={14} />
            Add Your First Card
          </AddButton>
        </EmptyState>
      )}
    </CardContainer>
  );
};

export default PaymentMethodCard;