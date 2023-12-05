import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMainData } from '../../store';
import './header.css';
// import { processSettings } from '../../types';

export default function Header() {
  const mainData = useSelector(getMainData);
  // const globalSettings = processSettings(mainData?.settings);
  const title = mainData?.user?.first_name && mainData?.user?.last_name
    ? `${mainData.user.first_name} ${mainData.user.last_name }`
    : mainData?.user?.first_name ? mainData.user.first_name : 'My Website';
  return (
    <header className='frontend'>
      <h1>{title}</h1>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
        <li>
          <NavLink to='/blog'>Blog</NavLink>
        </li>
        <li>
          <NavLink to='/resume'>Resume</NavLink>
        </li>
        <li>
          <NavLink to='/contact'>Contact</NavLink>
        </li>
      </ul>
    </header>
  )
}