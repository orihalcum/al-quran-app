import React from 'react';
import TextArabic from '../atoms/TextArabic';
import TextTranslation from '../atoms/TextTranslation';

const ListItemAyat = ({ numberInSurah, text, textTranslation, bordered = false }) => {
  return (
    <div className={`px-3.5 sm:px-6 py-8 ${bordered ? `${numberInSurah > 1 ? "border-t" : "" } border-gray-200` : ''}`}>
      <TextArabic className="mb-4">{text}</TextArabic>
      <TextTranslation>{textTranslation} ({numberInSurah})</TextTranslation>
    </div>
  );
};

export default ListItemAyat;