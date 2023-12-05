import { useSelector } from "react-redux";
import { Button, Form, Input, TextArea, Validate } from "../forms";
import { getMainData } from "../../store";
import { createRef, useState } from "react";

export default function Contact() {
  const formRef = createRef<HTMLFormElement>();
  const mainData = useSelector(getMainData);
  const title = mainData?.user?.first_name
    ? `Contact ${mainData.user.first_name}`
    : 'Contact';
  const [hadSubmitted, setHadSubmitted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disableForm, setDisableForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = (func: any, value: any, isValid: boolean) => {
    func && func(value);
    setDisabled(!isValid);
    setHadSubmitted(false);
  }

  const handleChange = (args: any) => {
    let isValid: boolean = !disabled;
    let func = undefined;
    switch (args.field) {
      case 'name':
        func = setName;
        isValid = (args.value && Validate.email(email) && email && message) as boolean;
        break;
      case 'email':
        func = setEmail;
        isValid = (Validate.email(args.value) && args.value && name && message) as boolean;
        break;
      case 'subject':
        func = setSubject;
        isValid = (Validate.email(email) && email && name && message) as boolean;
        break;
      case 'message':
      case 'text':
      case 'body':
        func = setMessage;
        isValid = (Validate.email(email) && email && name && args.value) as boolean;
        break;
      default:
        break;
    }
    handleUpdate(func, args.value, isValid);
  }

  const handleSubmit = () => {
    setHadSubmitted(true);
    setDisabled(true);
    setDisableForm(true);
    formRef?.current?.submit();
  }

  return (
    <Form
      formRef={formRef}
      action={`mailto:${mainData?.user?.email}`}
    >
      <h1>{title}</h1>
      <Input
        name='name'
        label='Name'
        placeholder='Enter your name'
        required={true}
        readonly={disableForm || hadSubmitted}
        disabled={disableForm || hadSubmitted}
        value={name}
        onChange={handleChange}
        validate={Validate.notEmpty}
        emptyInvalid={hadSubmitted}
        invalidMessage='Please enter your name'
      />
      <Input
        name='email'
        label='Email'
        placeholder='Enter your email'
        required={true}
        disabled={disableForm}
        value={email}
        onChange={handleChange}
        validate={Validate.email}
        emptyInvalid={hadSubmitted}
        invalidMessage='Please enter a valid email address'
      />
      <Input
        name='subject'
        label='Subject'
        placeholder='Enter your subject'
        required={true}
        disabled={disableForm}
        value={subject}
        onChange={handleChange}
      />
      <TextArea
        name='body'
        label='Message'
        placeholder='Enter your message'
        rows={10}
        required={true}
        disabled={disableForm}
        value={message}
        onChange={handleChange}
        validate={Validate.notEmpty}
        emptyInvalid={hadSubmitted}
        invalidMessage='Please enter your message'
      />
      <Button
        type='submit'
        text='Submit'
        disabled={disabled}
        onClick={handleSubmit}
      />
    </Form>
  );
}
