import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import { AuthProvider } from 'react-auth-kit';
import { RequireAuth } from 'react-auth-kit'
import HomepageComponent from './components/HomepageComponent';
import ListUserComponent from './components/ListUserComponent';
import SignUpComponent from './components/SignUpComponent';
import PostSignUpComponent from './components/PostSignUpComponent';
import NavbarComponent from './components/NavbarComponent';
import LogInComponent from './components/LogInComponent';
import UserManagement from './components/UserManagement'
import UserProfile from './components/UserProfile';

function App() {
  return (
    <AuthProvider 
    authType = {'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
    >
      <Router>
        <NavbarComponent />
          <Routes>
            <Route exact path='/' element={<HomepageComponent />} />
            <Route path='/users' element={
              <RequireAuth loginPath={'/log-in'}>
                <ListUserComponent />
              </RequireAuth>
              }
            />
            <Route path='/users/:user' element={
              <RequireAuth loginPath={'/log-in'}>
                <UserManagement />
              </RequireAuth>
              }
            />
            <Route path='/profile' element={
              <RequireAuth loginPath={'/log-in'}>
                <UserProfile />
              </RequireAuth>
              }
            />
            <Route path='/sign-up' element={<SignUpComponent />} />
            <Route path='/sign-up-success' element={<PostSignUpComponent />} />
            <Route path='/log-in' element={<LogInComponent />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
