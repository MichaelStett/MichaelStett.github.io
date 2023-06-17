import React from 'react';
import { BrowserRouter as Router,  Routes,  Route} from 'react-router-dom';
import Table from './components/Table';
import DetailsPage from './components/Details';
import Home from './components/Home';

const App : React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Table />}/>
      </Routes>
    </Router>
  );
}
export default App;
