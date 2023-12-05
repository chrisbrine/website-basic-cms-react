import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import {
  fetchDeleteSkill,
  getSkills,
  getSkillsLoading,
} from "../../../store";
import Loading from "../../loading";
import { Link } from "react-router-dom";
import '../resumes.css';

export default function Skills() {
  const dispatch = useDispatch();
  // const mainData = useSelector(getMainData);
  // const user = useSelector(getUserData, shallowEqual);
  const skills = useSelector(getSkills, shallowEqual);
  const skillsIsLoading = useSelector(getSkillsLoading, shallowEqual);
  const hasSkills: boolean = skills?.length > 0;

  const onDelete = (skill: any) => {
    const skillId = skill.id;
    if (skillId) {
      dispatch(fetchDeleteSkill(skillId) as unknown as AnyAction);
    }
  }

  return skillsIsLoading ? (
    <Loading />
  ) : (
    <div className='skills'>
      <table className='item-list skills'>
        <thead>
          <tr>
            <th>#</th>
            <th>R#</th>
            <th>Skill</th>
            <th>Category</th>
            <th className='actions'>Action</th>
          </tr>
        </thead>
        <tbody>
          {hasSkills && skills.map((skill: any, index: number) => (
            <tr key={index}>
              <td>
                <Link to={`/dashboard/skill/${skill.id}`}>
                  {skill.id}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/skill/${skill.id}`}>
                  {skill.resume_id}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/skill/${skill.id}`}>
                  {skill.skill_name}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/skill/${skill.id}`}>
                  {skill.category}
                </Link>
              </td>
              <td className='actions'>
                <Link to={`/dashboard/skill/${skill.id}`} className='edit-button'>
                  Edit
                </Link>
                <Link to={'/dashboard/skill'} onClick={() => onDelete(skill)} className='delete-button'>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!hasSkills && (
        <div className='empty-list'>
          <h4>Nothing to list</h4>
        </div>
      )}
      <Link to={'/dashboard/skill/new'} className='create-new'>Create New Skill</Link>
    </div>
  );
}