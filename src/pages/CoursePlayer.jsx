// CoursePlayer.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarPlayer from '../components/CoursePlayer/SidebarPlayer';
import VideoPlayer from '../components/CoursePlayer/VideoPlayer';
import TabsSection from '../components/CoursePlayer/TabsSection';
import { fetchSectionsByCourse } from '../store/sectionSlice';
import { fetchVideosBySection } from '../store/videoSlice';
import { getAllSectionExams } from '../store/examSlice';
import {
  setCurrentVideo,
  setCurrentSection,
  markVideoComplete,
  setVideoProgress
} from '../store/playerSlice';

const CoursePlayerWrapper = styled.div`
  background-color: var(--background-dark, #101310);
  color: var(--text-light, rgba(255, 255, 255, 0.87));
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

  :root {
    --primary: #00E676;
    --primary-dark: #00C853;
    --background-dark: #101310;
    --card-background: #181d19;
    --text-light: rgba(255, 255, 255, 0.87);
    --text-secondary: rgba(255, 255, 255, 0.6);
    --border-color: #333;
    --heading-color: white;
  }
`;

const MainContainer = styled(Container)`
  padding: 0;
  max-width: 100%;
  
  @media (min-width: 1200px) {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }
`;

const ResponsiveRow = styled(Row)`
  margin: 0;
  min-height: calc(100vh - 80px);
  
  @media (max-width: 767.98px) {
    flex-direction: column;
  }
`;

const SidebarCol = styled(Col)`
  padding: 0;
  background-color: var(--card-background);
  border-right: 1px solid var(--border-color);
  
  @media (max-width: 767.98px) {
    order: 2;
    min-height: 300px;
    border-right: none;
    border-top: 1px solid var(--border-color);
  }
  
  @media (min-width: 768px) {
    position: sticky;
    top: 80px;
    height: calc(100vh - 80px);
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--background-dark);
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: var(--primary-dark);
    }
  }
  
  @media (min-width: 1200px) {
    flex: 0 0 320px;
    max-width: 320px;
  }
`;

const MainContentCol = styled(Col)`
  padding: 0;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 767.98px) {
    order: 1;
  }
`;

const VideoSection = styled.div`
  background-color: var(--background-dark);
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 60vh;
`;

