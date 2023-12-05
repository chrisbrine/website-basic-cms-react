import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUpdate, getUserData, getUserIsLoading } from "../../../store";
import { Input, FileInput, Form, Button, Validate } from "../../forms";
import { FieldOnChangeArguments } from "../../forms/field-base";
import { AnyAction } from "@reduxjs/toolkit";
import Loading from "../../loading";

export default function Profile() {
  const dispatch = useDispatch();
  const userIsLoading = useSelector(getUserIsLoading);
  const userData = useSelector(getUserData);
  const [userState, setUserData] = useState({
    email: userData.email,
    image_file: userData.image_file,
    first_name: userData.first_name,
    last_name: userData.last_name,
    phone_number: userData.phone_number,
    address: userData.address,
    city: userData.city,
    province: userData.province,
    postalCode: userData.postalCode,
    linkedIn: userData.linkedIn,
    github: userData.github,
    website: userData.website,
    facebook: userData.facebook,
  } as any);
  const [validProfile, setValidProfile] = useState({
    email: true,
    first_name: true,
    last_name: true,
    image_file: !!userData.image_file,
    phone_number: true,
    address: true,
    city: true,
    province: true,
    postalCode: true,
    linkedIn: true,
    github: true,
    website: true,
    facebook: true,
  });

  const confirmValid = () =>
    Object.values(validProfile).every((v) => v);

  const onChange = (args: FieldOnChangeArguments) => {
    if (!(args.field in userState)) {
      return;
    }
    const newUserData = {
      ...userState,
      [args.field]: args.value,
    };
    setUserData({ ...newUserData});
  }

  const fail = (field: string, pass: boolean) => {
    const newValid = {
      ...validProfile,
      [field]: pass,
    };
    setValidProfile({ ...newValid });
  }

  const saveProfile = () => {
    if (confirmValid()) {
      dispatch(fetchUserUpdate(userState) as unknown as AnyAction);
    }
  }

  return userIsLoading && userData.data.first_name ? (
    <Loading />
  ) : (
    <Form>
      <h1>Profile</h1>
      <p>Please update your profile. The profile will only save if all fields are valid.</p>
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email address"
        invalidMessage="The email is invalid"
        required={true}
        emptyInvalid={true}
        value={userData.email}
        onChange={onChange}
        validate={Validate.email}
        afterValidate={fail}
      />
      <FileInput
        name="image_file"
        label="Profile Picture"
        types={["image"]}
        emptyInvalid={true}
        required={true}
        placeholder="Upload your profile picture"
        value={userData.image_file ? userData.image_file : ''}
        onChange={onChange}
        validate={Validate.isImage}
        afterValidate={fail}
      />
      <Input
        name="first_name"
        label="First Name"
        type="text"
        placeholder="Enter your first name"
        required={true}
        emptyInvalid={true}
        value={userData.first_name}
        onChange={onChange}
        validate={Validate.notEmpty}
        afterValidate={fail}
      />
      <Input
        name="last_name"
        label="Last Name"
        type="text"
        placeholder="Enter your last name"
        required={true}
        emptyInvalid={true}
        value={userData.last_name}
        onChange={onChange}
        validate={Validate.notEmpty}
        afterValidate={fail}
      />
      <Input
        name="phone_number"
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone number"
        value={userData.phone_number}
        onChange={onChange}
        validate={Validate.phone}
        afterValidate={fail}
      />
      <Input
        name="address"
        label="Address"
        type="text"
        placeholder="Enter your street address"
        value={userData.address}
        onChange={onChange}
        validate={Validate.isString}
        afterValidate={fail}
      />
      <Input
        name="city"
        label="City"
        type="text"
        placeholder="Enter your city"
        value={userData.city}
        validate={Validate.isString}
        onChange={onChange}
      />
      <Input
        name="province"
        label="Province"
        type="text"
        placeholder="Enter your province"
        value={userData.province}
        onChange={onChange}
        validate={Validate.isString}
        afterValidate={fail}
      />
      <Input
        name="postalCode"
        label="Postal Code"
        type="text"
        placeholder="Enter your postal code"
        value={userData.postalCode}
        onChange={onChange}
        validate={Validate.isString}
        afterValidate={fail}
      />
      <Input
        name="linkedIn"
        label="LinkedIn"
        type="url"
        placeholder="Enter your LinkedIn URL"
        value={userData.linkedIn}
        onChange={onChange}
        validate={Validate.url}
        afterValidate={fail}
      />
      <Input
        name="github"
        label="GitHub"
        type="url"
        placeholder="Enter your GitHub URL"
        value={userData.github}
        onChange={onChange}
        validate={Validate.url}
        afterValidate={fail}
      />
      <Input
        name="website"
        label="Website"
        type="url"
        placeholder="Enter your website URL"
        value={userData.website}
        onChange={onChange}
        validate={Validate.url}
        afterValidate={fail}
      />
      <Input
        name="facebook"
        label="Facebook"
        type="url"
        placeholder="Enter a short facebook URL"
        invalidMessage="Please enter a valid facebook URL"
        value={userData.facebook}
        onChange={onChange}
        validate={Validate.url}
        afterValidate={fail}
      />
      <Button
        text="Update Profile"
        disabled={!confirmValid()}
        onClick={saveProfile}
      />
    </Form>
  );
}
