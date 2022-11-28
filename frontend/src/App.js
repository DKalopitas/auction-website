import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import ListUserComponent from './components/ListUserComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Routes>
            {/* <Route path='/' exact element={<ListUserComponent/>}/> */}
            <Route path='/users' element={<ListUserComponent/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
