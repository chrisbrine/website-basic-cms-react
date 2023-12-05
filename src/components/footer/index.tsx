import { useSelector } from 'react-redux';
import { getMainData } from '../../store';
import './footer.css';

export default function Footer() {
  const mainData = useSelector(getMainData);
  const title = mainData?.user?.first_name && mainData?.user?.last_name
    ? `${mainData.user.first_name} ${mainData.user.last_name }`
    : mainData?.user?.first_name ? mainData.user.first_name : 'My Website';
  return (
    <footer className='frontend'>
      <p>&copy; {(new Date()).getFullYear()} {title}. All rights reserved.</p>
    </footer>
  )
}
