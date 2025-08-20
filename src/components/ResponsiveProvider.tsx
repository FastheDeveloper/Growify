import React, { createContext, useContext } from 'react';
// useDimensions
import { getResponsiveSizes, ResponsiveSizes } from '../utils/responsiveSizes';

import { useDimensions } from '../hooks/useDimensions';

interface ResponsiveContextType {
  device: ReturnType<typeof useDimensions>;
  sizes: ResponsiveSizes;
}

const ResponsiveContext = createContext<ResponsiveContextType | null>(null);

export const ResponsiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const device = useDimensions();
  const sizes = getResponsiveSizes(device);

  return (
    <ResponsiveContext.Provider value={{ device, sizes }}>{children}</ResponsiveContext.Provider>
  );
};

export const useResponsive = (): ResponsiveContextType => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within ResponsiveProvider');
  }
  return context;
};
