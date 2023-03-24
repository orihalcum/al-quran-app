import React from 'react';
import MainLayout from '../containers/organisms/layout/MainLayout';
import { Metadata } from '../interfaces';

const PageHadist = () => {

  const metadata: Metadata = {
    title: "Surah",
    description: "",
    keywords: ""
  }
  
  return (
    <MainLayout metadata={metadata}>
      <div className="text-center py-28">
      Hadist
      </div>
    </MainLayout>
  );
};

export default PageHadist;