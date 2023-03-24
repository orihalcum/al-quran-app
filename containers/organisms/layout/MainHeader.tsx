import { CloseOutlined, MenuOutlined, ReadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import Drawer from '../Drawer';
import { Container } from './MainContainer';

type Props = {
  title?: string
  rightSider?: RightSider
}

type RightSider = {
  title?: string
  content?: ReactNode
}

const MainHeader = ({ title, rightSider }: Props) => {

  const router = useRouter()

  const [leftSiderVisible, setLeftSiderVisible] = useState(false)
  const [rightSiderVisible, setRightSiderVisible] = useState(false)

  useEffect(() => {
    setLeftSiderVisible(false)
    setRightSiderVisible(false)
  }, [router?.query?.number])

  return (
    <>
      <div className="fixed top-0 flex w-full text-gray-600 bg-white h-14 sm:h-20 z-50">
        <Container className="flex items-center justify-between px-3.5 sm:px-6 w-full">
          <MenuOutlined onClick={() => setLeftSiderVisible(prev => !prev)} className="font-bold color-gray-500 text-lg leading-none w-6" />
          <div className="font-bold text-left w-full pl-4 text-lg sm:text-xl text-green-500">
            {title}
          </div>
          <div className="w-6">
            {rightSider && <ReadOutlined onClick={() => setRightSiderVisible(prev => !prev)} className="font-bold text-2xl" />}
          </div>
        </Container>
      </div>

      {/* Drawer Left */}
      <Drawer
        position="left"
        visible={leftSiderVisible}
        onClose={() => setLeftSiderVisible(false)}
      >
        <div className="container px-4 h-16 flex items-center justify-end w-full mx-auto">
          <CloseOutlined onClick={() => setLeftSiderVisible(false)} />
        </div>
        <Container className="flex flex-col p-4 text-center sm:mx-auto sm:max-w-lg">
          <Link href="/">
            <a className={`flex-1 p-3.5 text-2xl ${router?.pathname === '/' ? 'font-bold text-3xl' : ''}`}>
              Home
            </a>
          </Link>
          <Link href="/al-quran">
            <a className={`flex-1 p-3.5 text-2xl ${router?.pathname?.match('/al-quran') ? 'font-bold text-3xl' : ''}`}>
              Al Quran
            </a>
          </Link>
          <Link href="/odoa">
            <a className={`flex-1 p-3.5 text-2xl ${router?.pathname?.match('/odoa') ? 'font-bold text-3xl' : ''}`}>
              ODOA
            </a>
          </Link>
          <Link href="/hadist">
            <a className={`flex-1 p-3.5 text-2xl ${router?.pathname?.match('/hadist') ? 'font-bold text-3xl' : ''}`}>
              Hadist
            </a>
          </Link>
        </Container>
      </Drawer>

      {/* Drawer Right */}
      <Drawer
        position="right"
        visible={rightSiderVisible}
        onClose={() => setRightSiderVisible(false)}
      >
        <div className="container px-4 h-16 flex items-center justify-between w-full mx-auto">
          <div className="text-transparent">.</div>
          <div className="text-lg text-semibold">{rightSider?.title}</div>
          <CloseOutlined onClick={() => setRightSiderVisible(false)} />
        </div>
        <div className="container pb-12 sm:max-w-lg sm:mx-auto" style={{ height: 'calc(100vh - 60px)', overflowY: 'scroll' }}>
          {rightSider?.content}
        </div>
      </Drawer>
    </>
  );
};

export default MainHeader;