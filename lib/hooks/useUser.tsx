"use client";

import { useContext } from 'react';
import UserContext from '../context/User/User.context';

/**
 * Debug wrapper around useUser hook
 * @returns Modified user context with debugging for cart operations
 */
export default function useUser() {
  // Get the original context
  const context = useContext(UserContext);
  
  // Check if context exists
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  // Create a debugging wrapper for updateItemQuantity
  const originalUpdateItemQuantity = context.updateItemQuantity;
  
  // Override the method with a debugging version
  const debugUpdateItemQuantity = (key: string, changeAmount: number) => {
    console.log(`[useUser] updateItemQuantity called with:`, {
      key,
      changeAmount,
      timestamp: Date.now(),
      currentCart: [...context.cart],
      stackTrace: new Error().stack
    });
    
    // Call the original with enforced +1/-1 change
    const safeChangeAmount = changeAmount > 0 ? 1 : -1;
    return originalUpdateItemQuantity(key, safeChangeAmount);
  };
  
  // Return the modified context
  return {
    ...context,
    updateItemQuantity: debugUpdateItemQuantity
  };
}