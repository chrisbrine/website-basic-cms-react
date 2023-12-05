import { createRef, useState } from 'react';
import { Form, Input, Button, Validate, Select, FileInput } from '../../forms';
import '../resumes.css';
import { useSelector } from 'react-redux';
import { getMainSettings } from '../../../store';
import { processSettings } from '../../../types';

interface SkillProps {
  title?: string;
  buttonLabel?: string;
  description?: string;
  skill: {
    id?: number;
    resume_id: number;
    user_id?: number;
    image_file: any;
    skill_name: string;
    category: string;
  };
  resumes?: any[];
  onChange?: (args: any) => void;
  onSave?: (WorkExperience: any) => void;
  onDelete?: (workExperience: any) => void;
}

export default function Skill({
  title = '',
  buttonLabel = 'Save Skill',
  description = '',
  resumes = [],
  skill,
  onChange,
  onSave,
  onDelete,
}: SkillProps) {
  const settings = useSelector(getMainSettings);
  const currentCategories = processSettings(settings).skill_categories;
  const categories = Object.fromEntries(currentCategories.map((category) => ([
    category, category,
  ])));
  const resumeIdRef = createRef<any>();
  const imageFileRef = createRef<any>();
  const skillNameRef = createRef<any>();
  const categoryRef = createRef<any>();
  const [resumeIdState, setResumeIdState] = useState(skill?.resume_id ?? 0);
  const [imageFileState, setImageFileState] = useState(skill?.image_file);
  const [skillNameState, setSkillNameState] = useState(skill?.skill_name);
  const [categoryState, setCategoryState] = useState(skill?.category);
  const [disabled, setDisabled] = useState(true);
  let resumeOptions: {[key: string]: string} = {};

  resumes.forEach((resume: any) => {
    resumeOptions[resume.id] = `#${resume.id} - ${resume.title}`;
  });


  if (!title) {
    if (skill.id) {
      title = `Skill #${skill.id}`;
    } else {
      title = 'Skill';
    }
  }

  const evaluateDisabled = (value: any, required: boolean = true) => {
    setDisabled(
      (required ? !value : false) ||
      !resumeIdState ||
      // !imageFileState ||
      !skillNameState ||
      !categoryState
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
      case 'skill_name': {
        processChange(setSkillNameState, args);
        break;
      }
      case 'category': {
        processChange(setCategoryState, args);
        break;
      }
      default: {
        break;
      }
    }
  };

  const getProcessedState = () => {
    return {
      ...skill,
      resume_id: resumeIdState,
      image_file: imageFileState,
      skill_name: skillNameState,
      category: categoryState,
    };
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(getProcessedState());
    } else {
      setResumeIdState(0);
      setImageFileState('');
      setSkillNameState('');
      setCategoryState('');
      resumeIdRef.current.state.value = '';
      imageFileRef.current.state.value = '';
      skillNameRef.current.state.value = '';
      categoryRef.current.state.value = '';
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
        label="Skill Photo"
        types={["image"]}
        placeholder="Upload the skill image"
        value={imageFileState ? imageFileState : ''}
        onChange={handleChange}
        validate={Validate.isImage}
      />
      <Input
        name='skill_name'
        label='Skill Name'
        type='text'
        ref={skillNameRef}
        placeholder='Please enter the skill name'
        value={skillNameState}
        required={true}
        emptyInvalid={true}
        onChange={handleChange}
        validate={Validate.notEmpty}
      />
      <Select
        name='category'
        label='Category'
        placeholder='Please select the category'
        value={categoryState}
        options={categories}
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