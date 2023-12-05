import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchCreateResume, getResumes, getUserData } from "../../../store";
import EditResume from "./item";

export default function CreateResume() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUserData, shallowEqual);
  const resumes = useSelector(getResumes, shallowEqual);
  const hasResume: boolean = resumes?.length > 0;

  const defaultResume: {
    title: string;
    description: string;
    user_id?: number;
    submitted?: number;
   } = {
    title: '',
    description: '',
    user_id: user?.id,
    submitted: 0,
  };
  const [
    newResume,
    // setNewResume,
  ] = useState(defaultResume);

  const onCreate = (resume: any) => {
    if (resume.submitted) {
      delete resume.submitted;
    }
    dispatch(fetchCreateResume(resume) as unknown as AnyAction);
    navigate('/dashboard/resume');
  }

  const checkTitle = (title: string) => {
    if (hasResume && resumes.length > 0) {
      const exists = resumes.some((resume: any) => resume.title === title);
      return !exists;
    }
    return true;
  }

  return (
    <>
      <h1 className='title'>Create Resume</h1>
      <Link to='/dashboard/resumes' className='back'>Back to Resumes</Link>
      <EditResume
        resume={newResume}
        onSave={onCreate}
        checkTitle={checkTitle}
        title="Create Resume"
      />
    </>
  );
}
