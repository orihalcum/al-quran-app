import React, { useEffect, useState } from 'react';
import { AL_QURAN_EDITION, API_AYAH_URL } from '../../config';
import MainLayout from '../../containers/organisms/layout/MainLayout';
import SurahList from '../../containers/organisms/SurahList';
import { Metadata } from '../../interfaces';
import { combineAyat } from '../../utils/misc';


const AlQuran = () => {

  const [lastAyatRead, setLastAyatRead] = useState(null)
  const [pageLoading, setPageLoading] = useState(false)

  const getLatestAyatRead = async (ayat) => {
    setPageLoading(true)
    const response = await fetch(`${API_AYAH_URL}/${ayat}/editions/${AL_QURAN_EDITION}`)
    const data = await response.json()
    if(data) {
      setLastAyatRead(combineAyat(data?.data))
      setPageLoading(false)
    }
  }

  useEffect(() => {
    if(typeof window !== 'undefined') {
      let _odoa = localStorage.getItem('__odoa')
      getLatestAyatRead(_odoa ? +_odoa : 1)
    }
  }, [])

  const metadata: Metadata = {
    title: "Al Quran - ODOA",
    description: "",
    keywords: ""
  }

  const headerProps = {
    title: `Al Quran`,
  }

  return (
    <MainLayout
      container="main"
      metadata={metadata}
      headerProps={headerProps}
    >
      <SurahList 
        lastAyatRead={lastAyatRead} 
        pageLoading={pageLoading}
      />
    </MainLayout>
  );
};

export default AlQuran;

