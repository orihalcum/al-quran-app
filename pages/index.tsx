import React, { useEffect, useState } from 'react';
import { AL_QURAN_EDITION, API_AYAH_URL } from '../config';
import MainLayout from '../containers/organisms/layout/MainLayout';
import SurahList from '../containers/organisms/SurahList';
import { Metadata } from '../interfaces';
import { combineAyat } from '../utils/misc';
import axios from 'axios'


const PageIndex = () => {

  const [lastAyatRead, setLastAyatRead] = useState(null)
  const [pageLoading, setPageLoading] = useState(true)

  const getLatestAyatRead = async (ayat) => {
    setPageLoading(true)
    axios.get(`${API_AYAH_URL}/${ayat}/editions/${AL_QURAN_EDITION}`)
    .then(response => {
      const { status } = response
      if(status === 200) {
        const { data } = response?.data
        setLastAyatRead(combineAyat(data))
        setPageLoading(false)
      }
    })
  }

  useEffect(() => {
    if(typeof window !== 'undefined') {
      let _odoa = localStorage.getItem('__odoa')
      getLatestAyatRead(_odoa ? +_odoa : 1)
    }
  }, [])

  const metadata: Metadata = {
    title: "Al Quran App",
    description: "",
    keywords: ""
  }

  const headerProps = {
    title: `Al Quran App`,
  }

  return (
    <MainLayout
      container="main"
      metadata={metadata}
      headerProps={headerProps}
    >
      <div className="mb-6">
        <div className="text-gray-400 mb-1">Assalamualaikum</div>
        <div className="font-bold text-2xl">Dzulfan Fadli</div>
      </div>
      <SurahList 
        lastAyatRead={lastAyatRead} 
        pageLoading={pageLoading}
      />
    </MainLayout>
  )
}

export default PageIndex
