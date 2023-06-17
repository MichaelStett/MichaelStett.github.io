import React from 'react';
import { BrowserRouter as Router,  Routes,  Route} from 'react-router-dom';
import Table from './components/Table';
import DetailsPage from './components/DetailsPage';
import Home from './components/Home';

const App : React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/table/:search" element={<Table />}/>
        <Route path="/table/:search/:itemId/" element={<Table />} />
        <Route path="/table/:search/:itemId/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}
export default App;
