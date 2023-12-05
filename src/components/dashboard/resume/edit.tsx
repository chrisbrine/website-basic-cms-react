import { useNavigate, useParams } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { getResumes } from "../../../store";
import { fetchUpdateResume, fetchDeleteResume } from "../../../store";
import Resume from "./item";
import { Link } from "react-router-dom";


export default function EditResume() {
  const id = parseInt(useParams<{id: string}>()?.id ?? '');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resumes = useSelector(getResumes, shallowEqual);
  const currentResume = resumes.find((resume: any) => resume.id === id);
  const hasResume: boolean = resumes?.length > 0;

  const checkTitle = (title: string) => {
    if (hasResume && resumes.length > 0) {
      const exists = resumes.some((resume: any) => resume.title === title && resume.id !== id);
      return !exists;
    }
    return true;
  }

  const onSave = (resume: any) => {
    const resumeId = resume.id;
    if (resume.submitted) {
      delete resume.submitted;
    }
    if (resumeId) {
      dispatch(fetchUpdateResume({ id: resumeId, resume }) as unknown as AnyAction);
    }
    navigate('/dashboard/resume');
  }

  const onDelete = (resume: any) => {
    const resumeId = resume.id;
    if (resumeId) {
      dispatch(fetchDeleteResume(resumeId) as unknown as AnyAction);
    }
  }

  return (
    <>
      <h1 className='title'>Edit Resume</h1>
      <Link to='/dashboard/resume' className='back'>Back to Resumes</Link>
      <Resume
        resume={currentResume}
        onSave={onSave}
        onDelete={onDelete}
        checkTitle={checkTitle}
      />
    </>
  );
}
