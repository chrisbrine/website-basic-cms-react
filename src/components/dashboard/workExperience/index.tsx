import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import {
  fetchDeleteWorkExperience,
  getWorkExperiences,
  getWorkExperiencesLoading,
} from "../../../store";
import Loading from "../../loading";
import { Link } from "react-router-dom";
import '../resumes.css';
import { convertDateToString } from "../../../utils/date";

export default function WorkExperiences() {
  const dispatch = useDispatch();
  // const mainData = useSelector(getMainData);
  // const user = useSelector(getUserData, shallowEqual);
  const workExperiences = useSelector(getWorkExperiences, shallowEqual);
  const workExperienceIsLoading = useSelector(getWorkExperiencesLoading, shallowEqual);
  const hasWorkExperience: boolean = workExperiences?.length > 0;

  const onDelete = (workExperience: any) => {
    const workExperienceId = workExperience.id;
    if (workExperienceId) {
      dispatch(fetchDeleteWorkExperience(workExperienceId) as unknown as AnyAction);
    }
  }

  return workExperienceIsLoading ? (
    <Loading />
  ) : (
    <div className='work-experiences'>
      <table className='item-list work-experiences'>
        <thead>
          <tr>
            <th>#</th>
            <th>R#</th>
            <th>Company</th>
            <th>Position</th>
            <th>Start</th>
            <th>End</th>
            <th className='actions'>Action</th>
          </tr>
        </thead>
        <tbody>
          {hasWorkExperience && workExperiences.map((workExperience: any, index: number) => (
            <tr key={index}>
              <td>
                <Link to={`/dashboard/workExperience/${workExperience.id}`}>
                  {workExperience.id}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/workExperience/${workExperience.id}`}>
                  {workExperience.resume_id}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/workExperience/${workExperience.id}`}>
                  {workExperience.company_name}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/workExperience/${workExperience.id}`}>
                  {workExperience.position}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/workExperience/${workExperience.id}`}>
                  {convertDateToString(workExperience.start_date)}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/workExperience/${workExperience.id}`}>
                  {convertDateToString(workExperience.end_date)}
                </Link>
              </td>
              <td className='actions'>
                <Link to={`/dashboard/workExperience/${workExperience.id}`} className='edit-button'>
                  Edit
                </Link>
                <Link to={'/dashboard/workExperience'} onClick={() => onDelete(workExperience)} className='delete-button'>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!hasWorkExperience && (
        <div className='empty-list'>
          <h4>Nothing to list</h4>
        </div>
      )}
      <Link to={'/dashboard/workExperience/new'} className='create-new'>Create New Work Experience</Link>
    </div>
  );
}