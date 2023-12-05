import BaseData from "./_base";

class ResumeData extends BaseData {
  public createResume = async (resume: any) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.postJson("resume", resume);
    return data;
  }
  public getResume = async (id: string) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.getJson(`resume/${id}`);
    return data;
  }
  public getResumes = async () => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.getJson("resume");
    return data;
  }
  public updateResume = async (id: number, resume: any) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.postJson(`resume/${id}`, resume);
    return data;
  }
  public deleteResume = async (id: number) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    await this.deleteJson(`resume/${id}`);
    return id;
  }
  public addWorkExperience = async (id: number, workExperience: any) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.postJson(`workExperienceAdd/${id}`, workExperience);
    return data;
  }
  public updateWorkExperience = async (id: number, workExperience: any) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.postJson(`workExperience/${id}`, workExperience);
    return data;
  }
  public getAllWorkExperiences = async () => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.getJson("workExperience");
    return data;
  }
  public deleteWorkExperience = async (id: number) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    await this.deleteJson(`workExperience/${id}`);
    return id;
  }
  public addEducation = async (id: number, education: any) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.postJson(`educationAdd/${id}`, education);
    return data;
  }
  public updateEducation = async (id: number, education: any) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.postJson(`education/${id}`, education);
    return data;
  }
  public deleteEducation = async (id: number) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    await this.deleteJson(`education/${id}`);
    return id;
  }
  public getAllEducations = async () => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.getJson("education");
    return data;
  }
  public addSkill = async (id: number, skill: any) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.postJson(`skillAdd/${id}`, skill);
    return data;
  }
  public updateSkill = async (id: number, skill: any) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.postJson(`skill/${id}`, skill);
    return data;
  }
  public deleteSkill = async (id: number) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    await this.deleteJson(`skill/${id}`);
    return id;
  }
  public getAllSkills = async () => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.getJson("skill");
    return data;
  }
}

const resumeData = new ResumeData();

export default resumeData;
