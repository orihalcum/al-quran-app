// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type Metadata = {
  title: string;
  description: string;
  keywords: string;
};

export type Ayat = {
  number: number;
  text: string;
  textTranslation?: string;
  edition: Edition;
  surah: Surah;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
};

export type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  numberStartOfAyah?: number;
  revelationType: string;
};

export type Edition = {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
};
