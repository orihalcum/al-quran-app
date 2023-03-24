import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import TextArabic from '../../../components/atoms/TextArabic';
import ListItemAyat from '../../../components/molecules/ListItemAyat';
import { AL_QURAN_EDITION, API_SURAH_URL, MENU } from '../../../config';
import { Container } from '../../../containers/organisms/layout/MainContainer';
import MainFooter from '../../../containers/organisms/layout/MainFooter';
import MainLayout from '../../../containers/organisms/layout/MainLayout';
import { Ayat, Metadata, Surah } from '../../../interfaces';
import { getCombinedAyat, getSurahName } from '../../../utils/misc';
import { defaultSurahData } from '../../../utils/surah-data';

export async function getServerSideProps({ params }) {

  let listOfAyat = []
  let currentSurah: Surah;
  const { number } = params

  if (number) {
    const response = await fetch(`${API_SURAH_URL}/${number}/editions/${AL_QURAN_EDITION}`)
    const data = await response.json()
    if (data?.data?.length > 0) {
      listOfAyat = getCombinedAyat(data.data)
      currentSurah = data.data[0]
    }
  }

  return {
    props: {
      currentSurah,
      listOfAyat
    }
  }
}


type Props = {
  currentSurah?: Surah
  listOfAyat?: Ayat[]
}

const AlQuranSurah = ({ currentSurah, listOfAyat = [] }: Props) => {

  const metadata: Metadata = {
    title: `Surah ${currentSurah?.englishName}`,
    description: "",
    keywords: ""
  }

  const rightSider = {
    title: "Surah",
    content: <RightSiderContent />
  }

  const headerProps = {
    title: metadata?.title,
    rightSider
  }

  return (
    <MainLayout
      container=""
      metadata={metadata}
      className="p-0 pb-12"
      headerProps={headerProps}
    >
      <Container className="p-3.5 px-0 my-8 sm:my-14">
        <div className="mx-3.5 sm:mx-auto mb-8 px-3.5 py-12 sm:max-w-sm text-center rounded-xl bg-gradient-to-bl from-green-500 to-blue-400 text-white font-semibold mt-4 drop-shadow-xl">
          <TextArabic fontSize="text-xl sm:text-2xl font-thin">{currentSurah?.name?.replace('سُورَةُ', '')}</TextArabic>
          <div className="text-2xl sm:text-3xl font-semibold my-2">{currentSurah?.englishName}</div>
          <div className="text-sm sm:text-md font-thin">{currentSurah?.englishNameTranslation}</div>
          <hr className="w-2/3 my-4 mx-auto opacity-50" />
          <small className="">{currentSurah?.revelationType} &nbsp;&nbsp;-&nbsp;&nbsp; Surah ke {currentSurah?.number} &nbsp;&nbsp;-&nbsp;&nbsp; {currentSurah?.numberOfAyahs} Ayat</small>
        </div>
        {
          listOfAyat.map(({ text, textTranslation, number, numberInSurah }) => (
            <ListItemAyat
              key={number}
              numberInSurah={numberInSurah}
              text={text}
              textTranslation={textTranslation}
              bordered={true}
            />
          ))
        }
      </Container>
      {/* Footer outside container */}
      <MainFooter>
        <div className="flex-1 flex align-center lg:pl-2">
          {
            currentSurah?.number < 114 &&
            <Link href={`${MENU.AL_QURAN_SURAH}/${currentSurah?.number + 1}`}>
              <a className="color-grey text-sm flex items-center"><LeftCircleOutlined className="leading-none text-2xl mr-2" />{getSurahName(currentSurah?.number + 1)}</a>
            </Link>
          }
        </div>
        <div className="flex-1 text-center text-sm pt-1"></div>
        <div className="flex-1 text-right lg:pr-2">
          {
            currentSurah?.number > 1 &&
            <Link href={`${MENU.AL_QURAN_SURAH}/${currentSurah?.number - 1}`}>
              <a className="color-grey text-sm flex items-center justify-end">{getSurahName(currentSurah?.number - 1)}<RightCircleOutlined className="leading-none text-2xl ml-2" /></a>
            </Link>
          }
        </div>
      </MainFooter>
    </MainLayout >
  );
};

export default AlQuranSurah;

const RightSiderContent = () => {
  return (
    <div className="pb-4 pt-2">
      {
        defaultSurahData?.map((v, k) => (
          <Link href={`${MENU.AL_QURAN_SURAH}/${v.number}`} key={k}>
            <a>
              <div className="flex py-2 px-4" key={v.number}>
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

