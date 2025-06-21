import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Tabs, Tab, Alert, Spinner } from 'react-bootstrap';
import { FaEdit, FaArrowLeft, FaBook, FaVideo, FaQuestionCircle, FaCheckCircle, FaClock, FaGraduationCap } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import SectionManager from "../Section/SectionManager"
import QuizEditor from "../Quiz/QuizEditor"
import { fetchCourseById } from '../../../../store/courseSlice';
import VideoUploader from '../Video/VideoUploader';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState('sections');

  const { current: course, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    if (id) dispatch(fetchCourseById({ courseId: id }));
  }, [id]);

  const handleSectionUpdate = () => {
    if (id) dispatch(fetchCourseById({ courseId: id }));
  };

  const getLevelBadgeVariant = (level) => {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <Sidebar>
          <SidebarIcon>
            <FaGraduationCap />
          </SidebarIcon>
        </Sidebar>
        <LoadingContainer>
          <StyledSpinner animation="border" />
          <LoadingText>Loading course details...</LoadingText>
        </LoadingContainer>
      </PageWrapper>
    );
  }

  if (error || !course) {
    return (
      <PageWrapper>
        <Sidebar>
          <SidebarIcon>
            <FaGraduationCap />
          </SidebarIcon>
        </Sidebar>
        <ContentContainer>
          <StyledAlert variant="danger">
            {error || 'Course not found'}
          </StyledAlert>
          <StyledButton className="btn-outline-primary" onClick={() => navigate('/instructor/courses')}>
            <FaArrowLeft /> Back to Courses
          </StyledButton>
        </ContentContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Sidebar>
        <SidebarIcon onClick={() => navigate('/')}>
          <FaGraduationCap />
        </SidebarIcon>
        <SidebarIcon>
          <FaBook />
        </SidebarIcon>
        <SidebarIcon>
          <FaVideo />
        </SidebarIcon>
        <SidebarIcon>
          <FaQuestionCircle />
        </SidebarIcon>
      </Sidebar>

      <ContentContainer>
        <BackButtonContainer>
          <StyledButton className="btn-outline-primary" onClick={() => navigate('/dashboard/instructor/courses')}>
            <FaArrowLeft /> Back to Courses
          </StyledButton>
        </BackButtonContainer>

        <CourseHero>
          <Row>
            <Col lg={8}>
              <div className="d-flex align-items-start justify-content-between mb-4">
                <div>
                  <h1>{course.title}</h1>
                
                </div>
                <Link to={`/dashboard/instructor/course/edit/${course._id}`}>
                  <StyledButton className="btn-primary">
                    <FaEdit /> Edit Course
                  </StyledButton>
                </Link>
              </div>
              <p className="lead">{course.description}</p>
              <CourseMetadata>
                <div className="metadata-item">
                  <strong>Educator</strong>
                  <span>{course.educator}</span>
                </div>
                <div className="metadata-item">
                  <strong>Price</strong>
                  <span>${course.price}</span>
                </div>
                <div className="metadata-item">
                  <strong>Level</strong>
                  <StyledBadge className={`bg-${getLevelBadgeVariant(course.level)}`}>
                    {course.level}
                  </StyledBadge>
                </div>
              </CourseMetadata>

              <div>
                {course.tags && course.tags.map((tag, index) => (
                  <StyledBadge key={index} className="bg-secondary">
                    {tag}
                  </StyledBadge>
                ))}
              </div>
            </Col>
            <Col lg={4}>
              <CourseImage
                src={course.imageUrl || 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=400'}
                alt={course.title}
              />
            </Col>
          </Row>
        </CourseHero>

        <Row>
          <Col>
            <StyledCard>
              <Card.Header className="p-0">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="border-0"
                >
                  <Tab
                    eventKey="sections"
                    title={<span><FaBook className="me-2" />Sections</span>}
                  />
                  <Tab
                    eventKey="videos"
                    title={<span><FaVideo className="me-2" />Videos</span>}
                  />
                  <Tab
                    eventKey="quizzes"
                    title={<span><FaQuestionCircle className="me-2" />Quizzes</span>}
                  />
                </Tabs>
              </Card.Header>

              <TabContent>
                {activeTab === 'sections' && (
                  <SectionManager
                    courseId={course._id}
                    sections={course.sections || []}
                    onUpdate={handleSectionUpdate}
                  />
                )}
                {activeTab === 'videos' && (
                  <VideoUploader
                    courseId={course._id}
                    sections={course.sections || []}
                    onUpdate={handleSectionUpdate}
                  />
                )}
                {activeTab === 'quizzes' && (
                  <QuizEditor
                    courseId={course._id}
                    sections={course.sections || []}
                    onUpdate={handleSectionUpdate}
                  />
                )}
              </TabContent>
            </StyledCard>
          </Col>
        </Row>
      </ContentContainer>
    </PageWrapper>
  );
};

export default CourseDetail;


// Main wrapper with sidebar space and background
const PageWrapper = styled.div`
  margin-left: 60px;
  min-height: 100vh;
  background: var(--background-dark);
  background-attachment: fixed;
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background-dark);
    z-index: -1;
  }
`;

// Sidebar component
const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 60px;
  height: 100vh;
  background: var(--card-background);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  z-index: 1000;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
`;

const SidebarIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4);
  }
`;

// Content container with proper centering
const ContentContainer = styled(Container)`
  max-width: 1400px !important;
  padding: 2rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const StyledCard = styled(Card)`
  background: var(--card-background) !important;
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
  border-radius: 16px !important;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5) !important;
    border-color: var(--primary) !important;
  }
  
  .card-header {
    background: var(--card-background) !important;
    border-bottom: 1px solid var(--border-color) !important;
    backdrop-filter: blur(10px);
  }
  
  .nav-tabs {
    border-bottom: none !important;
    
    .nav-link {
      color: var(--text-secondary) !important;
      background: transparent !important;
      border: none !important;
      padding: 1rem 2rem !important;
      font-weight: 600;
      transition: all 0.3s ease;
      border-radius: 12px 12px 0 0 !important;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--primary), var(--primary-dark));
        transition: all 0.3s ease;
        transform: translateX(-50%);
      }
      
      &:hover {
        color: var(--primary) !important;
        background: rgba(0, 230, 118, 0.1) !important;
        transform: translateY(-2px);
        
        &::before {
          width: 80%;
        }
      }
      
      &.active {
        color: var(--primary) !important;
        background: rgba(0, 230, 118, 0.15) !important;
        
        &::before {
          width: 100%;
        }
      }
    }
  }
