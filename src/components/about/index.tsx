import { useSelector } from "react-redux";
import { getMainData } from "../../store";
import { processSettings } from "../../types";

export default function About() {
  const mainData = useSelector(getMainData);
  const allSettings = mainData?.settings || [];
  const settings = processSettings(allSettings);

  return settings.home ? (
    <main className='about' dangerouslySetInnerHTML={{ __html: settings.about}}></main>
  ) : (
    <main className='about'>
      <h1>About</h1>
      <p>This is the about page</p>
    </main>
  );
}
