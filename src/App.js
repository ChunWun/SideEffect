import React, { useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { useEffect } from 'react';

function App() {
  const storageDataList = {
    IS_LOGGINED: "isLoggined"
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log('effect')
    const storageUserLogginedData = (localStorage.getItem(storageDataList.IS_LOGGINED) === 'true');
    setIsLoggedIn(storageUserLogginedData);

  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem(storageDataList.IS_LOGGINED, true);
    setIsLoggedIn((localStorage.getItem(storageDataList.IS_LOGGINED) === 'true'));
  };

  const logoutHandler = () => {
    localStorage.setItem(storageDataList.IS_LOGGINED, false);
    setIsLoggedIn((localStorage.getItem(storageDataList.IS_LOGGINED) === 'true'));
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
