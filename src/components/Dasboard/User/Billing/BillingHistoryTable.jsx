import React, { useState } from "react";
import styled from "styled-components";
import { FaFileInvoice, FaDownload, FaEye, FaCalendarAlt, FaFilter, FaSearch } from "react-icons/fa";

// ✅ Main container
const Container = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px;
  color: var(--text-light);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

// ✅ Header section
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);

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
  color: var(--heading-color);
  letter-spacing: -0.01em;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;

  @media (max-width: 480px) {
    font-size: 13px;
  }
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

  @media (max-width: 480px) {
    gap: 8px;
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
  color: var(--text-secondary);
  font-size: 14px;
  z-index: 1;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px 12px 10px 36px;
  color: var(--text-light);
  font-size: 14px;
  width: 200px;
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 8px 10px 8px 32px;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px 16px;
  color: var(--text-light);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--primary);
    color: var(--primary);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

// ✅ Table container
const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.02);

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
  min-width: 600px;

  @media (max-width: 480px) {
    font-size: 13px;
    min-width: 500px;
  }
`;

const TableHeader = styled.thead`
  background: rgba(255, 255, 255, 0.05);
`;

const HeaderRow = styled.tr`
  border-bottom: 1px solid var(--border-color);
`;

const HeaderCell = styled.th`
  padding: 20px 24px;
  text-align: left;
  font-weight: 600;
  color: var(--text-light);
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

  @media (max-width: 480px) {
    padding: 16px 12px;
    font-size: 12px;
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
  color: var(--text-light);
  vertical-align: middle;
  border-bottom: none;

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
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
    switch (props.$status?.toLowerCase()) {
      case 'paid':
        return `
          background: rgba(0, 230, 118, 0.2);
          color: var(--primary);
          border: 1px solid rgba(0, 230, 118, 0.3);
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
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        `;
    }
  }}

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 11px;
  }
`;

// ✅ Action buttons
const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--primary);
    border-color: var(--primary);
    transform: translateY(-1px);
  }

  &.download:hover {
    color: #2196F3;
    border-color: rgba(33, 150, 243, 0.3);
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

// ✅ Amount styling
const Amount = styled.span`
  font-weight: 600;
  color: var(--heading-color);
  font-size: 15px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// ✅ Date styling
const DateText = styled.span`
  color: var(--text-light);
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

// ✅ Plan styling
const PlanText = styled.span`
  color: var(--primary);
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 13px;
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

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;

  @media (max-width: 480px) {
    font-size: 36px;
    margin-bottom: 12px;
  }
`;

const EmptyText = styled.p`
  font-size: 16px;
  margin: 0;
  color: var(--text-secondary);

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// ✅ Loading state
const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-secondary);
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 16px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const BillingHistoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    },
    {
      id: 5,
      date: "Aug 24, 2024",
      plan: "Team Plan",
      amount: "$99.00",
      status: "Pending",
      invoiceNumber: "INV-2024-005"
    }
  ];

  const filteredHistory = history.filter(item =>
    item.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewInvoice = async (invoiceNumber) => {
    setIsLoading(true);
    console.log('View invoice:', invoiceNumber);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Add view invoice functionality here
      alert(`Viewing invoice: ${invoiceNumber}`);
    } catch (error) {
      console.error('Error viewing invoice:', error);
      alert('Failed to view invoice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadInvoice = async (invoiceNumber) => {
    setIsLoading(true);
    console.log('Download invoice:', invoiceNumber);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Add download invoice functionality here
      alert(`Downloaded invoice: ${invoiceNumber}`);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = () => {
    console.log('Filter clicked');
    // Add filter functionality here
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingState>
          <LoadingSpinner />
          Processing request...
        </LoadingState>
      </Container>
    );
  }

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

          <FilterButton onClick={handleFilter}>
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
                    <StatusBadge $status={item.status}>
                      {item.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton
                        onClick={() => handleViewInvoice(item.invoiceNumber)}
                        title="View Invoice"
                        disabled={isLoading}
                      >
                        <FaEye size={14} />
                      </ActionButton>
                      <ActionButton
                        className="download"
                        onClick={() => handleDownloadInvoice(item.invoiceNumber)}
                        title="Download Invoice"
                        disabled={isLoading}
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
          <EmptyText>
            {searchTerm ? 'No transactions found matching your search' : 'No billing history found'}
          </EmptyText>
        </EmptyState>
      )}
    </Container>
  );
};

export default BillingHistoryTable;
