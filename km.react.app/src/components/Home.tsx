import React from 'react';
import Breadcrumb from './Breadcrumb';
import Search from './Search';

const Home: React.FC = ( ) => {
  return (
    <>
    {/* <Breadcrumb breadcrumbList={[{ name: 'Home', path: '/' }]} />   */}
    <h2>Home Screen</h2>
    <Search/>
  </>
  );
};

export default Home;