const NavigationSection = styled.div`
  background-color: var(--card-background);
  border-top: 1px solid var(--border-color);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const NavButton = styled.button`
  background: ${props => props.primary ?
    'linear-gradient(135deg, var(--primary), var(--primary-dark))' :
    'transparent'};
  border: ${props => props.primary ? 'none' : '2px solid var(--primary)'};
  border-radius: 12px;
  padding: 12px 24px;
  color: ${props => props.primary ? '#000' : 'var(--primary)'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover:not(:disabled) {
    background: ${props => props.primary ?
    'linear-gradient(135deg, var(--primary), var(--primary-dark))' :
    'var(--primary)'};
    color: ${props => props.primary ? '#000' : '#000'};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const TabsWrapper = styled.div`
  background-color: var(--card-background);
  border-top: 1px solid var(--border-color);
  flex: 1;
  min-height: 40vh;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--card-background);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: var(--primary-dark);
  }
`;

function CoursePlayer() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { sections, loading: sectionLoading } = useSelector((state) => state.section);
  const { videos } = useSelector((state) => state.video);
  const { sectionExams } = useSelector((state) => state.exam);
  const {
    currentVideo,
    currentSection,
    completedVideos,
    videoProgress
  } = useSelector((state) => state.player);

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (courseId && token) {
      dispatch(fetchSectionsByCourse({ courseId, token }));
    }
  }, [courseId, token, dispatch]);

  useEffect(() => {
    const fetchAllData = async () => {
      if (sections.length > 0 && token) {
        // Fetch videos for all sections
        for (const section of sections) {
          await dispatch(fetchVideosBySection({ sectionId: section._id, token }));
        }

        // Fetch exams for all sections
        await dispatch(getAllSectionExams({ sections, token }));
      }
    };

    fetchAllData();
  }, [sections, token, dispatch]);

  useEffect(() => {
    // Transform sections and videos into chapters format
    const transformedChapters = sections.map((section, index) => {
      const sectionVideos = videos.filter(video => video.sectionId === section._id);
      const sectionExam = sectionExams[section._id]?.[0];

      return {
        id: section._id,
        title: section.title,
        icon: getChapterIcon(index),
        lessons: sectionVideos.map((video, videoIndex) => ({
          id: video._id,
          title: video.title,
          duration: formatDuration(video.duration || 300), // Default 5 min
          url: video.url,
          sectionId: section._id,
          order: video.order || videoIndex + 1
        })),
        exam: sectionExam ? {
          id: sectionExam._id,
          title: sectionExam.title,
          questions: sectionExam.mcq || []
        } : null
      };
    });

    setChapters(transformedChapters);

    // Set initial video if none selected
    if (!currentVideo && transformedChapters.length > 0 && transformedChapters[0].lessons.length > 0) {
      const firstVideo = transformedChapters[0].lessons[0];
      dispatch(setCurrentVideo(firstVideo));
      dispatch(setCurrentSection(transformedChapters[0].id));
    }
  }, [sections, videos, sectionExams, currentVideo, dispatch]);

  const getChapterIcon = (index) => {
    const icons = ['🚀', '⚡', '🔥', '🏗️', '💎', '🎯', '🌟', '🎨'];
    return icons[index % icons.length];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLessonSelect = (lesson, chapterId) => {
    dispatch(setCurrentVideo(lesson));
    dispatch(setCurrentSection(chapterId));
  };

  const handleVideoProgress = (progress) => {
    if (currentVideo) {
      dispatch(setVideoProgress({ videoId: currentVideo.id, progress }));
    }
  };

  const handleVideoComplete = () => {
    if (currentVideo) {
      dispatch(markVideoComplete(currentVideo.id));
      handleNext();
    }
  };

  const getCurrentVideoIndex = () => {
    const currentChapter = chapters.find(ch => ch.id === currentSection);
    if (!currentChapter) return -1;
    return currentChapter.lessons.findIndex(lesson => lesson.id === currentVideo?.id);
  };

  const handleNext = () => {
    const currentChapter = chapters.find(ch => ch.id === currentSection);
    if (!currentChapter) return;

    const currentIndex = getCurrentVideoIndex();

    if (currentIndex < currentChapter.lessons.length - 1) {
      // Next video in same section
      const nextVideo = currentChapter.lessons[currentIndex + 1];
      dispatch(setCurrentVideo(nextVideo));
    } else {
      // Check if there's an exam for this section
      if (currentChapter.exam) {
        navigate(`/quiz/${currentChapter.exam.id}`);
      } else {
        // Move to next section
        const currentChapterIndex = chapters.findIndex(ch => ch.id === currentSection);
        if (currentChapterIndex < chapters.length - 1) {
          const nextChapter = chapters[currentChapterIndex + 1];
          if (nextChapter.lessons.length > 0) {
            dispatch(setCurrentVideo(nextChapter.lessons[0]));
            dispatch(setCurrentSection(nextChapter.id));
          }
        }
      }
    }
  };

  const handlePrevious = () => {
    const currentChapter = chapters.find(ch => ch.id === currentSection);
    if (!currentChapter) return;

    const currentIndex = getCurrentVideoIndex();

    if (currentIndex > 0) {
      // Previous video in same section
      const prevVideo = currentChapter.lessons[currentIndex - 1];
      dispatch(setCurrentVideo(prevVideo));
    } else {
      // Move to previous section's last video
      const currentChapterIndex = chapters.findIndex(ch => ch.id === currentSection);
      if (currentChapterIndex > 0) {
        const prevChapter = chapters[currentChapterIndex - 1];
        if (prevChapter.lessons.length > 0) {
          const lastVideo = prevChapter.lessons[prevChapter.lessons.length - 1];
          dispatch(setCurrentVideo(lastVideo));
          dispatch(setCurrentSection(prevChapter.id));
        }
      }
    }
  };

  const canGoNext = () => {
    const currentChapter = chapters.find(ch => ch.id === currentSection);
    if (!currentChapter) return false;

    const currentIndex = getCurrentVideoIndex();
    const isLastVideoInSection = currentIndex === currentChapter.lessons.length - 1;
    const currentChapterIndex = chapters.findIndex(ch => ch.id === currentSection);
    const isLastSection = currentChapterIndex === chapters.length - 1;

    return !isLastVideoInSection || currentChapter.exam || !isLastSection;
  };

  const canGoPrevious = () => {
    const currentChapter = chapters.find(ch => ch.id === currentSection);
    if (!currentChapter) return false;

    const currentIndex = getCurrentVideoIndex();
    const currentChapterIndex = chapters.findIndex(ch => ch.id === currentSection);

    return currentIndex > 0 || currentChapterIndex > 0;
  };

  const shouldShowExamButton = () => {
    const currentChapter = chapters.find(ch => ch.id === currentSection);
    if (!currentChapter || !currentChapter.exam) return false;

    const currentIndex = getCurrentVideoIndex();
    return currentIndex === currentChapter.lessons.length - 1;
  };

  const handleTakeExam = () => {
    const currentChapter = chapters.find(ch => ch.id === currentSection);
    if (currentChapter?.exam) {
      navigate(`/quiz/${currentChapter.exam.id}`);
    }
  };

  const calculateProgress = () => {
    const totalVideos = chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0);
    const completedCount = completedVideos.length;
    return totalVideos > 0 ? (completedCount / totalVideos) * 100 : 0;
  };

  if (sectionLoading) {
    return (
      <CoursePlayerWrapper>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-color)',
            borderTop: '3px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      </CoursePlayerWrapper>
    );
  }

  return (
    <CoursePlayerWrapper>

      <MainContainer fluid>
        <ResponsiveRow>
          <SidebarCol md={3} lg={3} xl={3}>
            <SidebarPlayer
              courseTitle="React Mastery Course"
              chapters={chapters}
              currentLessonId={currentVideo?.id}
              onLessonSelect={handleLessonSelect}
              completedLessons={completedVideos}
              totalDuration="12h 30m"
            />
          </SidebarCol>

          <MainContentCol md={9} lg={9} xl={9}>
            <VideoSection>
              <VideoPlayer
                src={currentVideo?.url}
                onProgress={handleVideoProgress}
                onEnded={handleVideoComplete}
              />

              <NavigationSection>
                <NavButton
                  onClick={handlePrevious}
                  disabled={!canGoPrevious()}
                >
                  ← Previous
                </NavButton>

                <div style={{ display: 'flex', gap: '12px' }}>
                  {shouldShowExamButton() && (
                    <NavButton
                      primary
                      onClick={handleTakeExam}
                    >
                      🎯 Take Exam
                    </NavButton>
                  )}

                  <NavButton
                    primary={!shouldShowExamButton()}
                    onClick={handleNext}
                    disabled={!canGoNext()}
                  >
                    Next →
                  </NavButton>
                </div>
              </NavigationSection>
            </VideoSection>

            <TabsWrapper>
              <TabsSection
                onMarkComplete={handleVideoComplete}
                onSaveNotes={(note) => console.log('Saving note:', note)}
                isCompleted={completedVideos.includes(currentVideo?.id)}
              />
            </TabsWrapper>
          </MainContentCol>
        </ResponsiveRow>
      </MainContainer>
    </CoursePlayerWrapper>
  );
}

export default CoursePlayer;
