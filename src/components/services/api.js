import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Course API
export const courseAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (course) => api.post('/courses', course),
  update: (id, course) => api.put(`/courses/${id}`, course),
  delete: (id) => api.delete(`/courses/${id}`),
};

// Section API  
export const sectionAPI = {
  getAll: () => api.get('/sections'),
  getByCourseId: (courseId) => api.get(`/sections?courseId=${courseId}`),
  getById: (id) => api.get(`/sections/${id}`),
  create: (section) => api.post('/sections', section),
  update: (id, section) => api.put(`/sections/${id}`, section),
  delete: (id) => api.delete(`/sections/${id}`),
};

// Video API
export const videoAPI = {
  getAll: () => api.get('/videos'),
  getBySectionId: (sectionId) => api.get(`/videos?sectionId=${sectionId}`),
  getById: (id) => api.get(`/videos/${id}`),
  create: (video) => api.post('/videos', video),
  update: (id, video) => api.put(`/videos/${id}`, video),
  delete: (id) => api.delete(`/videos/${id}`),
};

// Quiz API
export const quizAPI = {
  getAll: () => api.get('/quizzes'),
  getBySectionId: (sectionId) => api.get(`/quizzes?sectionId=${sectionId}`),
  getById: (id) => api.get(`/quizzes/${id}`),
  create: (quiz) => api.post('/quizzes', quiz),
  update: (id, quiz) => api.put(`/quizzes/${id}`, quiz),
  delete: (id) => api.delete(`/quizzes/${id}`),
};

export default api;