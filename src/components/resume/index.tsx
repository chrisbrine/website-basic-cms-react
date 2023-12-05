import { useSelector } from "react-redux";
import { getMainData } from "../../store";
import Loading from "../loading";

export default function Resume() {
  const mainData = useSelector(getMainData);
  console.log(mainData);

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

  return (
    <main className='resume'>
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
        {resume.description && (
          <div className='resume-description'>{resume.description}</div>
        )}
        {mainData?.user?.email && (
          <div className='email'>
            <a href={`mailto:${mainData.user.email}`}>{mainData.user.email}</a>
          </div>
        )}
        {mainData?.user?.phone_number && (
          <div className='phone-number'>{mainData.user.phone_number}</div>
        )}
        {mainData?.user?.website && (
          <div className='website'>
            <a href={mainData.user.website}>{mainData.user.website}</a>
          </div>
        )}
        {mainData?.user?.github && (
          <div className='github'>
            <a href={mainData.user.github}>{mainData.user.github}</a>
          </div>
        )}
        {mainData?.user?.linkedIn && (
          <div className='linkedIn'>
            <a href={mainData.user.linkedIn}>{mainData.user.linkedIn}</a>
          </div>
        )}
        {mainData?.user?.facebook && (
          <div className='facebook'>
            <a href={mainData.user.facebook}>{mainData.user.facebook}</a>
          </div>
        )}
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
        </div>
      </div>
      {hasWorkExperience && (
        <div className='work-experience'>
          <h2>Work Experience</h2>
          {workExperiences.map((workExperience: any, index: any) => (
            <div key={index} className='work-experience-item'>
              {workExperience.image_file?.data && (
                <div className='work-experience-image'>
                  <img src={workExperience.image_file?.data} alt={workExperience.company_name} />
                </div>
              )}
              <div className='title'>{workExperience.title}</div>
              <div className='company'>{workExperience.company_name}</div>
              <div className='start-date'>{workExperience.start_date}</div>
              <div className='end-date'>{workExperience.end_date ?? 'present'}</div>
              <div className='description'>{workExperience.description}</div>
            </div>
          ))}
        </div>
      )}
      {hasEducation && (
        <div className='education'>
          <h2>Education</h2>
          {education.map((education: any, index: any) => (
            <div key={index} className='education-item'>
              {education.image_file?.data && (
                <div className='education-image'>
                  <img src={education.image_file?.data} alt={education.school_name} />
                </div>
              )}
              <div className='school'>{education.school_name}</div>
              <div className='degree'>{education.degree}</div>
              <div className='start-date'>{education.start_date}</div>
              <div className='end-date'>{education.end_date ?? 'present'}</div>
              <div className='description'>{education.description}</div>
            </div>
          ))}
        </div>
      )}
      {hasSkills && (
        <div className='skills'>
          <h2>Skills</h2>
          {typeof skills === 'object' &&
          Object.keys(skills).map((category: any, index: any) => (
            <div key={index} className='skill-category'>
              <h3>{category}</h3>
              <ul className='skill-list'>
                {Array.isArray(skills[category]) &&
                Object.values(skills[category]).map((skill: any, index: any) => (
                  <li key={index} className='skill-item'>
                    {skill.image_file?.data && (
                      <div className='skill-image'>
                        <img src={skill.image_file?.data} alt={skill.skill_name} />
                      </div>
                    )}
                    <div className='skill-name'>{skill.skill_name}</div>
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