import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchAddWorkExperience, getResumes, getUserData, getWorkExperiencesLoading } from "../../../store";
import EditWorkExperience from "./item";
import Loading from "../../loading";

export default function CreateWorkExperience() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUserData, shallowEqual);
  const resumes = useSelector(getResumes, shallowEqual);

  const defaultWorkExperience: {
    resume_id: number;
    user_id?: number;
    image_file: any;
    company_name: string;
    position: string;
    description: string;
    start_date?: number;
    end_date?: number;
   } = {
    resume_id: resumes[0]?.id,
    user_id: user?.id,
    image_file: null,
    company_name: '',
    position: '',
    description: '',
    start_date: undefined,
    end_date: undefined,
  };
  const [
    newWorkExperience,
    // setNewWorkExperience,
  ] = useState(defaultWorkExperience);

  const workExperienceIsLoading = useSelector(getWorkExperiencesLoading, shallowEqual);

  if (workExperienceIsLoading) {
    return (
      <Loading />
    );
  }


  const onCreate = (workExperience: any) => {
    dispatch(fetchAddWorkExperience({
      id: workExperience.resume_id,
      workExperience,
    }) as unknown as AnyAction);
    navigate('/dashboard/workExperience');
  }

  return (
    <>
      <h1 className='title'>Create Work Experience</h1>
      <Link to='/dashboard/workExperience' className='back'>Back to Work Experiences</Link>
      <EditWorkExperience
        workExperience={newWorkExperience}
        resumes={resumes}
        onSave={onCreate}
        title="Create Work Experience"
      />
    </>
  );
}
