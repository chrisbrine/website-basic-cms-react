import { createRef, useState } from 'react';
import { Form, Input, Button, Validate, TextArea, Select, FileInput, DatePicker } from '../../forms';
import '../resumes.css';
import { convertDateToInt, convertDateToIntArgs, convertToDate } from '../../../utils/date';

interface EducationProps {
  title?: string;
  buttonLabel?: string;
  description?: string;
  education: {
    id?: number;
    resume_id: number;
    user_id?: number;
    image_file: any;
    school_name: string;
    degree: string;
    description: string;
    start_date?: number;
    end_date?: number;
  };
  resumes?: any[];
  onChange?: (args: any) => void;
  onSave?: (WorkExperience: any) => void;
  onDelete?: (workExperience: any) => void;
}

export default function Education({
  title = '',
  buttonLabel = 'Save Education',
  description = '',
  resumes = [],
  education,
  onChange,
  onSave,
  onDelete,
}: EducationProps) {
  const resumeIdRef = createRef<any>();
  const imageFileRef = createRef<any>();
  const schoolNameRef = createRef<any>();
  const degreeRef = createRef<any>();
  const descriptionRef = createRef<any>();
  const startDateRef = createRef<any>();
  const endDateRef = createRef<any>();
  const [resumeIdState, setResumeIdState] = useState(education?.resume_id ?? 0);
  const [imageFileState, setImageFileState] = useState(education?.image_file);
  const [schoolNameState, setSchoolNameState] = useState(education?.school_name);
  const [degreeState, setDegreeState] = useState(education?.degree);
  const [descriptionState, setDescriptionState] = useState(education?.description);
  const [startDateState, setStartDateState] = useState(education?.start_date);
  const [endDateState, setEndDateState] = useState(education?.end_date);
  const [disabled, setDisabled] = useState(true);
  let resumeOptions: {[key: string]: string} = {};

  resumes.forEach((resume: any) => {
    resumeOptions[resume.id] = `#${resume.id} - ${resume.title}`;
  });


  if (!title) {
    if (education.id) {
      title = `Education #${education.id}`;
    } else {
      title = 'Education';
    }
  }

  const evaluateDisabled = (value: any, required: boolean = true) => {
    setDisabled(
      (required ? !value : false) ||
      !resumeIdState ||
      // !imageFileState ||
      !schoolNameState ||
      !degreeState ||
      !descriptionState ||
      !startDateState
      // !endDateState
    );
  }

  const processChange = (setState: any, args: any, required: boolean = true) => {
    setState(args.value);
    onChange && onChange(args);
    evaluateDisabled(args.value, required);
  }

  const handleChange = (args: any) => {
    switch (args.field) {
      case 'resume_id': {
        processChange(setResumeIdState, args);
        break;
      }
      case 'image_file': {
        processChange(setImageFileState, args, false);
        break;
      }
      case 'school_name': {
        processChange(setSchoolNameState, args);
        break;
      }
      case 'degree': {
        processChange(setDegreeState, args);
        break;
      }
      case 'description': {
        processChange(setDescriptionState, args);
        break;
      }
      case 'start_date': {
        processChange(setStartDateState, convertDateToIntArgs(args));
        break;
      }
      case 'end_date': {
        processChange(setEndDateState, convertDateToIntArgs(args), false);
        break;
      }
      default: {
        break;
      }
    }
  };

  const getProcessedState = () => {
    return {
      ...education,
      resume_id: resumeIdState,
      image_file: imageFileState,
      school_name: schoolNameState,
      degree: degreeState,
      description: descriptionState,
      start_date: convertDateToInt(startDateState),
      end_date: convertDateToInt(endDateState),
    };
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(getProcessedState());
    } else {
      setResumeIdState(0);
      setImageFileState('');
      setSchoolNameState('');
      setDegreeState('');
      setDescriptionState('');
      setStartDateState(0);
      setEndDateState(0);
      resumeIdRef.current.state.value = '';
      imageFileRef.current.state.value = '';
      schoolNameRef.current.state.value = '';
      degreeRef.current.state.value = '';
      descriptionRef.current.state.value = '';
      startDateRef.current.state.value = '';
      endDateRef.current.state.value = '';
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave(getProcessedState());
    }
  }

  return (
    <Form className={`form`}>
      <Button
        className='delete-button'
        text='X'
        onClick={handleDelete}
      />
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <Select
        name='resume_id'
        label='Resume'
        placeholder='Please select the resume'
        value={resumeIdState}
        options={resumeOptions}
        onChange={handleChange}
      />
      <FileInput
        name="image_file"
        label="School Photo"
        types={["image"]}
        placeholder="Upload the school image"
        value={imageFileState ? imageFileState : ''}
        onChange={handleChange}
        validate={Validate.isImage}
      />
      <Input
        name='school_name'
        label='School Name'
        type='text'
        ref={schoolNameRef}
        placeholder='Please enter the school name'
        value={schoolNameState}
        required={true}
        emptyInvalid={true}
        onChange={handleChange}
        validate={Validate.notEmpty}
      />
      <Input
        name='degree'
        label='Degree'
        type='text'
        ref={degreeRef}
        placeholder='Please enter the degree'
        value={degreeState}
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
      <DatePicker
        name='start_date'
        label='Start Date'
        placeholder='Start Date'
        value={convertToDate(startDateState)}
        onChange={handleChange}
      />
      <DatePicker
        name='end_date'
        label='End Date'
        placeholder='End Date'
        value={convertToDate(endDateState)}
        onChange={handleChange}
      />
      <Button
        type='submit'
        disabled={disabled}
        text={buttonLabel}
        onClick={handleSave}
      />
    </Form>
  );
}