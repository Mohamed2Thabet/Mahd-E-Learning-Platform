import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background: var(--card-background);
  border-right: 1px solid var(--border-color);
  height: 100vh;
  width: 100%;
  max-width: 320px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid var(--border-color);
  background: var(--background-dark);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
  }
`;

const CourseTitle = styled.h2`
  color: var(--heading-color);
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  line-height: 1.3;
  letter-spacing: 0.02em;
`;

const CourseProgress = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.02) 0%, 
      rgba(255, 255, 255, 0.05) 50%, 
      rgba(255, 255, 255, 0.02) 100%
    );
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  width: ${props => props.progress || 0}%;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 3px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.3) 0%, 
      rgba(255, 255, 255, 0.1) 50%, 
      rgba(255, 255, 255, 0.3) 100%
    );
    border-radius: 3px;
  }
`;

const ProgressPercentage = styled.span`
  min-width: 35px;
  text-align: right;
  font-weight: 600;
  color: var(--primary);
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 3px;
    opacity: 0.6;
    
    &:hover {
      opacity: 1;
    }
  }
  
  scrollbar-width: thin;
  scrollbar-color: var(--primary) transparent;
`;

const ChapterSection = styled.div`
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  margin: 8px 12px 16px 12px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
`;

const ChapterHeader = styled.div`
  padding: 16px 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-light);
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: ${props => props.active ? 'rgba(0, 230, 118, 0.05)' : 'transparent'};
  
  &:hover {
    background: rgba(0, 230, 118, 0.08);
    color: var(--primary);
    transform: translateX(2px);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => props.active ? 'var(--primary)' : 'transparent'};
    transition: all 0.3s ease;
    border-radius: 0 2px 2px 0;
  }
  
  &:hover::before {
    width: 6px;
    background: var(--primary);
  }
`;

const ChapterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChapterIcon = styled.span`
  font-size: 16px;
  filter: grayscale(0.3);
  transition: filter 0.3s ease;
  
  ${ChapterHeader}:hover & {
    filter: grayscale(0);
  }
`;

const ExpandIcon = styled.span`
  font-size: 12px;
  transform: rotate(${props => props.expanded ? '180deg' : '0deg'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-secondary);
  opacity: 0.7;
  
  ${ChapterHeader}:hover & {
    opacity: 1;
    color: var(--primary);
  }
`;

const LessonList = styled.div`
  max-height: ${props => props.expanded ? '1000px' : '0px'};
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0, 0, 0, 0.2);
`;

const LessonItem = styled.div`
  padding: 14px 18px 14px 42px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 3px solid transparent;
  position: relative;
  
  &:hover {
    background: rgba(0, 230, 118, 0.05);
    transform: translateX(2px);
    border-left-color: rgba(0, 230, 118, 0.3);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }
  
  ${props => props.active && `
    background: rgba(0, 230, 118, 0.12);
    border-left-color: var(--primary);
    color: var(--primary);
    
    &::before {
      content: '';
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: var(--primary);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--primary);
    }
  `}
  
  ${props => props.completed && !props.active && `
    color: var(--text-secondary);
    opacity: 0.8;
    
    &::after {
      content: '✓';
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--primary);
      font-weight: 700;
      font-size: 14px;
      text-shadow: 0 0 4px var(--primary);
    }
  `}
`;

const LessonStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${props => {
    if (props.completed) return 'var(--primary)';
    if (props.active) return 'var(--primary)';
    return 'rgba(255, 255, 255, 0.15)';
  }};
  transition: all 0.3s ease;
  border: 2px solid ${props => {
    if (props.completed || props.active) return 'var(--primary)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  box-shadow: ${props => (props.completed || props.active) ? `0 0 6px ${props.active ? 'var(--primary)' : 'rgba(0, 230, 118, 0.4)'}` : 'none'};
`;

const LessonContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const LessonTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-light)'};
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  letter-spacing: 0.01em;
`;

const LessonDuration = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 400;
  opacity: 0.8;
`;

const SidebarFooter = styled.div`
  padding: 20px;
  border-top: 1px solid var(--border-color);
  background: var(--background-dark);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
  }
`;

const CompletionStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  font-weight: 500;
`;

const CompletionLabel = styled.span`
  color: var(--text-light);
`;

const CompletionValue = styled.span`
  color: var(--primary);
  font-weight: 600;
`;

const TimeRemaining = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1001;
  background: var(--primary);
  color: white;
  border: none;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 230, 118, 0.3);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

