import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { Input, Button, Form, Validate } from "../../forms";
import "../loginOrRegister.css";
import { FieldOnChangeArguments } from "../../forms/field-base";
import {
  fetchUserRegister,
  getUserIsRegisteringError,
  getUserRegisteringError,
  clearUserError,
  getUserLoggedin,
} from "../../../store";

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const dispatch = useDispatch();
  const registerIsError = useSelector(getUserIsRegisteringError);
  const registerError = useSelector(getUserRegisteringError);
  const loggedin = useSelector(getUserLoggedin);
  const navigate = useNavigate();

  if (loggedin) {
    navigate("/dashboard");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [valid, setValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    firstName: false,
    lastName: false,
  });
  const [allValid, setAllValid] = useState(false);

  const submitForm = () => {
    const formData = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
      first_name: firstName,
      last_name: lastName,
    };
    dispatch(fetchUserRegister(formData) as unknown as AnyAction);
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

  const gotoLogin = () => {
    clearError();
    navigate("/dashboard/login");
  }

  const confirmPasswordCheck = (value: string) => {
    return Validate.equalTo(value, password);
  };

  const clearError = () => {
    dispatch(clearUserError() as unknown as AnyAction);
  }

  const changeField = ({ field, value }: FieldOnChangeArguments) => {
    switch (field) {
      case "email":
        clearError();
        setEmail(value);
        break;
      case "password":
        clearError();
        setPassword(value);
        break;
      case "confirmPassword":
        clearError();
        setConfirmPassword(value);
        break;
      case "firstName":
        clearError();
        setFirstName(value);
        break;
      case "lastName":
        clearError();
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="register">
      <Form>
        <h1>Register</h1>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          onChange={changeField}
          validate={Validate.email}
          afterValidate={fail}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={changeField}
          validate={Validate.password}
          afterValidate={fail}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          onChange={changeField}
          validate={confirmPasswordCheck}
          afterValidate={fail}
        />
        <Input
          label="First Name"
          type="string"
          name="firstName"
          placeholder="Enter your first name"
          onChange={changeField}
          validate={Validate.notEmpty}
          afterValidate={fail}
        />
        <Input
          label="Last Name"
          type="string"
          name="lastName"
          placeholder="Enter your last name"
          onChange={changeField}
          validate={Validate.notEmpty}
          afterValidate={fail}
        />
        <p>Already have a user?</p>
        <Button
          className='button-secondary'
          text="Login"
          onClick={gotoLogin}
        />
        <Button
          text="Register"
          disabled={!allValid}
          onClick={submitForm}
        />
        {registerIsError && (
          <div className='submit-error'>{registerError.message}</div>
        )}
      </Form>
    </div>
  );
};

export default Register;
