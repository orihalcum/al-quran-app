import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import TextArabic from '../../components/atoms/TextArabic';
import TextTranslation from '../../components/atoms/TextTranslation';
import AudioPlayer from '../../components/molecules/AudioPlayer';
import HeaderAyat from '../../components/molecules/HeaderAyat';
import { AL_QURAN_EDITION, API_AYAH_URL, MENU } from '../../config';
import { Container } from '../../containers/organisms/layout/MainContainer';
import MainFooter from '../../containers/organisms/layout/MainFooter';
import MainLayout from '../../containers/organisms/layout/MainLayout'
import { Ayat, Metadata, Surah } from '../../interfaces';
import { combineAyat } from '../../utils/misc';
import { defaultSurahData } from '../../utils/surah-data';
import { getURLAyat } from '../../utils/urls';

export async function getServerSideProps({ params }) {

  const { number } = params

  let currentAyat = number || 1

  const response = await fetch(`${API_AYAH_URL}/${currentAyat}/editions/${AL_QURAN_EDITION}`)
  const data = await response.json()


  let ayat: Ayat = combineAyat(data?.data)
  let surah = {
    ...ayat?.surah,
    numberStartOfAyah: defaultSurahData.filter(v => v.number === ayat?.surah?.number)?.[0]?.['numberStartOfAyah'],
  }

  return {
    props: {
      data: ayat,
      currentAyat,
      currentSurah: surah,
    },
  }
}

type Props = {
  data: Ayat,
  currentAyat: number,
  currentSurah: Surah
}

const PageODOA = ({ data, currentAyat = 0, currentSurah }: Props) => {

  const next = +currentAyat + 1
  const prev = +currentAyat - 1

  const metadata: Metadata = {
    title: `${currentSurah?.englishName} (${currentSurah?.number}:${data?.numberInSurah})`,
    description: "",
    keywords: ""
  }

  const rightSider = {
    title: "Surah",
    content: <RightSiderContent />
  }

  const headerProps = {
    title: `Surah ${currentSurah?.englishName}`,
    rightSider
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentAyat) {
        let audioPlayer = document.getElementById('audio-player') as HTMLMediaElement
        let audioSource = document.getElementById('audio-mp4') as HTMLSourceElement
        audioSource.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${currentAyat}.mp3` // ar.alafasy
        audioPlayer.pause()
        audioPlayer.load()
      }
    }
    localStorage.setItem('__odoa', `${currentAyat}`)
  }, [currentAyat])

  return (
    <MainLayout
      container=""
      metadata={metadata}
      headerProps={headerProps}
    >
      {/* Container Content */}
      <Container className="p-3.5 sm:p-6 my-12 sm:my-16">
        {/* Header */}
        <HeaderAyat
          surah={currentSurah}
          juz={data?.juz}
          numberInSurah={data?.numberInSurah}
        />

        {/* Main COntent */}
        <>
          {/* Ayat */}
          <div>
            <TextArabic className="mb-4">{data.text}</TextArabic>
            <TextTranslation>{data.textTranslation} ({data.numberInSurah})</TextTranslation>
          </div>

          {/* Audio */}
          <div className="text-center my-8">
            <AudioPlayer src={`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${currentAyat}.mp3`} />
          </div>
        </>
      </Container>

      {/* Footer outside container */}
      <MainFooter>
        <div className="flex-1 flex align-center pl-lg-2">
          {
            currentAyat && next <= 6236 &&
            <Link href={getURLAyat(next)}>
              <a className="color-grey text-sm flex items-center"><LeftCircleOutlined className="leading-none text-2xl mr-2" /> Selanjutnya</a>
            </Link>
          }
        </div>
        <div className="flex-1 text-center text-sm pt-1">{data?.numberInSurah}/{currentSurah?.numberOfAyahs}</div>
        <div className="flex-1 text-right pr-lg-2">
          {
            currentAyat && prev > 0 ?
              <Link href={getURLAyat(prev)}>
                <a className="color-grey text-sm flex items-center justify-end">Sebelumnya <RightCircleOutlined className="leading-none text-2xl ml-2" /></a>
              </Link>
              : <div />
          }
        </div>
      </MainFooter>
    </MainLayout>
  );
};

export default PageODOA;

const RightSiderContent = () => {
  return (
    <div className="pb-4 pt-2">
      {
        defaultSurahData?.map((v, k) => (
          <Link href={`${MENU.ODOA}/${v.numberStartOfAyah}`} key={k}>
            <a>
              <div className="flex py-2 px-3.5 sm:px-4" key={v.number}>
                <div className="flex-1">
                  <div className="text-md sm:text-lg">{v.number}. {v.englishName}</div>
                  <small className="text-sm">{v.englishNameTranslation}</small>
                </div>
                <div className="flex-1 text-right font-arabic text-xl sm:text-2xl my-auto">{v.name?.replace('سُورَةُ ', '')}</div>
              </div>
            </a>
          </Link>
        ))
      }
    </div>
  )
}