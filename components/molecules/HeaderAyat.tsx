import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { MENU } from '../../config';
import TextArabic from '../atoms/TextArabic';

const HeaderAyat = ({ surah, juz, numberInSurah }) => {

  const router = useRouter()

  const { englishName, number, name, numberOfAyahs, numberStartOfAyah } = surah

  const handleChange = useCallback(e => {
    router.push(`${MENU.ODOA}/${+e.target.value + (+numberStartOfAyah-1)}`)
  }, [numberStartOfAyah])

  return (
    <div className="flex justify-between mb-10 text-xs text-gray-500">
      <div className="flex items-center">
        {englishName} [{number}] <br />
        Juz {juz}
      </div>
      <div>
        {/* TODO Handle Select */}
        <select 
          className="border border-gray-200 border rounded-lg p-1 px-2" 
          value={numberInSurah}
          onChange={handleChange}
        >
          {
            (new Array(numberOfAyahs)).fill(1)?.map((v, k) => (
              <option
                value={k + 1}
                key={k}
              >
                {k + 1}
              </option>
            ))
          }
        </select>
      </div>
      <div className="flex items-center" style={{ width: 'auto' }}>
        <TextArabic fontSize="text-lg">{name}</TextArabic>
      </div>
    </div>
  )
}

export default HeaderAyat;