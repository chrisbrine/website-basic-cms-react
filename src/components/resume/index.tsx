import { useSelector } from "react-redux";
import { getMainData } from "../../store";
import Loading from "../loading";
import './resume.scss';
import WebsiteLogo from "../../images/website.png";
import FacebookLogo from "../../images/facebook.png";
import LinkedInLogo from "../../images/linkedin.png";
import GitHubLogo from "../../images/github.png";
import { Link } from "react-router-dom";

export default function Resume() {
  const mainData = useSelector(getMainData);

  if (!(mainData?.user?.email) || mainData?.resumes?.length === 0) {
    return (
      <Loading />
    );
  }

  const sortSkills = (skills: any) => {
    const result: {[key: string]: string[]} = {};
    skills.forEach((skill: any) => {
      if (!result[skill.category]) {
        result[skill.category] = [];
      }
      result[skill.category].push(skill);
    });

    return result;
  }

  const title = mainData?.user?.first_name && mainData?.user?.last_name
    ? `${mainData.user.first_name} ${mainData.user.last_name }`
    : mainData?.user?.first_name ? mainData.user.first_name : 'My Resume';

  const hasResume = mainData?.resumes?.length > 0;
  const resume = hasResume ? mainData.resumes[0] : undefined;
  const hasWorkExperience = mainData?.workExperiences?.length > 0;
  const hasEducation = mainData?.educations?.length > 0;
  const hasSkills = mainData?.skills?.length > 0;
  const workExperiences = hasWorkExperience ? mainData?.workExperiences : [];
  const education = hasEducation ? mainData?.educations : [];
  const skills = sortSkills(hasSkills ? mainData?.skills : []);

  const calculateTime = (date: string, isEndDate: boolean = false) => {
    if (!date) {
      return isEndDate ? (
        <span className='present empty-time'>Present</span>
      ) : (
        <span className='unknown empty-time'>Unknown</span>
      );
    }
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    return `${month} ${year}`;
  }

  return (
    <main className='resume frontend'>
      <div className='about'>
        {mainData?.user?.image_file?.data && (
          <div className='user-image'>
            <img src={mainData.user.image_file?.data} alt={title} />
          </div>
        )}
        <h2 className='name'>{title}</h2>
        {resume?.title && (
          <h3 className='resume-title'>{resume.title}</h3>
        )}
        <div className='site-links'>
          {mainData?.user?.website && (
            <div className='website site-link'>
              <Link to={mainData.user.website} target="_blank" rel="noreferrer">
                <img src={WebsiteLogo} alt="Website Logo" />
              </Link>
            </div>
          )}
          {mainData?.user?.github && (
            <div className='github site-link'>
              <Link to={mainData.user.github} target="_blank" rel="noreferrer">
                <img src={GitHubLogo} alt="GitHub Logo" />
              </Link>
            </div>
          )}
          {mainData?.user?.linkedIn && (
            <div className='linkedIn site-link'>
              <Link to={mainData.user.linkedIn} target="_blank" rel="noreferrer">
                <img src={LinkedInLogo} alt="LinkedIn Logo" />
              </Link>
            </div>
          )}
          {mainData?.user?.facebook && (
            <div className='facebook site-link'>
              <Link to={mainData.user.facebook} target="_blank" rel="noreferrer">
                <img src={FacebookLogo} alt="Facebook Logo" />
              </Link>
            </div>
          )}
        </div>
        <div className='address'>
          {mainData?.user?.address && (
            <div className='street'>{mainData.user.address}</div>
          )}
          {mainData?.user?.city && (
            <div className='city'>{mainData.user.city}</div>
          )}
          {mainData?.user?.province && (
            <div className='province'>{mainData.user.province}</div>
          )}
          {mainData?.user?.country && (
            <div className='country'>{mainData.user.country}</div>
          )}
          {mainData?.user?.postalCode && (
            <div className='postal code'>{mainData.user.postalCode}</div>
          )}
          <div className='contact'>
            {mainData?.user?.email && (
              <div className='email'>
                <a href={`mailto:${mainData.user.email}`}>{mainData.user.email}</a>
              </div>
            )}
            {mainData?.user?.phone_number && (
              <div className='phone-number'>
                <Link to={`tel:1${mainData.user.phone_number.replace(/^(-)|[.,](?=[^.,]*[.,](?!$))|[,.]+$|[^0-9.,]+/g, '$1')}`}>
                  {mainData.user.phone_number}
                </Link>
              </div>
            )}
          </div>
        </div>
        {resume.description && (
          <div className='resume-description'>{resume.description}</div>
        )}
      </div>
      {hasWorkExperience && (
        <div className='work-experience'>
          <h2 className='main-title'>Work Experience</h2>
          <ul className='work-experience-list items'>
            {workExperiences.map((workExperience: any, index: any) => (
              <li key={index} className='work-experience-item item'>
                {workExperience.image_file?.data && (
                  <div className='work-experience-image image'>
                    <img src={workExperience.image_file?.data} alt={workExperience.company_name} />
                  </div>
                )}
                <div className='company primary'>{workExperience.company_name}</div>
                <div className='position secondary'>{workExperience.position}</div>
                <div className='dates'>
                  <div className='start-date'>{calculateTime(workExperience.start_date)}</div>
                  <div className='between'></div>
                  <div className='end-date'>{calculateTime(workExperience.end_date, true)}</div>
                </div>
                <div className='description'>{workExperience.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasEducation && (
        <div className='education'>
          <h2 className='main-title'>Education</h2>
          <ul className='education-list items'>
            {education.map((education: any, index: any) => (
              <li key={index} className='education-item item'>
                {education.image_file?.data && (
                  <div className='education-image image'>
                    <img src={education.image_file?.data} alt={education.school_name} />
                  </div>
                )}
                <div className='school primary'>{education.school_name}</div>
                <div className='degree secondary'>{education.degree}</div>
                <div className='dates'>
                  <div className='start-date'>{calculateTime(education.start_date)}</div>
                  <div className='between'></div>
                  <div className='end-date'>{calculateTime(education.end_date, true)}</div>
                </div>
                <div className='description'>{education.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasSkills && (
        <div className='skills'>
          <h2 className='main-title'>Skills</h2>
          {typeof skills === 'object' &&
          Object.keys(skills).map((category: any, index: any) => (
            <div key={index} className='skill-category'>
              <h3>{category}</h3>
              <ul className='skill-list items'>
                {Array.isArray(skills[category]) &&
                Object.values(skills[category]).map((skill: any, index: any) => (
                  <li key={index} className='skill-item item'>
                    {skill.image_file?.data && (
                      <div className='skill-image image'>
                        <img src={skill.image_file?.data} alt={skill.skill_name} />
                      </div>
                    )}
                    <div className='skill-name primary'>{skill.skill_name}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}