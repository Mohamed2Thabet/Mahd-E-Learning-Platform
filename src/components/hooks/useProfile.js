// ✅ hooks/useProfile.js
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfileNames } from '../../store/profileSlice';

const useProfile = () => {
  const dispatch = useDispatch();
  const reduxProfile = useSelector((state) => state.profile.data) || {};

  useEffect(() => {
    if (!reduxProfile?.firstName) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  const staticData = {
    location: 'Egypt',
    avatar: 'https://static.vecteezy.com/system/resources/previews/048/926/061/non_2x/bronze-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
    joinDate: 'January 2024',
    coursesEnrolled: 24,
    hoursLearned: 302,
    certifications: 12,
    completionRate: 78,
    currentStreak: 15,
    totalPoints: 2450,
    recentActivities: [
      {
        id: 1,
        type: 'completed',
        text: 'Completed "Introduction to Design Thinking"',
        date: '2 hours ago',
        points: 50
      },
      {
        id: 2,
        type: 'certificate',
        text: 'Earned "UI Design Expert" Certificate',
        date: '1 day ago',
        points: 100
      },
      {
        id: 3,
        type: 'started',
        text: 'Started "Advanced Prototyping with Figma"',
        date: '3 days ago',
        points: 0
      },
    ],
    learningPaths: [
      {
        id: 1,
        title: 'UI/UX Fundamentals',
        progress: 75,
        totalCourses: 8,
        completedCourses: 6,
        estimatedCompletion: '2 weeks'
      },
      {
        id: 2,
        title: 'Advanced Design Systems',
        progress: 50,
        totalCourses: 6,
        completedCourses: 3,
        estimatedCompletion: '1 month'
      },
      {
        id: 3,
        title: 'Frontend Development',
        progress: 25,
        totalCourses: 12,
        completedCourses: 3,
        estimatedCompletion: '3 months'
      },
    ],
    certificates: [
      {
        id: 1,
        title: 'UI/UX Fundamentals',
        date: 'Apr 15, 2025',
        issuer: 'MAHD Academy',
        credentialId: 'MAHD-2025-001'
      },
      {
        id: 2,
        title: 'Design Thinking',
        date: 'Dec 20, 2024',
        issuer: 'MAHD Academy',
        credentialId: 'MAHD-2024-045'
      },
      {
        id: 3,
        title: 'Advanced Prototyping',
        date: 'Nov 10, 2024',
        issuer: 'MAHD Academy',
        credentialId: 'MAHD-2024-032'
      },
    ]
  };

  const profileData = useMemo(() => {
    return {
      ...staticData,
      ...reduxProfile,
      name: `${reduxProfile.firstName || ''} ${reduxProfile.lastName || ''}`.trim(),
    };
  }, [reduxProfile]);

  const updateProfile = async ({ firstName, lastName }) => {
    await dispatch(updateProfileNames({ firstName, lastName }));
    await dispatch(fetchProfile()); // ⬅️ دا بيجبر البيانات إنها تتحدث بعد التحديث
  };
  
  const addActivity = (activity) => {
    const newActivity = { 
      ...activity,
      id: Date.now(),
      date: 'Just now'
    };
    staticData.recentActivities = [newActivity, ...staticData.recentActivities.slice(0, 4)];
  };

  const updateLearningPath = (pathId, progress) => {
    staticData.learningPaths = staticData.learningPaths.map((path) =>
      path.id === pathId ? { ...path, progress } : path
    );
  };

  return {
    profileData,
    updateProfile,
    addActivity,
    updateLearningPath
  };
};

export default useProfile;
