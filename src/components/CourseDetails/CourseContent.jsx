import { useState } from "react";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";
import { fadeInUp } from "../common/Animations";
import { FaPlayCircle } from "react-icons/fa";

const CourseContent = ({ curriculum }) => {
  const [activeKey, setActiveKey] = useState('0');

  return (
    <SectionContainer>
      <SectionTitle>Course content</SectionTitle>
      <StyledAccordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        {curriculum.map((module, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>
              <ModuleHeaderContent>
                <ModuleTitle>{module.title}</ModuleTitle>
                <ModuleInfo>{module.duration}</ModuleInfo>
              </ModuleHeaderContent>
            </Accordion.Header>
            <Accordion.Body>
              <LessonList>
                {module.lessons.map((lesson, i) => (
                  <LessonItem key={i}>
                    <FaPlayCircle /> {lesson}
                  </LessonItem>
                ))}
              </LessonList>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </StyledAccordion>
    </SectionContainer>
  );
};

export default CourseContent;

// Course Content Components

const SectionTitle = styled.h3`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 24px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    border-radius: 2px;
  }
`;
const SectionContainer = styled.div`
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  animation: ${fadeInUp} 0.6s ease-out;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 230, 118, 0.3);
  }
`;
const StyledAccordion = styled(Accordion)`
  .accordion-item {
    background-color: transparent;
    border: 1px solid var(--border-color);
    border-radius: 16px !important;
    margin-bottom: 16px;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(0, 230, 118, 0.3);
    }
  }

  .accordion-header {
    button {
      background: linear-gradient(135deg, var(--card-background) 0%, rgba(24, 29, 25, 0.8) 100%);
      color: var(--heading-color);
      font-weight: 600;
      width: 100%;
      text-align: left;
      border: none;
      padding: 20px 28px;
      box-shadow: none !important;
      font-size: 1.1rem;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, rgba(24, 29, 25, 0.9) 0%, var(--card-background) 100%);
      }

      &:after {
        display: none;
      }
    }
  }

  .accordion-body {
    background-color: var(--background-dark);
    color: var(--text-light);
    padding: 20px 28px;
    border-top: 1px solid var(--border-color);
  }
`;

const ModuleHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const ModuleTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

const ModuleInfo = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const LessonList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

const LessonItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: var(--primary);
    padding-left: 8px;
  }
  
  svg {
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: var(--primary);
  }
`;