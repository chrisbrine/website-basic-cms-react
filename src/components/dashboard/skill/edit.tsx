import { useNavigate, useParams } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchDeleteSkill, fetchUpdateSkill, getResumes, getSkills, getSkillsLoading } from "../../../store";
import Education from "./item";
import Loading from "../../loading";


export default function EditSkill() {
  const id = parseInt(useParams<{id: string}>()?.id ?? '');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resumes = useSelector(getResumes, shallowEqual);
  const skills = useSelector(getSkills, shallowEqual);
  const currentSkill = skills.find((skill: any) => skill.id === id);
  const skillsIsLoading = useSelector(getSkillsLoading, shallowEqual);

  if (skillsIsLoading) {
    return (
      <Loading />
    );
  }

  const onSave = (skill: any) => {
    const skillId = skill.id;
    if (skill.submitted) {
      delete skill.submitted;
    }
    if (skillId) {
      dispatch(fetchUpdateSkill({
        id: skillId,
        skill,
      }) as unknown as AnyAction);
    }
    navigate('/dashboard/skill');
  }

  const onDelete = (skill: any) => {
    const skillId = skill.id;
    if (skillId) {
      dispatch(fetchDeleteSkill(skillId) as unknown as AnyAction);
    }
  }

  return (
    <>
      <h1 className='title'>Edit Skill</h1>
      <Link to='/dashboard/skill' className='back'>Back to Skills</Link>
      <Education
        skill={currentSkill}
        resumes={resumes}
        onSave={onSave}
        onDelete={onDelete}
      />
    </>
  );
}
