import { useNavigate, useParams } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchDeleteWorkExperience, fetchUpdateWorkExperience, getResumes, getWorkExperiences, getWorkExperiencesLoading } from "../../../store";
import WorkExperience from "./item";
import Loading from "../../loading";


export default function EditWorkExperience() {
  const id = parseInt(useParams<{id: string}>()?.id ?? '');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resumes = useSelector(getResumes, shallowEqual);
  const workExperiences = useSelector(getWorkExperiences, shallowEqual);
  const currentWorkExperience = workExperiences.find((workExperience: any) => workExperience.id === id);
  const workExperienceIsLoading = useSelector(getWorkExperiencesLoading, shallowEqual);

  if (workExperienceIsLoading) {
    return (
      <Loading />
    );
  }


  const onSave = (workExperience: any) => {
    const workExperienceId = workExperience.id;
    if (workExperience.submitted) {
      delete workExperience.submitted;
    }
    if (workExperienceId) {
      dispatch(fetchUpdateWorkExperience({
        id: workExperienceId,
        workExperience,
      }) as unknown as AnyAction);
    }
    navigate('/dashboard/workExperience');
  }

  const onDelete = (workExperience: any) => {
    const workExperienceId = workExperience.id;
    if (workExperienceId) {
      dispatch(fetchDeleteWorkExperience(workExperienceId) as unknown as AnyAction);
    }
  }

  return (
    <>
      <h1 className='title'>Edit Work Experience</h1>
      <Link to='/dashboard/workExperience' className='back'>Back to Work Experiences</Link>
      <WorkExperience
        workExperience={currentWorkExperience}
        resumes={resumes}
        onSave={onSave}
        onDelete={onDelete}
      />
    </>
  );
}
