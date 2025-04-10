"use client";

import { useContext } from 'react';
import UserContext from '../context/User/User.context';

/**
 * Hook to access UserContext functionality including cart, profile, and authentication
 * @returns All user context methods and properties
 */
export default function useUser() {
  // Get the context
  const context = useContext(UserContext);
  
  // Check if context exists
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  // Return the full context which now has all the functionality built in
  return context;
}