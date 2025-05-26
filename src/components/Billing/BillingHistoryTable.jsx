// components/Billing/BillingHistoryTable.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { FaFileInvoice, FaDownload, FaEye, FaCalendarAlt, FaFilter, FaSearch } from "react-icons/fa";

// ✅ Main container
const Container = styled.div`
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
  }
`;

// ✅ Header section
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
  letter-spacing: -0.01em;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #a0a0a0;
  margin: 0;
`;

// ✅ Controls section
const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #a0a0a0;
  font-size: 14px;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 12px 10px 36px;
  color: #ffffff;
  font-size: 14px;
  width: 200px;
  transition: all 0.2s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: #4CAF50;
    background: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 16px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

// ✅ Table container
const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
`;

const TableHeader = styled.thead`
  background: rgba(255, 255, 255, 0.05);
`;

const HeaderRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const HeaderCell = styled.th`
  padding: 20px 24px;
  text-align: left;
  font-weight: 600;
  color: #e0e0e0;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  border-bottom: none;

  &:first-child {
    border-top-left-radius: 12px;
  }

  &:last-child {
    border-top-right-radius: 12px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 20px 24px;
  color: #ffffff;
  vertical-align: middle;
  border-bottom: none;
`;

// ✅ Status badge
const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  ${props => {
    switch (props.status?.toLowerCase()) {
      case 'paid':
        return `
          background: rgba(76, 175, 80, 0.2);
          color: #4CAF50;
          border: 1px solid rgba(76, 175, 80, 0.3);
        `;
      case 'pending':
        return `
          background: rgba(255, 193, 7, 0.2);
          color: #FFC107;
          border: 1px solid rgba(255, 193, 7, 0.3);
        `;
      case 'failed':
        return `
          background: rgba(244, 67, 54, 0.2);
          color: #f44336;
          border: 1px solid rgba(244, 67, 54, 0.3);
        `;
      default:
        return `
          background: rgba(158, 158, 158, 0.2);
          color: #9e9e9e;
          border: 1px solid rgba(158, 158, 158, 0.3);
        `;
    }
  }}
`;

// ✅ Action buttons
const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #a0a0a0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #4CAF50;
    border-color: rgba(76, 175, 80, 0.3);
    transform: translateY(-1px);
  }

  &.download:hover {
    color: #2196F3;
    border-color: rgba(33, 150, 243, 0.3);
  }
`;

// ✅ Amount styling
const Amount = styled.span`
  font-weight: 600;
  color: #ffffff;
  font-size: 15px;
`;

// ✅ Date styling
const DateText = styled.span`
  color: #e0e0e0;
  font-weight: 500;
`;

// ✅ Plan styling
const PlanText = styled.span`
  color: #4CAF50;
  font-weight: 500;
`;

// ✅ Empty state
const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #a0a0a0;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 16px;
  margin: 0;
`;

const BillingHistoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const history = [
    {
      id: 1,
      date: "Dec 24, 2024",
      plan: "Pro Plan",
      amount: "$29.00",
      status: "Paid",
      invoiceNumber: "INV-2024-001"
    },
    {
      id: 2,
      date: "Nov 24, 2024",
      plan: "Pro Plan",
      amount: "$29.00",
      status: "Paid",
      invoiceNumber: "INV-2024-002"
    },
    {
      id: 3,
      date: "Oct 24, 2024",
      plan: "Basic Plan",
      amount: "$9.00",
      status: "Paid",
      invoiceNumber: "INV-2024-003"
    },
    {
      id: 4,
      date: "Sep 24, 2024",
      plan: "Pro Plan",
      amount: "$29.00",
      status: "Failed",
      invoiceNumber: "INV-2024-004"
    }
  ];

  const filteredHistory = history.filter(item =>
    item.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewInvoice = (invoiceNumber) => {
    console.log('View invoice:', invoiceNumber);
    // Add view invoice functionality
  };

  const handleDownloadInvoice = (invoiceNumber) => {
    console.log('Download invoice:', invoiceNumber);
    // Add download invoice functionality
  };

  return (
    <Container>
      <Header>
        <TitleSection>
          <Title>Billing History</Title>
          <Subtitle>View and manage your payment history</Subtitle>
        </TitleSection>

        <Controls>
          <SearchInput>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>

          <FilterButton>
            <FaFilter size={12} />
            Filter
          </FilterButton>
        </Controls>
      </Header>

      {filteredHistory.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Plan</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
                <HeaderCell>Status</HeaderCell>
                <HeaderCell>Actions</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <DateText>{item.date}</DateText>
                  </TableCell>
                  <TableCell>
                    <PlanText>{item.plan}</PlanText>
                  </TableCell>
                  <TableCell>
                    <Amount>{item.amount}</Amount>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status}>
                      {item.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton
                        onClick={() => handleViewInvoice(item.invoiceNumber)}
                        title="View Invoice"
                      >
                        <FaEye size={14} />
                      </ActionButton>
                      <ActionButton
                        className="download"
                        onClick={() => handleDownloadInvoice(item.invoiceNumber)}
                        title="Download Invoice"
                      >
                        <FaDownload size={14} />
                      </ActionButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState>
          <EmptyIcon>📋</EmptyIcon>
          <EmptyText>No billing history found</EmptyText>
        </EmptyState>
      )}
    </Container>
  );
};

export default BillingHistoryTable;