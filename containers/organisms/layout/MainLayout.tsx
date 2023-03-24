import Head from 'next/head';
import React, { ReactNode } from 'react';
import { Metadata } from '../../../interfaces';
import MainContainer from './MainContainer';
import MainHeader from './MainHeader';

type Props = {
  container?: string,
  children?: ReactNode,
  className?: string,
  metadata?: Metadata,
  headerProps?: HeaderProps
}

type HeaderProps = {
  title?: string,
  rightSider?: Object
}

const MainLayout = ({ container = 'fluid', children, className, metadata: { title }, headerProps }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="google" content="notranslate" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#FFF" />
      </Head>
      <MainHeader {...headerProps} />
      {
        container === 'main'
          ? <MainContainer className={className}>{children}</MainContainer>
          : <>{children}</>
      }
    </div>
  );
};

export default MainLayout;