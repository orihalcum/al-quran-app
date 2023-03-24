import React from 'react';
import { MENU } from '../../config';
import Link from 'next/link'
import { LoadingOutlined, ReadOutlined } from '@ant-design/icons';

const ItemLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a>
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-400 text-white font-semibold opacity-70">
          {children}
        </div>
      </a>
    </Link>
  );
};

export default ItemLink;

export const ItemLinkOdoa = ({ data, loading }) => {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-400 text-white font-semibold">
      <div className="flex items-center">
        <ReadOutlined className="font-bold text-xl text-white mr-2" />
        {
          loading
            ? <LoadingOutlined className="ml-2"/>
            : !data?.number || data?.number <= 1
              ? <div className="font-thin text-sm">
                <Link href={`${MENU.ODOA}/${data?.number || 1}`}>
                  <a>
                    Mulai One Day One Ayat sekarang!
                  </a>
                </Link>
              </div>
              : <div className="font-normal text-md">Terakhir dibaca</div>
        }
      </div>
      {
        data?.number > 1 ?
          <div className="mt-4 flex justify-between align-end">
            <div>
              <h3 className="text-lg">{data?.surah?.englishName}</h3>
              <div className="font-thin text-sm">Ayat ke-{data?.number}</div>
            </div>
            <div className="font-normal text-md flex items-end">
              <Link href={`${MENU.ODOA}/${data?.number || 1}`}>
                <a>
                  Lanjut
                </a>
              </Link>
            </div>
          </div>
          : ''
      }
    </div>
  );
};