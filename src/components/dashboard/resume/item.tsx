import { createRef, useState } from 'react';
import { Form, Input, Button, Validate, TextArea } from '../../forms';
import '../resumes.css';

interface ResumeProps {
  title?: string;
  buttonLabel?: string;
  description?: string;
  resume: {
    id?: number;
    user_id?: number;
    title: string;
    description: string;
  };
  onChange?: (args: any) => void;
  onSave?: (resume: any) => void;
  onDelete?: (resume: any) => void;
  checkTitle?: (title: string) => boolean;
}

export default function Resume({
  title = '',
  buttonLabel = 'Save Resume',
  description = '',
  resume,
  onChange,
  onSave,
  onDelete,
  checkTitle,
}: ResumeProps) {
  const titleRef = createRef<any>();
  const descriptionRef = createRef<any>();
  const [titleState, setTitleState] = useState(resume.title);
  const [descriptionState, setDescriptionState] = useState(resume.description);
  const [titleExists, setTitleExists] = useState(false);
  const [disabled, setDisabled] = useState(true);

  if (!title) {
    if (resume.id) {
      title = `Resume #${resume.id}`;
    } else {
      title = 'Resume';
    }
  }

  const handleChange = (args: any) => {
    if (onChange) {
      onChange(args);
    }
    if (args.field === 'title') {
      const goodTitle = checkTitle ? checkTitle(args.value) : true;
      setTitleExists(!goodTitle);
      setTitleState(args.value);
      setDisabled(!args.value || !descriptionState || titleExists);
      if (goodTitle && onChange) {
        onChange(args);
      }
    } else if (args.field === 'description') {
      if (onChange) {
        onChange(args);
      }
      setDescriptionState(args.value);
      setDisabled(!titleState || !args.value || titleExists);
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete({
        ...resume,
        title: titleState,
        description: descriptionState,
      });
    } else {
      setTitleState('');
      setDescriptionState('');
      titleRef.current.state.value = '';
      descriptionRef.current.state.value = '';
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...resume,
        title: titleState,
        description: descriptionState,
      });
    }
  }

  return (
    <Form className={`form ${titleExists ? 'error' : ''}`}>
      <Button
        className='delete-button'
        text='X'
        onClick={handleDelete}
      />
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <Input
        name='title'
        label='Job Title'
        type='text'
        ref={titleRef}
        placeholder='Please enter the resume job title'
        value={titleState}
        required={true}
        emptyInvalid={true}
        onChange={handleChange}
        validate={Validate.notEmpty}
      />
      <TextArea
        name='description'
        label='Description'
        ref={descriptionRef}
        rows={10}
        placeholder='Description'
        required={true}
        emptyInvalid={true}
        value={descriptionState}
        onChange={handleChange}
        validate={Validate.notEmpty}
      />
      {titleExists && (
        <div className='submit-error'>A resume title already exists</div>
      )}
      <Button
        type='submit'
        disabled={disabled}
        text={buttonLabel}
        onClick={handleSave}
      />
    </Form>
  );
}