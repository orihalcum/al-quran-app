import React, { ReactNode } from 'react';

type Props = {
  className?: string
  children?: ReactNode
}

const TextTranslation = ({ className = "", children }: Props) => {
  return <div className={`text-sm sm:text-md ${className}`}>{children}</div>
};

export default TextTranslation;