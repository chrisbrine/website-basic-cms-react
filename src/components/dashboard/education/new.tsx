import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchAddEducation, getEducationsLoading, getResumes, getUserData } from "../../../store";
import EditEducation from "./item";
import Loading from "../../loading";

export default function CreateEducation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUserData, shallowEqual);
  const resumes = useSelector(getResumes, shallowEqual);

  const defaultEducation: {
    resume_id: number;
    user_id?: number;
    image_file: any;
    school_name: string;
    degree: string;
    description: string;
    start_date?: number;
    end_date?: number;
   } = {
    resume_id: resumes[0]?.id,
    user_id: user?.id,
    image_file: null,
    school_name: '',
    degree: '',
    description: '',
    start_date: undefined,
    end_date: undefined,
  };
  const [
    newEducation,
    // setEducation,
  ] = useState(defaultEducation);

  const educationIsLoading = useSelector(getEducationsLoading, shallowEqual);

  if (educationIsLoading) {
    return (
      <Loading />
    );
  }


  const onCreate = (education: any) => {
    dispatch(fetchAddEducation({
      id: education.resume_id,
      education,
    }) as unknown as AnyAction);
    navigate('/dashboard/education');
  }

  return (
    <>
      <h1 className='title'>Create Education</h1>
      <Link to='/dashboard/education' className='back'>Back to Educations</Link>
      <EditEducation
        education={newEducation}
        resumes={resumes}
        onSave={onCreate}
        title="Create Education"
      />
    </>
  );
}
