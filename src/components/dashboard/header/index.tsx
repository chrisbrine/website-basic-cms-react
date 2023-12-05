import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchUserLogout, getResumes, getUserData, getUserLoggedin } from "../../../store";
import "./header.css";

export default function Header() {
  const dispatch = useDispatch();
  const loggedin = useSelector(getUserLoggedin);
  const user = useSelector(getUserData);
  const resumes = useSelector(getResumes);
  const hasResume: boolean = resumes?.length > 0;

  const doLogout = () => {
    dispatch(fetchUserLogout() as unknown as AnyAction);
  }

  return (
    <header className='dashboard'>
      <div className='top-bar'>
        <div className='titles'>
          <h1><NavLink to='/'>My Website</NavLink></h1>
          <h2><NavLink to='/dashboard'>Dashboard</NavLink></h2>
        </div>
        <nav className='status menu'>
          <ul>
            {loggedin
              ? (
                <>
                  <li className='welcome'>
                    Welcome, {user.first_name}!
                  </li>
                  <li className='link logout'>
                    <NavLink to='/dashboard' onClick={doLogout}>Logout</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className='link login'>
                    <NavLink to='/dashboard/login'>Login</NavLink>
                  </li>
                  <li className='link register'>
                    <NavLink to='/dashboard/register'>Register</NavLink>
                  </li>
                </>
              )
            }
          </ul>
        </nav>
      </div>
      <nav className='primary menu'>
        {loggedin && (
          <ul>
            <li className='link blog'>
              <NavLink to='/dashboard/blog'>Blog</NavLink>
            </li>
            <li className='link settings'>
              <NavLink to='/dashboard/settings'>Settings</NavLink>
            </li>
            <li className='link profile'>
              <NavLink to='/dashboard/profile'>Profile</NavLink>
            </li>
            <li className='link passwordUpdate'>
              <NavLink to='/dashboard/passwordupdate'>Password Update</NavLink>
            </li>
            <li className='link resume'>
              <NavLink to='/dashboard/resume'>Resume</NavLink>
            </li>
            {hasResume && (
              <>
                <li className='link workExperience'>
                  <NavLink to='/dashboard/workExperience'>Work Experience</NavLink>
                </li>
                <li className='link education'>
                  <NavLink to='/dashboard/education'>Education</NavLink>
                </li>
                <li className='link skills'>
                  <NavLink to='/dashboard/skill'>Skills</NavLink>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}
