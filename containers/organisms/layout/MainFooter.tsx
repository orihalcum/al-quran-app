import React from 'react';
import { Container } from './MainContainer';

const MainFooter = ({ children }) => {
  return (
    <div className="fixed bottom-0 w-full py-3.5 sm:py-5 px-3.5 sm:px-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <Container className="flex">
        {children}
      </Container>
    </div>
  );
};

export default MainFooter;