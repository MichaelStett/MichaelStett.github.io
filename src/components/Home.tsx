import React from 'react';
import Breadcrumb from './Breadcrumb';
import Search from './Search';

const Home: React.FC = () => {
  return (
    <>
      <div className="sticky container mx-auto px-4">
        <div className="sticky top-0 bg-white">
          <Breadcrumb breadcrumbList={[
            { breadcrumb: { name: 'Home', path: '/' } }
          ]} />
          <Search />
        </div>
      </div>
    </>
  );
};

export default Home;
