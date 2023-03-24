import React, { ReactNode } from 'react';


type Props = {
  children?: ReactNode,
  className?: string,
  style?: Object
}

const MainContainer = ({ children, className = "p-3.5 sm:p-6", style }: Props) => {
  return (
    <Container className={`bg-white mt-14 ${className}`} style={style}>
      {children}
    </Container>
  );
};

export default MainContainer;


export const Container = ({ children, className = "", style }: Props) => (
  <div 
    className={`w-full max-w-3xl mx-auto ${className}`} 
    style={style}
  >
    {children}
  </div>
)