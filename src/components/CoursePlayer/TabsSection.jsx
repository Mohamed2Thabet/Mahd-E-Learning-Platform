import React, { useState } from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  margin-top: 1rem;
  background: var(--card-background);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const TabNavigation = styled.div`
  display: flex;
  background: var(--background-dark);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 2px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 1px;
  }
`;

const TabButton = styled.button`
  flex: 1;
  min-width: 120px;
  padding: 16px 24px;
  background: none;
  border: none;
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-secondary)'};
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: ${props => props.active ? 'var(--primary)' : 'var(--text-light)'};
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--primary);
    transform: scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.3s ease;
  }
  
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--primary);
  }
`;

const TabContent = styled.div`
  padding: 24px;
  color: var(--text-light);
`;

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  background: var(--background-dark);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:focus {
    outline: none;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const PrimaryButton = styled(ActionButton)`
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: #000;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 230, 118, 0.3);
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
  
  &:hover:not(:disabled) {
    background: var(--primary);
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 230, 118, 0.2);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  
  h3 {
    color: var(--text-light);
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }
`;

const ResourceCard = styled.div`
  background: var(--background-dark);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    color: var(--text-light);
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
  }
  
  p {
    color: var(--text-secondary);
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
  }
  
  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const TranscriptContainer = styled.div`
  background: var(--background-dark);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.6;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
  }
`;

const TimestampSpan = styled.span`
  color: var(--primary);
  font-weight: 600;
  margin-right: 8px;
`;

const CharacterCount = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  text-align: right;
  margin-top: 8px;
`;

function TabsSection({
  onMarkComplete,
  onSaveNotes,
  resources = [],
  transcript = "",
  isCompleted = false
}) {
  const [activeTab, setActiveTab] = useState('notes');
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'notes', label: 'Notes', icon: '📝' },
    { id: 'resources', label: 'Resources', icon: '📚' },
    { id: 'transcript', label: 'Transcript', icon: '📄' }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveNotes?.(note);
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkComplete = async () => {
    await onMarkComplete?.();
  };

  const renderNotesTab = () => (
    <NotesContainer>
      <TextArea
        placeholder="Take notes for this lesson... 
✏️ Key concepts and insights
📌 Important timestamps
💡 Questions and ideas
🎯 Action items"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={5000}
      />
      <CharacterCount>
        {note.length}/5000 characters
      </CharacterCount>
      <ButtonGroup>
        <PrimaryButton
          onClick={handleMarkComplete}
          disabled={isCompleted}
        >
          {isCompleted ? '✅ Completed' : '🎯 Mark as Completed'}
        </PrimaryButton>
        <SecondaryButton
          onClick={handleSave}
          disabled={isSaving || !note.trim()}
        >
          {isSaving ? '💾 Saving...' : '💾 Save Notes'}
        </SecondaryButton>
      </ButtonGroup>
    </NotesContainer>
  );

  const renderResourcesTab = () => (
    <div>
      {resources.length > 0 ? (
        resources.map((resource, index) => (
          <ResourceCard key={index}>
            <h4>{resource.title}</h4>
            <p>{resource.description}</p>
            {resource.url && (
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                View Resource →
              </a>
            )}
          </ResourceCard>
        ))
      ) : (
        <EmptyState>
          <h3>📚 No Resources Available</h3>
          <p>Resources for this lesson will appear here when available.</p>
        </EmptyState>
      )}
    </div>
  );

  const renderTranscriptTab = () => (
    <div>
      {transcript ? (
        <TranscriptContainer>
          {transcript.split('\n').map((line, index) => {
            const timestampMatch = line.match(/^(\d{2}:\d{2}:\d{2})/);
            if (timestampMatch) {
              const [, timestamp] = timestampMatch;
              const text = line.replace(timestamp, '').trim();
              return (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <TimestampSpan>{timestamp}</TimestampSpan>
                  <span>{text}</span>
                </div>
              );
            }
            return <div key={index} style={{ marginBottom: '8px' }}>{line}</div>;
          })}
        </TranscriptContainer>
      ) : (
        <EmptyState>
          <h3>📄 No Transcript Available</h3>
          <p>The transcript for this lesson will appear here when available.</p>
        </EmptyState>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notes':
        return renderNotesTab();
      case 'resources':
        return renderResourcesTab();
      case 'transcript':
        return renderTranscriptTab();
      default:
        return null;
    }
  };

  return (
    <TabsContainer>
      <TabNavigation>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            <span style={{ marginRight: '6px' }}>{tab.icon}</span>
            {tab.label}
          </TabButton>
        ))}
      </TabNavigation>

      <TabContent>
        {renderTabContent()}
      </TabContent>
    </TabsContainer>
  );
}

export default TabsSection;