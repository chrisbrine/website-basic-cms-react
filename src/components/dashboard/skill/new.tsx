import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchAddSkill, getResumes, getSkillsLoading, getUserData } from "../../../store";
import EditEducation from "./item";
import Loading from "../../loading";

export default function CreateSkill() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUserData, shallowEqual);
  const resumes = useSelector(getResumes, shallowEqual);

  const defaultSkill: {
    resume_id: number;
    user_id?: number;
    image_file: any;
    skill_name: string;
    category: string;
   } = {
    resume_id: resumes[0]?.id,
    user_id: user?.id,
    image_file: null,
    skill_name: '',
    category: '',
  };
  const [
    newSkill,
    // setSkill,
  ] = useState(defaultSkill);

  const skillsIsLoading = useSelector(getSkillsLoading, shallowEqual);

  if (skillsIsLoading) {
    return (
      <Loading />
    );
  }


  const onCreate = (skill: any) => {
    dispatch(fetchAddSkill({
      id: skill.resume_id,
      skill,
    }) as unknown as AnyAction);
    navigate('/dashboard/skill');
  }

  return (
    <>
      <h1 className='title'>Create Skill</h1>
      <Link to='/dashboard/skill' className='back'>Back to Skills</Link>
      <EditEducation
        skill={newSkill}
        resumes={resumes}
        onSave={onCreate}
        title="Create Skill"
      />
    </>
  );
}
