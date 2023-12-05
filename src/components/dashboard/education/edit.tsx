import { useNavigate, useParams } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchDeleteEducation, fetchUpdateEducation, getEducations, getEducationsLoading, getResumes, } from "../../../store";
import Education from "./item";
import Loading from "../../loading";


export default function EditEducation() {
  const id = parseInt(useParams<{id: string}>()?.id ?? '');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resumes = useSelector(getResumes, shallowEqual);
  const educations = useSelector(getEducations, shallowEqual);
  const currentEducation = educations.find((education: any) => education.id === id);
  const educationIsLoading = useSelector(getEducationsLoading, shallowEqual);

  if (educationIsLoading) {
    return (
      <Loading />
    );
  }


  const onSave = (education: any) => {
    const educationId = education.id;
    if (educationId) {
      dispatch(fetchUpdateEducation({
        id: educationId,
        education,
      }) as unknown as AnyAction);
    }
    navigate('/dashboard/education');
  }

  const onDelete = (education: any) => {
    const educationId = education.id;
    if (educationId) {
      dispatch(fetchDeleteEducation(educationId) as unknown as AnyAction);
    }
  }

  return (
    <>
      <h1 className='title'>Edit Education</h1>
      <Link to='/dashboard/education' className='back'>Back to Educations</Link>
      <Education
        education={currentEducation}
        resumes={resumes}
        onSave={onSave}
        onDelete={onDelete}
      />
    </>
  );
}
