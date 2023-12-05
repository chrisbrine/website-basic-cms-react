import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import {
  fetchDeleteEducation,
  getEducations,
  getEducationsLoading,
} from "../../../store";
import Loading from "../../loading";
import { Link } from "react-router-dom";
import '../resumes.css';
import { convertDateToString } from "../../../utils/date";

export default function Educations() {
  const dispatch = useDispatch();
  // const mainData = useSelector(getMainData);
  // const user = useSelector(getUserData, shallowEqual);
  const educations = useSelector(getEducations, shallowEqual);
  const educationIsLoading = useSelector(getEducationsLoading, shallowEqual);
  const hasEducations: boolean = educations?.length > 0;

  const onDelete = (education: any) => {
    const educationId = education.id;
    if (educationId) {
      dispatch(fetchDeleteEducation(educationId) as unknown as AnyAction);
    }
  }

  return educationIsLoading ? (
    <Loading />
  ) : (
    <div className='educations'>
      <table className='item-list educations'>
        <thead>
          <tr>
            <th>#</th>
            <th>R#</th>
            <th>School</th>
            <th>Degree</th>
            <th>Start</th>
            <th>End</th>
            <th className='actions'>Action</th>
          </tr>
        </thead>
        <tbody>
          {hasEducations && educations.map((education: any, index: number) => (
            <tr key={index}>
              <td>
                <Link to={`/dashboard/education/${education.id}`}>
                  {education.id}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/education/${education.id}`}>
                  {education.resume_id}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/education/${education.id}`}>
                  {education.school_name}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/education/${education.id}`}>
                  {education.degree}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/education/${education.id}`}>
                  {convertDateToString(education.start_date)}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/education/${education.id}`}>
                  {convertDateToString(education.end_date)}
                </Link>
              </td>
              <td className='actions'>
                <Link to={`/dashboard/education/${education.id}`} className='edit-button'>
                  Edit
                </Link>
                <Link to={'/dashboard/education'} onClick={() => onDelete(education)} className='delete-button'>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!hasEducations && (
        <div className='empty-list'>
          <h4>Nothing to list</h4>
        </div>
      )}
      <Link to={'/dashboard/education/new'} className='create-new'>Create New Education</Link>
    </div>
  );
}