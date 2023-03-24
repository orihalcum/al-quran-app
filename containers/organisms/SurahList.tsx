import { defaultSurahData } from "../../utils/surah-data";
import ItemLink, { ItemLinkOdoa } from "../../components/atoms/ItemLink";
import Link from "next/link";
import { MENU } from "../../config";

const SurahList = ({ lastAyatRead = null, pageLoading = false }) => {
  return (
    <>
      <div className="mt-1 mb-4">
        <ItemLinkOdoa 
          data={lastAyatRead} 
          loading={pageLoading} 
        />
      </div>
      {defaultSurahData?.map((v, k) => (
        <Link href={`${MENU.AL_QURAN_SURAH}/${v.number}`} key={k}>
          <a>
            <div
              className="flex py-3.5 px-0 border-b border-gray-100"
              key={v.number}
            >
              <div className="flex-1">
                <div>
                  {v.number}. {v.englishName}
                </div>
                <small className="text-gray-400">
                  {v.englishNameTranslation}
                </small>
              </div>
              <div className="flex-1 text-right font-arabic text-2xl my-auto text-green-600">
                {v.name?.replace("سُورَةُ ", "")}
              </div>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
};

export default SurahList;

