import React, { createContext, useState } from 'react';

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [animate, setAnimate] = useState(false);

  return (
    <AnimationContext.Provider value={{ animate, setAnimate }}>
      {children}
    </AnimationContext.Provider>
  );
};
