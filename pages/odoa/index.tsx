import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { MENU } from '../../config';
import MainLayout from '../../containers/organisms/layout/MainLayout';
import { Metadata } from '../../interfaces';

const PageODOA = () => {

  const router = useRouter()

  const metadata: Metadata = {
    title: "Odoa",
    description: "",
    keywords: ""
  }

  const headerProps = {
    title: `ODOA`,
  }

  useEffect(() => {
    let number = localStorage.getItem('__odoa')
    if(!number) number = "1"
    setTimeout(() => {
      if (router?.replace) router.replace(`${MENU.ODOA}/${number}`)
    }, 1000)
  }, [])

  return (
    <MainLayout
      container=""
      metadata={metadata}
      className="p-0 pb-12"
      headerProps={headerProps}
    >
      <div className="flex items-center justify-center p-24 px-8">Memuat...</div>
    </MainLayout>
  );
};

export default PageODOA;