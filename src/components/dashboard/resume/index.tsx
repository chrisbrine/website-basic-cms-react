import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import {
  fetchDeleteResume,
  getResumes,
  getResumesLoading,
} from "../../../store";
import Loading from "../../loading";
import { Link } from "react-router-dom";
import '../resumes.css';

export default function Resumes() {
  const dispatch = useDispatch();
  // const mainData = useSelector(getMainData);
  // const user = useSelector(getUserData, shallowEqual);
  const resumes = useSelector(getResumes, shallowEqual);
  const resumeIsLoading = useSelector(getResumesLoading, shallowEqual);
  const hasResume: boolean = resumes?.length > 0;

  const onDelete = (resume: any) => {
    const resumeId = resume.id;
    if (resumeId) {
      dispatch(fetchDeleteResume(resumeId) as unknown as AnyAction);
    }
  }

  return resumeIsLoading ? (
    <Loading />
  ) : (
    <div className='resumes'>
      <table className='item-list resumes'>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th className='actions'>Action</th>
          </tr>
        </thead>
        <tbody>
          {hasResume && resumes.map((resume: any, index: number) => (
            <tr key={index}>
              <td>
                <Link to={`/dashboard/resume/${resume.id}`}>
                  {resume.id}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/resume/${resume.id}`}>
                  {resume.title}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/resume/${resume.id}`}>
                  {resume.description}
                </Link>
              </td>
              <td className='actions'>
                <Link to={`/dashboard/resume/${resume.id}`} className='edit-button'>
                  Edit
                </Link>
                <Link to={'/dashboard/resume'} onClick={() => onDelete(resume)} className='delete-button'>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!hasResume && (
        <div className='empty-list'>
          <h4>Nothing to list</h4>
        </div>
      )}
      <Link to={'/dashboard/resume/new'} className='create-new'>Create New Resume</Link>
    </div>
  );
}