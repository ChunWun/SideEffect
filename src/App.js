import React, { useContext } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/Context/AuthContext';

function App() {

  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {console.log('app')}
        {!ctx.isLoggin && <Login />}
        {ctx.isLoggin && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
