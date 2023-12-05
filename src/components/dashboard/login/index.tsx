import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Form, Validate } from "../../forms";
import "../loginOrRegister.css";
import { FieldOnChangeArguments } from "../../forms/field-base";
import {
  clearUserError,
  fetchUserLogin,
  getUserLoggingInError,
  getUserIsLoggingInError,
  getUserLoggedin,
} from "../../../store";
import { AnyAction } from "@reduxjs/toolkit";

export default function Login() {
  const loggedin = useSelector(getUserLoggedin);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState({
    email: false,
    password: false,
  });
  const [allValid, setAllValid] = useState(false);
  const navigate = useNavigate()
  const loginIsError = useSelector(getUserIsLoggingInError);
  const loginError = useSelector(getUserLoggingInError);

  if (loggedin) {
    navigate("/dashboard");
  }

  const clearError = () => {
    dispatch(clearUserError() as unknown as AnyAction);
  }

  const gotoRegister = () => {
    clearError();
    navigate('/dashboard/register');
  }
  const fail = (field: string, pass: boolean) => {
    const updatedValid = {
      ...valid,
      [field]: pass,
    };
    const updatedAllValid = Object.values(updatedValid).every((v) => v);
    setValid(updatedValid);
    setAllValid(updatedAllValid);
  };
  const changeField = (args: FieldOnChangeArguments) => {
    switch (args.field) {
      case "email":
        setEmail(args.value);
        break;
      case "password":
        setPassword(args.value);
        break;
      default:
        break;
    }
  }
  const submitLogin = () => {
    const formData = {
      email: email,
      password: password,
    };
    dispatch(fetchUserLogin(formData) as unknown as AnyAction);
  }
  return (
    <div className='login'>
      <Form>
        <h1>Login</h1>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          tooltip="We will require an email address in order to login"
          onChange={changeField}
          validate={Validate.email}
          invalidMessage="Invalid email address"
          afterValidate={fail}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          tooltip="We require a password in order to login"
          onChange={changeField}
          validate={Validate.password}
          invalidMessage="Invalid password"
          afterValidate={fail}
        />
        <p>Don't have a user?</p>
        <Button
          className='button-secondary'
          text="Register"
          onClick={gotoRegister}
        />
        <Button
          text="Login"
          disabled={!allValid}
          onClick={submitLogin}
        />
        {loginIsError && (
          <div className='submit-error'>{loginError.message}</div>
        )}
      </Form>
    </div>
  );
}