// hooks/useFilteredCourses.js
import { useMemo } from 'react';

export const useFilteredCourses = (coursesData, searchQuery, filters, sortBy) => {
  return useMemo(() => {
    let filtered = coursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(course.category);
      const matchesDifficulty = filters.difficulties.length === 0 || filters.difficulties.includes(course.difficulty);
      const matchesPrice = course.price <= filters.maxPrice;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
    });

    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.students - a.students);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'duration':
        return filtered.sort((a, b) => a.duration - b.duration);
      default:
        return filtered;
    }
  }, [coursesData, searchQuery, filters, sortBy]);
};
