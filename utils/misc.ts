import { Ayat, Surah } from "../interfaces";
import { defaultSurahData } from "./surah-data";

export const getCombinedAyat = (data) => {
  let listOfAyat = [];
  let ayatArabic = data[0]?.ayahs;
  let ayatTranslation = data[1]?.ayahs;
  ayatArabic.forEach((ayat, k) => {
    listOfAyat.push({
      ...ayat,
      textTranslation: ayatTranslation[k]?.text,
    });
  });

  return listOfAyat;
};

export const combineAyat = (data: Ayat[]) => {
  return data.length > 1
    ? {
        ...data[0],
        textTranslation: data[1].text,
      }
    : undefined;
};

export const getSurah = (surahNumber: number) => {
  return defaultSurahData[surahNumber - 1];
};

export const getSurahName = (surahNumber: number) => {
  return getSurah(surahNumber)?.englishName;
};

export const mapNumberStartAyah = (surahs: Surah[]) => {
  let sum = 1;
  return surahs.map((v, k) => {
    if (k > 0) sum += surahs[k - 1]["numberOfAyahs"] - 1;
    return {
      ...v,
      numberStartOfAyah: sum,
    };
  });
};
