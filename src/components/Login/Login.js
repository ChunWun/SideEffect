import React, { useState } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { useEffect, useReducer } from 'react';

const reducer = (state, actions) => {
  switch (actions.type) {
    case "UPDATE_EMAIL":
      return ({
        ...state,
        emailVal: actions.payload.emailVal,
      });
    case "UPDATE_PASSWORD":
      return ({
        ...state,
        emailVal: actions.payload.passwordVal,
      });
    case "ONBLUR":
      return ({
        ...state,
        isEmailVaild: state.emailVal.includes('@'),
        isPasswordValid: state.passwordVal.trim().length > 6
      });
    default:
      throw new Error(`not exist action type: ${actions.type}`);
  }
}

const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);

  const [userInput, dispatchUserInput] = useReducer(reducer, {
    emailVal: '',
    isEmailVaild: null,
    passwordVal: '',
    isPasswordValid: null
  });

  //TODO
  // const { isEmailValid: emailIsValid } = userInput.isEmailVaild;
  // const { isPasswordValid: passwordIsValid } = userInput.isPasswordValid;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(userInput.isEmailVaild && userInput.isPasswordValid);
    }, 500);

    return (() => {
      clearTimeout(timer);
    });
  }, [userInput.isEmailVaild, userInput.isPasswordValid]);

  const emailChangeHandler = (event) => {
    dispatchUserInput({
      type: 'UPDATE_EMAIL',
      payload: {
        emailVal: event.target.value
      }
    })
  };

  const passwordChangeHandler = (event) => {
    dispatchUserInput({
      type: 'UPDATE_PASSWORD',
      payload: {
        passwordVal: event.target.value
      }
    })
  };

  const validateHandler = () => {
    dispatchUserInput({
      type: 'ONBLUR'
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(userInput.emailVal, userInput.passwordVal);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${userInput.isEmailVaild === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={userInput.emailVal}
            onChange={emailChangeHandler}
            onBlur={validateHandler}
          />
        </div>
        <div
          className={`${classes.control} ${userInput.isPasswordValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={userInput.passwordVal}
            onChange={passwordChangeHandler}
            onBlur={validateHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
