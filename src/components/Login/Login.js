import React, { useState, useContext, useEffect, useReducer, useRef } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Context/AuthContext';
import Input from '../UI/Input/Input';

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
        passwordVal: actions.payload.passwordVal,
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
  const csx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [userInput, dispatchUserInput] = useReducer(reducer, {
    emailVal: '',
    isEmailVaild: null,
    passwordVal: '',
    isPasswordValid: null
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(userInput.isEmailVaild && userInput.isPasswordValid);
    }, 500);

    return (() => {
      clearTimeout(timer);
    });
  }, [userInput.isEmailVaild, userInput.isPasswordValid]);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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

    if (formIsValid) {
      csx.onLogin(userInput.value, userInput.value);
    } else if (!userInput.isEmailVaild) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          label="E-Mail"
          id="email"
          isVaild={userInput.isEmailVaild}
          value={userInput.emailVal}
          onChange={emailChangeHandler}
          onBlur={validateHandler}
        >
        </Input>
        <Input
          ref={passwordInputRef}
          type="password"
          label="password"
          id="password"
          isVaild={userInput.isPasswordValid}
          value={userInput.passwordVal}
          onChange={passwordChangeHandler}
          onBlur={validateHandler}
        >
        </Input>
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
