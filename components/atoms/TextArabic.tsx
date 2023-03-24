import React, { ReactNode } from 'react';

type Props = {
  className?: string
  fontSize?:string
  children?: ReactNode
}

const TextArabic = ({ className, fontSize = 'text-2xl sm:text-3xl', children }: Props) => {
  return <div className={`font-arabic leading-10 sm:leading-loose font-thin ${className} ${fontSize}`} style={{ direction: 'rtl' }}>{children}</div>;
};

export default TextArabic;