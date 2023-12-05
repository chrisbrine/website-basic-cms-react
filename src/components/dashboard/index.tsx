import {
  // BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { AnyAction } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './header';
import LogIn from './login';
import Register from './register';
import Loading from '../loading';
import Profile from './profile'
import {
  fetchGetAllEducations,
  fetchGetAllResumes,
  fetchGetAllSkills,
  fetchGetAllWorkExperiences,
  fetchMyBlogPosts,
  getMyBlogPostsLoading,
  getResumes,
  getResumesLoading,
  getUserIsLoading,
  getUserLoggedin,
} from '../../store';
import Resumes from './resume';
import CreateResume from './resume/new';
import EditResume from './resume/edit';
import WorkExperience from './workExperience';
import CreateWorkExperience from './workExperience/new';
import EditWorkExperience from './workExperience/edit';
import Education from './education';
import CreateEducation from './education/new';
import EditEducation from './education/edit';
import Skill from './skill';
import CreateSkill from './skill/new';
import EditSkill from './skill/edit';
import Blog from './blog';
import CreateBlog from './blog/new';
import EditBlog from './blog/edit';
import Settings from './settings/settings';
import PasswordUpdate from './passwordUpdate';
import { fetchSettings, getMainSettingsLoading } from '../../store/reducers/main';
import './dashboard.css';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [ stillLoading, setStillLoading ] = useState(true);
  const loggedin = useSelector(getUserLoggedin);
  const blogPostsIsLoading = useSelector(getMyBlogPostsLoading);
  const userIsLoading = useSelector(getUserIsLoading);
  const resumeIsLoading = useSelector(getResumesLoading);
  const workExperienceIsLoading = useSelector(getResumesLoading);
  const settingsIsLoading = useSelector(getMainSettingsLoading);
  const educationIsLoading = useSelector(getResumesLoading);
  const skillIsLoading = useSelector(getResumesLoading);
  // const mainData = useSelector(getMainData);
  const resumes = useSelector(getResumes);
  const hasResume: boolean = resumes?.length > 0;

  useEffect(() => {
    if (loggedin) {
      if (resumeIsLoading) {
        dispatch(fetchGetAllResumes() as unknown as AnyAction);
      }
      if (workExperienceIsLoading) {
        dispatch(fetchGetAllWorkExperiences() as unknown as AnyAction);
      }
      if (educationIsLoading) {
        dispatch(fetchGetAllEducations() as unknown as AnyAction);
      }
      if (skillIsLoading) {
        dispatch(fetchGetAllSkills() as unknown as AnyAction);
      }
      if (blogPostsIsLoading) {
        dispatch(fetchMyBlogPosts() as unknown as AnyAction);
      }
      if (settingsIsLoading) {
        dispatch(fetchSettings() as unknown as AnyAction);
      }
      if (!userIsLoading && !resumeIsLoading && !workExperienceIsLoading && !educationIsLoading && !skillIsLoading && !blogPostsIsLoading) {
        setStillLoading(false);
      }
    } else if (!userIsLoading) {
      setStillLoading(false);
    }
  }, [
    dispatch,
    loggedin,
    stillLoading,
    blogPostsIsLoading,
    settingsIsLoading,
    userIsLoading,
    resumeIsLoading,
    workExperienceIsLoading,
    educationIsLoading,
    skillIsLoading,
  ]);

  return stillLoading ? (
    <Loading />
  ) : (
    <div className='dashboard'>
      <Header />
      <div className='main-body'>
        <Routes>
          {!loggedin ? (
            <>
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={<Navigate replace to='/dashboard/login' />} />
            </>
          ) : (
            <>
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/new" element={<CreateBlog />} />
              <Route path="/blog/:id" element={<EditBlog />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/passwordupdate" element={<PasswordUpdate />} />
              <Route path="/resume" element={<Resumes />} />
              <Route path="/resume/new" element={<CreateResume />} />
              <Route path="/resume/:id" element={<EditResume />} />
              {hasResume && (
                <>
                  <Route path="/workExperience" element={<WorkExperience />} />
                  <Route path="/workExperience/new" element={<CreateWorkExperience />} />
                  <Route path="/workExperience/:id" element={<EditWorkExperience />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/education/new" element={<CreateEducation />} />
                  <Route path="/education/:id" element={<EditEducation />} />
                  <Route path="/skill" element={<Skill />} />
                  <Route path="/skill/new" element={<CreateSkill />} />
                  <Route path="/skill/:id" element={<EditSkill />} />
                </>
              )}
              <Route path="/*" element={<Navigate replace to='/dashboard/blog' />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
