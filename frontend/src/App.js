import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import HomepageComponent from './components/HomepageComponent';
import ListUserComponent from './components/ListUserComponent';
import SignUpComponent from './components/SignUpComponent';
import NavbarComponent from './components/NavbarComponent';

function App() {
  return (
    <div>
      <Router>
        <NavbarComponent />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<HomepageComponent />}/>
            <Route path='/users' element={<ListUserComponent />}/>
            <Route path='/sign-up' element={<SignUpComponent />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
