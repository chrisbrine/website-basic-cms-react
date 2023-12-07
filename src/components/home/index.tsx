import { useSelector } from "react-redux";
import { getMainData, getMainSettings } from "../../store";
import { processSettings } from "../../types";

export default function Home() {
  const mainData = useSelector(getMainData);
  const allSettings = mainData?.settings || [];
  const settings = processSettings(allSettings);
  return settings.home ? (
    <main className='home' dangerouslySetInnerHTML={{ __html: settings.home}}></main>
  ) : (
    <main className='home'>
      <p>This website is still being worked on for the backend and frontend to demonstrate my ability to put together such a website from scratch.</p>
      <p>Technologies used are:</p>
      <ul>
        <li>Frontend: React, Redux, React Router, TypeScript, and SCSS</li>
        <li>Backend: Python, Flask</li>
        <li>Database: SQLAlchemy</li>
      </ul>
    </main>
  );
}