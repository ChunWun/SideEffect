import React, { useContext } from 'react';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext from '../Context/AuthContext';
import Button from '../UI/Button/Button';

const Home = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      {console.log('home')}
      <h1>Welcome back!</h1>
      <Button onClick={ctx.onLogout}>Log out</Button>
    </Card>
  );
};

export default Home;
