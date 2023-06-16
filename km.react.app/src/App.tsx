import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Table from './components/Table';
import DetailsPage from './components/Details';
import Breadcrumb from "./components/Breadcrumb";
import Home from './components/Home';

const App : React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/table/:itemId" Component={DetailsPage} />
        <Route path="/table" element={<Table />}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}
export default App;
