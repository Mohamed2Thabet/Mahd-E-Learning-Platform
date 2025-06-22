// components/NotificationItem.js
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { FaClock, FaCircle } from 'react-icons/fa';
import { useState } from 'react';

const NotificationCard = styled(Card)`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.$isUnread ? 'var(--primary)' : 'transparent'};
    transition: all 0.3s ease;
  }
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.15);
    
    &::before {
      background: var(--primary);
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
    border-radius: 8px;
    
    &:hover {
      transform: none;
      box-shadow: 0 4px 15px rgba(0, 230, 118, 0.1);
    }
  }
`;

const StyledCardBody = styled(Card.Body)`
  padding: 20px;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const TitleSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const StyledCardTitle = styled(Card.Title)`
  color: var(--heading-color);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const UnreadIndicator = styled(FaCircle)`
  color: var(--primary);
  font-size: 0.5rem;
  opacity: ${props => props.$isUnread ? '1' : '0'};
  transition: opacity 0.3s ease;
`;

const StyledCardText = styled(Card.Text)`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 16px 0;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`;

const ActionsContainer = styled.div`
  margin-bottom: 12px;
  
  @media (max-width: 480px) {
    button, .btn {
      width: 100%;
      margin-bottom: 8px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const TimeStamp = styled.div`
  color: var(--text-secondary);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.8;
  
  svg {
    font-size: 0.75rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
  }
  
  &.mark-read {
    &:hover {
      background: var(--card-background);
      border-color: var(--text-secondary);
      color: var(--text-light);
    }
  }
  
  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 0.75rem;
  }
`;

const PriorityBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${props => {
    switch (props.$priority) {
      case 'high': return 'linear-gradient(135deg, #FF5722, #D32F2F)';
      case 'medium': return 'linear-gradient(135deg, #FF9800, #F57C00)';
      case 'low': return 'linear-gradient(135deg, #4CAF50, #388E3C)';
      default: return 'var(--card-background)';
    }
  }};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: ${props => props.$priority ? '1' : '0'};
  
  @media (max-width: 768px) {
    position: static;
    display: inline-block;
    margin-left: auto;
  }
`;

export default function NotificationItem({
  title,
  description,
  time,
  actions,
  isUnread = true,
  priority = null,
  onMarkRead = null,
  onArchive = null
}) {
  const [unread, setUnread] = useState(isUnread);

  const handleMarkRead = () => {
    setUnread(false);
    if (onMarkRead) onMarkRead();
  };

  const handleArchive = () => {
    if (onArchive) onArchive();
  };

  const getTimeAgo = (timeString) => {
    // Simple time formatting - you can enhance this with a library like moment.js
    return timeString;
  };

  return (
    <NotificationCard $isUnread={unread}>
      <StyledCardBody>
        <CardHeader>
          <TitleSection>
            <StyledCardTitle>
              <UnreadIndicator $isUnread={unread} />
              {title}
            </StyledCardTitle>
            <PriorityBadge $priority={priority}>
              {priority}
            </PriorityBadge>
          </TitleSection>
        </CardHeader>

        <StyledCardText>
          {description}
        </StyledCardText>

        <ActionsContainer>
          {actions}
        </ActionsContainer>

        <TimeContainer>
          <TimeStamp>
            <FaClock />
            {getTimeAgo(time)}
          </TimeStamp>

          <NotificationActions>
            {unread && (
              <ActionButton onClick={handleMarkRead}>
                Mark as Read
              </ActionButton>
            )}
            <ActionButton className="mark-read" onClick={handleArchive}>
              Archive
            </ActionButton>
          </NotificationActions>
        </TimeContainer>
      </StyledCardBody>
    </NotificationCard>
  );
}