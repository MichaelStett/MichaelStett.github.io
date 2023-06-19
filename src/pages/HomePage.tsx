import React from 'react';

import BreadcrumbContainer from '../components/Smart/BreadcrumbContainer';

import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import SearchContainer from '../components/Smart/SearchContainer';

const HomePage: React.FC = () => {
  const { breadcrumbs } = useBreadcrumbs([{breadcrumb: { name: 'Home', path: '/'} }]);

  return (
    <>
      <div className="w-full min-h-screen max-h-screen h-full bg-gradient-to-r from-light-blue to-blue px-4 py-4 overflow-hidden">
          <BreadcrumbContainer breadcrumbList={breadcrumbs} />
        <div className="min-h-screen max-h-screen h-full w-full flex justify-center items-center">
            <SearchContainer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
