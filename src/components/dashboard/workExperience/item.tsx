import { createRef, useState } from 'react';
import { Form, Input, Button, Validate, TextArea, Select, FileInput, DatePicker } from '../../forms';
import '../resumes.css';
import { convertDateToInt, convertDateToIntArgs, convertToDate } from '../../../utils/date';

interface WorkExperienceProps {
  title?: string;
  buttonLabel?: string;
  description?: string;
  workExperience: {
    id?: number;
    resume_id: number;
    user_id?: number;
    image_file: any;
    company_name: string;
    position: string;
    description: string;
    start_date?: number;
    end_date?: number;
  };
  resumes?: any[];
  onChange?: (args: any) => void;
  onSave?: (WorkExperience: any) => void;
  onDelete?: (workExperience: any) => void;
}

export default function WorkExperience({
  title = '',
  buttonLabel = 'Save Work Experience',
  description = '',
  resumes = [],
  workExperience,
  onChange,
  onSave,
  onDelete,
}: WorkExperienceProps) {
  const resumeIdRef = createRef<any>();
  const imageFileRef = createRef<any>();
  const companyNameRef = createRef<any>();
  const positionRef = createRef<any>();
  const descriptionRef = createRef<any>();
  const startDateRef = createRef<any>();
  const endDateRef = createRef<any>();
  const [resumeIdState, setResumeIdState] = useState(workExperience?.resume_id ?? 0);
  const [imageFileState, setImageFileState] = useState(workExperience?.image_file);
  const [companyNameState, setCompanyNameState] = useState(workExperience?.company_name);
  const [positionState, setPositionState] = useState(workExperience?.position);
  const [descriptionState, setDescriptionState] = useState(workExperience?.description);
  const [startDateState, setStartDateState] = useState(workExperience?.start_date);
  const [endDateState, setEndDateState] = useState(workExperience?.end_date);
  const [disabled, setDisabled] = useState(true);
  let resumeOptions: {[key: string]: string} = {};

  resumes.forEach((resume: any) => {
    resumeOptions[resume.id] = `#${resume.id} - ${resume.title}`;
  });


  if (!title) {
    if (workExperience.id) {
      title = `Work Experience #${workExperience.id}`;
    } else {
      title = 'Work Experience';
    }
  }

  const evaluateDisabled = (value: any, required: boolean = true) => {
    setDisabled(
      (required ? !value : false) ||
      !resumeIdState ||
      // !imageFileState ||
      !companyNameState ||
      !positionState ||
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
      case 'company_name': {
        processChange(setCompanyNameState, args);
        break;
      }
      case 'position': {
        processChange(setPositionState, args);
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
      ...workExperience,
      resume_id: resumeIdState,
      image_file: imageFileState,
      company_name: companyNameState,
      position: positionState,
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
      setCompanyNameState('');
      setPositionState('');
      setDescriptionState('');
      setStartDateState(0);
      setEndDateState(0);
      resumeIdRef.current.state.value = '';
      imageFileRef.current.state.value = '';
      companyNameRef.current.state.value = '';
      positionRef.current.state.value = '';
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
        label="Employer Photo"
        types={["image"]}
        placeholder="Upload the employer image"
        value={imageFileState ? imageFileState : ''}
        onChange={handleChange}
        validate={Validate.isImage}
      />
      <Input
        name='company_name'
        label='Company Name'
        type='text'
        ref={companyNameRef}
        placeholder='Please enter the company name'
        value={companyNameState}
        required={true}
        emptyInvalid={true}
        onChange={handleChange}
        validate={Validate.notEmpty}
      />
      <Input
        name='position'
        label='Position'
        type='text'
        ref={positionRef}
        placeholder='Please enter the position'
        value={positionState}
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