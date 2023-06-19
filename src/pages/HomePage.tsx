import React from 'react';

import Breadcrumb from '../components/Breadcrumb';
import Search from '../components/Search';

const HomePage: React.FC = () => {
  return (
    <>
      <div className="w-full min-h-screen max-h-screen h-full bg-gradient-to-r from-light-blue to-blue px-4 py-4 overflow-hidden">
          <Breadcrumb breadcrumbList={[
            { breadcrumb: { name: 'Home', path: '/' } }
          ]} />
        <div className="min-h-screen max-h-screen h-full w-full flex justify-center items-center">
            <Search />
        </div>
      </div>
    </>
  );
};

export default HomePage;
