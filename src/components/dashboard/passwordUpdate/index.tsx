import { useState } from "react";
import { useNavigate } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { Button, Form, Input, Validate } from "../../forms";
import { FieldOnChangeArguments } from "../../forms/field-base";
import { clearUserError, fetchUserPasswordChange, getUserIsPasswordChanging, getUserIsPasswordChangingError, getUserPasswordChangingError } from "../../../store";

export default function PasswordUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updatePasswordHasError = useSelector(getUserIsPasswordChangingError, shallowEqual);
  const updatePasswordError = useSelector(getUserPasswordChangingError, shallowEqual);
  const loadingPasswordChange = useSelector(getUserIsPasswordChanging, shallowEqual);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [sentUpdate, setSentUpdate] = useState(false);

  const clearError = () => {
    dispatch(clearUserError() as unknown as AnyAction);
  }

  const confirmPasswordCheck = (value: string, secondValue: string = '') =>
    Validate.equalTo(value, secondValue ? secondValue : newPassword);

  const handleChange = ({ field, value }: FieldOnChangeArguments) => {
    clearError();
    setSentUpdate(false);
    switch (field) {
      case 'password':
        setPassword(value);
        const isValid = value
          && Validate.password(value)
          && Validate.password(newPassword)
          && confirmPasswordCheck(newPassword, confirmPassword)
          && !loadingPasswordChange;
        setDisabled(!isValid);
        break;
      case 'newPassword': {
        setNewPassword(value);
        const isValid = confirmPasswordCheck(value, confirmPassword)
          && Validate.password(password)
          && Validate.password(value)
          && value
          && !loadingPasswordChange;
        setDisabled(!isValid);
        break;
      }
      case 'confirmPassword': {
        setConfirmPassword(value);
        const isValid = confirmPasswordCheck(value, newPassword)
          && Validate.password(password)
          && Validate.password(newPassword)
          && value
          && !loadingPasswordChange;
        setDisabled(!isValid);
        break;
      }
      default:
        break;
    }
  }

  const afterValidate = (field: string, pass: boolean) => {
    if (!pass) {
      setDisabled(true);
    }
  }

  const handleSubmit = () => {
    dispatch(fetchUserPasswordChange({
      oldPassword: password,
      newPassword,
    }) as unknown as AnyAction);
    setSentUpdate(true);
  }

  if (!loadingPasswordChange && sentUpdate && !updatePasswordHasError) {
    navigate('/dashboard');
  }

  return (
    <div>
      <Form>
        <h1 className='title'>Change Your Password</h1>
        <Input
          label='Current Password'
          name='password'
          type='password'
          placeholder='Please enter your current password'
          onChange={handleChange}
          validate={Validate.password}
          afterValidate={afterValidate}
          invalidMessage='Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        />
        <Input
          label='New Password'
          name='newPassword'
          type='password'
          placeholder='Please enter your new password'
          onChange={handleChange}
          validate={Validate.password}
          afterValidate={afterValidate}
          invalidMessage='Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        />
        <Input
          label='Confirm New Password'
          name='confirmPassword'
          type='password'
          placeholder='Please confirm your new password'
          onChange={handleChange}
          validate={confirmPasswordCheck}
          afterValidate={afterValidate}
          invalidMessage='Password must match with the new password'
        />
        {updatePasswordHasError && updatePasswordError && (
          <div className='submit-error'>{updatePasswordError.message ?? 'Unknown Error'}</div>
        )}
        <Button
          text='Change Password'
          disabled={disabled && !loadingPasswordChange}
          onClick={handleSubmit}
        />
      </Form>
    </div>
  );
}