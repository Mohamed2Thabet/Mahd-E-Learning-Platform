import { useState, useEffect } from "react";
import { Accordion, Spinner } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { fadeInUp } from "../common/Animations";
import { FaPlayCircle, FaClock, FaExclamationTriangle, FaInbox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSectionsByCourse } from "../../store/sectionSlice";
import { fetchVideosBySection } from "../../store/videoSlice";

const CourseContent = ({ courseId }) => {
  const [activeKey, setActiveKey] = useState("0");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { sections, loading: sectionLoading, error: sectionError } = useSelector((state) => state.section);
  const { videos, loading: videoLoading, error: videoError } = useSelector((state) => state.video);

  useEffect(() => {
    if (courseId && token) {
      dispatch(fetchSectionsByCourse({ courseId, token }));
    }
  }, [courseId, token, dispatch]);

  useEffect(() => {
    const fetchAllSectionVideos = async () => {
      if (sections.length > 0 && token) {
        for (const section of sections) {
          await dispatch(fetchVideosBySection({ sectionId: section._id, token }));
        }
      }
    };

    fetchAllSectionVideos();
  }, [sections, token, dispatch]);

  // Invalid credentials/course info
  if (!courseId || !token) {
    return (
      <SectionContainer>
        <ErrorState>
          <ErrorIcon>
            <FaExclamationTriangle />
          </ErrorIcon>
          <ErrorTitle>Invalid Credentials</ErrorTitle>
          <ErrorMessage>Please check your information and try again.</ErrorMessage>
          <RetryButton onClick={() => window.location.reload()}>
            Retry
          </RetryButton>
        </ErrorState>
      </SectionContainer>
    );
  }

  // Loading state
  if (sectionLoading || videoLoading) {
    return (
      <SectionContainer>
        <LoadingState>
          <LoadingSpinner>
            <Spinner animation="border" variant="primary" />
          </LoadingSpinner>
          <LoadingTitle>Loading</LoadingTitle>
          <LoadingMessage>⏳ Loading, please wait...</LoadingMessage>
          <LoadingProgress />
        </LoadingState>
      </SectionContainer>
    );
  }

  // Error state
  if (sectionError || videoError) {
    return (
      <SectionContainer>
        <ErrorState>
          <ErrorIcon>
            <FaExclamationTriangle />
          </ErrorIcon>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>⚠️ {sectionError || videoError}</ErrorMessage>
          <RetryButton onClick={() => window.location.reload()}>
            Try Again
          </RetryButton>
        </ErrorState>
      </SectionContainer>
    );
  }

  // No data state
  if (!sections || sections.length === 0) {
    return (
      <SectionContainer>
        <EmptyState>
          <EmptyIcon>
            <FaInbox />
          </EmptyIcon>
          <EmptyTitle>No Content Available</EmptyTitle>
          <EmptyMessage>📭 No course content found.</EmptyMessage>
          <EmptySubMessage>This course doesn't have any sections yet.</EmptySubMessage>
        </EmptyState>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle>Course Content</SectionTitle>
      <CourseStats>
        <StatItem>
          <StatNumber>{sections.length}</StatNumber>
          <StatLabel>Sections</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>
            {sections.reduce((total, section) => {
              const sectionVideos = Array.isArray(section.videos)
                ? section.videos.map((videoId) => videos.find((v) => v._id === videoId)).filter(Boolean)
                : [];
              return total + sectionVideos.length;
            }, 0)}
          </StatNumber>
          <StatLabel>Lessons</StatLabel>
        </StatItem>
      </CourseStats>

      <StyledAccordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        {sections.map((section, index) => {
          const sectionVideos = Array.isArray(section.videos)
            ? section.videos.map((videoId) => videos.find((v) => v._id === videoId)).filter(Boolean)
            : [];

          return (
            <AccordionItemWrapper key={section._id}>
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>
                  <ModuleHeaderContent>
                    <ModuleTitle>{section.title}</ModuleTitle>
                    <ModuleInfo>
                      {sectionVideos.length} lesson{sectionVideos.length !== 1 ? 's' : ''}
                    </ModuleInfo>
                  </ModuleHeaderContent>
                </Accordion.Header>
                <Accordion.Body>
                  {sectionVideos.length > 0 ? (
                    <LessonList>
                      {sectionVideos.map((video, videoIndex) => (
                        <LessonItem key={video._id}>
                          <LessonIcon>
                            <FaPlayCircle />
                          </LessonIcon>
                          <LessonContent>
                            <LessonTitle>{video.title}</LessonTitle>
                            <LessonMeta>
                              <FaClock /> {video?.duration}
                            </LessonMeta>
                          </LessonContent>
                          <LessonNumber>{videoIndex + 1}</LessonNumber>
                        </LessonItem>
                      ))}
                    </LessonList>
                  ) : (
                    <NoVideosMessage>
                      <FaInbox />
                      <span>No videos found for this section.</span>
                    </NoVideosMessage>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </AccordionItemWrapper>
          );
        })}
      </StyledAccordion>
    </SectionContainer>
  );
};

export default CourseContent;
// Animations
const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

// Main Container
const SectionContainer = styled.div`
  background: linear-gradient(135deg, var(--card-background) 0%, rgba(24, 29, 25, 0.95) 100%);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 32px;
  animation: ${fadeInUp} 0.6s ease-out;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    border-color: rgba(0, 230, 118, 0.4);
    box-shadow: 0 8px 32px rgba(0, 230, 118, 0.1);
    
    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
  }
`;

// Title
const SectionTitle = styled.h3`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 32px;
  position: relative;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    border-radius: 2px;
  }
`;

// Course Stats
const CourseStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 32px;
  padding: 20px;
  background: rgba(0, 230, 118, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(0, 230, 118, 0.1);
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Loading State
const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  margin-bottom: 24px;
  
  .spinner-border {
    width: 3rem;
    height: 3rem;
    border-width: 0.3em;
  }
`;

const LoadingTitle = styled.h4`
  color: var(--heading-color);
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 1.5rem;
`;

const LoadingMessage = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 24px;
`;

const LoadingProgress = styled.div`
  width: 200px;
  height: 4px;
  background: var(--border-color);
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    border-radius: 2px;
    animation: ${shimmer} 1.5s infinite;
  }
`;

// Error State
const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  color: #f44336;
  margin-bottom: 24px;
  animation: ${bounce} 1s ease-in-out;
`;

const ErrorTitle = styled.h4`
  color: var(--heading-color);
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 24px;
  max-width: 400px;
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 230, 118, 0.3);
  }
`;

// Empty State
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
  opacity: 0.7;
`;

const EmptyTitle = styled.h4`
  color: var(--heading-color);
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 1.5rem;
`;

const EmptyMessage = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 8px;
`;

const EmptySubMessage = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  opacity: 0.8;
`;

// Accordion Styles
const AccordionItemWrapper = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledAccordion = styled(Accordion)`
  .accordion-item {
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 16px !important;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(0, 230, 118, 0.4);
      box-shadow: 0 4px 20px rgba(0, 230, 118, 0.1);
    }
  }

  .accordion-header {
    button {
      background: linear-gradient(135deg, var(--card-background) 0%, rgba(24, 29, 25, 0.8) 100%);
      color: var(--heading-color);
      font-weight: 600;
      border: none;
      padding: 24px 28px;
      box-shadow: none !important;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        background: linear-gradient(135deg, rgba(24, 29, 25, 0.9) 0%, var(--card-background) 100%);
      }

      &:not(.collapsed) {
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        color: white;
      }

      &::after {
        display: none;
      }
    }
  }

  .accordion-body {
    background: var(--background-dark);
    color: var(--text-light);
    padding: 28px;
    border-top: 1px solid var(--border-color);
  }
`;

const ModuleHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ModuleTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

const ModuleInfo = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  background: rgba(0, 230, 118, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid rgba(0, 230, 118, 0.2);
`;

// Lesson Styles
const LessonList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LessonItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 8px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0, 230, 118, 0.05);
    padding-left: 12px;
    margin: 0 -12px;
  }
`;

const LessonIcon = styled.div`
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  ${LessonItem}:hover & {
    color: var(--primary);
    transform: scale(1.1);
  }
`;

const LessonContent = styled.div`
  flex: 1;
`;

const LessonTitle = styled.div`
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 4px;
  
  ${LessonItem}:hover & {
    color: var(--primary);
  }
`;

const LessonMeta = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LessonNumber = styled.div`
  background: var(--border-color);
  color: var(--text-secondary);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  ${LessonItem}:hover & {
    background: var(--primary);
    color: white;
  }
`;

const NoVideosMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px;
  color: var(--text-secondary);
  font-style: italic;
  
  svg {
    font-size: 1.5rem;
    opacity: 0.7;
  }
`;