`;

const CourseHero = styled.div`
  background: var(--card-background);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(0, 230, 118, 0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  
  h1 {
    color: var(--heading-color);
    font-weight: 800;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 2;
  }
  
  .lead {
    color: var(--text-light);
    font-size: 1.2rem;
    line-height: 1.7;
    font-weight: 400;
    position: relative;
    z-index: 2;
  }
  
  strong {
    color: var(--heading-color);
    font-weight: 700;
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid var(--border-color);
  
  &:hover {
    transform: scale(1.03) rotate(1deg);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    border-color: var(--primary);
  }
`;

const StyledBadge = styled(Badge)`
  margin-right: 0.8rem;
  margin-bottom: 0.8rem;
  padding: 0.6rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 25px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  &.bg-success {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark)) !important;
    color: #1a1a1a !important;
  }
  
  &.bg-warning {
    background: linear-gradient(135deg, #fbbf24, #f59e0b) !important;
    color: #1a1a1a !important;
  }
  
  &.bg-danger {
    background: linear-gradient(135deg, #ef4444, #dc2626) !important;
    color: #ffffff !important;
  }
  
  &.bg-secondary {
    background: linear-gradient(135deg, #64748b, #475569) !important;
    color: #ffffff !important;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &.btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark)) !important;
    border: none !important;
    color: #1a1a1a !important;
    
    &:hover {
      background: linear-gradient(135deg, var(--primary-dark), var(--primary)) !important;
      box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4);
    }
  }
  
  &.btn-outline-primary {
    color: var(--primary) !important;
    border: 2px solid var(--primary) !important;
    background: transparent !important;
    
    &:hover {
      background: var(--primary) !important;
      color: #1a1a1a !important;
      border-color: var(--primary) !important;
      box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4);
    }
  }
`;

const TabContent = styled.div`
  background: var(--background-dark);
  backdrop-filter: blur(10px);
  border-radius: 0 0 16px 16px;
  padding: 2rem;
  border-top: none;
  min-height: 400px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledSpinner = styled(Spinner)`
  color: var(--primary) !important;
  width: 3rem;
  height: 3rem;
`;

const LoadingText = styled.p`
  color: var(--text-light);
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const StyledAlert = styled(Alert)`
  background: var(--card-background) !important;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color) !important;
  color: var(--text-light) !important;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(220, 53, 69, 0.2);
`;

const CourseMetadata = styled.div`
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  
  .metadata-item {
    background: var(--background-dark);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
    }
  }
  
  strong {
    color: var(--heading-color);
    margin-right: 0.5rem;
    font-weight: 700;
    display: block;
    margin-bottom: 0.3rem;
  }
  
  span {
    color: var(--text-light);
    font-size: 1.1rem;
  }
`;

const BackButtonContainer = styled.div`
  margin-bottom: 2rem;
  position: sticky;
  top: 20px;
  z-index: 100;
`;