function SidebarPlayer({
  courseTitle = "React Mastery Course",
  chapters = [],
  currentLessonId = null,
  onLessonSelect,
  completedLessons = [],
  totalDuration = "12h 30m"
}) {
  const [expandedChapters, setExpandedChapters] = useState(new Set(['chapter-1']));
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Sample data if none provided
  const defaultChapters = [
    {
      id: 'chapter-1',
      title: 'Introduction',
      icon: '🚀',
      lessons: [
        { id: 'lesson-1-1', title: 'Course Overview', duration: '5:30' },
        { id: 'lesson-1-2', title: 'Setting Up Environment', duration: '12:45' },
        { id: 'lesson-1-3', title: 'Development Tools', duration: '8:20' }
      ]
    },
    {
      id: 'chapter-2',
      title: 'Fundamentals',
      icon: '⚡',
      lessons: [
        { id: 'lesson-2-1', title: 'Components Basics', duration: '15:30' },
        { id: 'lesson-2-2', title: 'Props and State', duration: '18:45' },
        { id: 'lesson-2-3', title: 'Event Handling', duration: '12:15' }
      ]
    },
    {
      id: 'chapter-3',
      title: 'Advanced Concepts',
      icon: '🔥',
      lessons: [
        { id: 'lesson-3-1', title: 'Hooks Deep Dive', duration: '22:30' },
        { id: 'lesson-3-2', title: 'Context API', duration: '16:45' },
        { id: 'lesson-3-3', title: 'Performance Optimization', duration: '19:20' }
      ]
    },
    {
      id: 'chapter-4',
      title: 'Real-World Projects',
      icon: '🏗️',
      lessons: [
        { id: 'lesson-4-1', title: 'Todo Application', duration: '35:30' },
        { id: 'lesson-4-2', title: 'Weather Dashboard', duration: '28:45' },
        { id: 'lesson-4-3', title: 'E-commerce Site', duration: '45:15' }
      ]
    }
  ];

  const chaptersData = chapters.length > 0 ? chapters : defaultChapters;
  const completedSet = new Set(completedLessons);

  const toggleChapter = (chapterId) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const handleLessonClick = (lesson, chapterId) => {
    onLessonSelect?.(lesson, chapterId);
    setIsMobileOpen(false); // Close mobile sidebar after selection
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Calculate progress
  const totalLessons = chaptersData.reduce((sum, chapter) => sum + chapter.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  return (
    <>
      <MobileToggle onClick={toggleMobileSidebar}>
        ☰
      </MobileToggle>

      <Overlay isOpen={isMobileOpen} onClick={() => setIsMobileOpen(false)} />

      <SidebarContainer isOpen={isMobileOpen}>
        <SidebarHeader>
          <CourseTitle>{courseTitle}</CourseTitle>
          <CourseProgress>
            <span>{completedCount}/{totalLessons}</span>
            <ProgressBar>
              <ProgressFill progress={progressPercentage} />
            </ProgressBar>
            <ProgressPercentage>{Math.round(progressPercentage)}%</ProgressPercentage>
          </CourseProgress>
        </SidebarHeader>

        <ContentContainer>
          {chaptersData.map((chapter) => {
            const isExpanded = expandedChapters.has(chapter.id);
            const hasActiveLesson = chapter.lessons.some(lesson => lesson.id === currentLessonId);

            return (
              <ChapterSection key={chapter.id}>
                <ChapterHeader
                  active={hasActiveLesson}
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <ChapterTitle>
                    <ChapterIcon>{chapter.icon}</ChapterIcon>
                    <span>{chapter.title}</span>
                  </ChapterTitle>
                  <ExpandIcon expanded={isExpanded}>▼</ExpandIcon>
                </ChapterHeader>

                <LessonList expanded={isExpanded}>
                  {chapter.lessons.map((lesson) => (
                    <LessonItem
                      key={lesson.id}
                      active={lesson.id === currentLessonId}
                      completed={completedSet.has(lesson.id)}
                      onClick={() => handleLessonClick(lesson, chapter.id)}
                    >
                      <LessonStatus
                        active={lesson.id === currentLessonId}
                        completed={completedSet.has(lesson.id)}
                      />
                      <LessonContent>
                        <LessonTitle active={lesson.id === currentLessonId}>
                          {lesson.title}
                        </LessonTitle>
                        <LessonDuration>{lesson.duration}</LessonDuration>
                      </LessonContent>
                    </LessonItem>
                  ))}
                </LessonList>
              </ChapterSection>
            );
          })}
        </ContentContainer>

        <SidebarFooter>
          <CompletionStats>
            <CompletionLabel>Progress</CompletionLabel>
            <CompletionValue>{Math.round(progressPercentage)}% Complete</CompletionValue>
          </CompletionStats>
          <TimeRemaining>
            Total Duration: {totalDuration}
          </TimeRemaining>
        </SidebarFooter>
      </SidebarContainer>

      <style jsx global>{`
        :root {
          --primary: #00E676;
          --primary-dark: #00C853;
          --background-dark: #101310;
          --card-background: #181d19;
          --text-light: rgba(255, 255, 255, 0.87);
          --text-secondary: rgba(255, 255, 255, 0.6);
          --border-color: #333;
          --heading-color: white;
          --mode-text: white;
        }
        
        body {
          margin: 0;
          padding: 0;
          background: var(--background-dark);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
      `}</style>
    </>
  );
}

export default SidebarPlayer;