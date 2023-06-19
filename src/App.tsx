import React from 'react';
import { BrowserRouter as Router,  Routes,  Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import TablePage from './pages/TablePage';
import DetailsPage from './pages/DetailsPage';

const App : React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/table/:search" element={<TablePage />}/>
        <Route path="/table/:search/:itemId/" element={<TablePage />} />
        <Route path="/table/:search/:itemId/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;