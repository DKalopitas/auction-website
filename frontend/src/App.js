import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import { AuthProvider } from 'react-auth-kit';
import HomepageComponent from './components/HomepageComponent';
import ListUserComponent from './components/ListUserComponent';
import SignUpComponent from './components/SignUpComponent';
import NavbarComponent from './components/NavbarComponent';
import LogInComponent from './components/LogInComponent';

function App() {
  return (
    <div>
      <AuthProvider 
      authType = {'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
      >
        <Router>
          <NavbarComponent />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<HomepageComponent />}/>
              <Route path='/users' element={<ListUserComponent />}/>
              <Route path='/sign-up' element={<SignUpComponent />}/>
              <Route path='/log-in' element={<LogInComponent />}/>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
