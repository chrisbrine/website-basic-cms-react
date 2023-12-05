import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResumeData } from "../../data";

/** Any **/

interface IInitialState {
  data: any,
  loading: {
    get: true,
    create: false,
    update: false,
    delete: false,
  },
  hasError: {
    get: false,
    create: false,
    update: false,
    delete: false,
  },
  error: {
    get: null,
    create: null,
    update: null,
    delete: null,
  },
};

const defaultState: IInitialState = {
  data: [],
  loading: {
    get: true,
    create: false,
    update: false,
    delete: false,
  },
  hasError: {
    get: false,
    create: false,
    update: false,
    delete: false,
  },
  error: {
    get: null,
    create: null,
    update: null,
    delete: null,
  },
};

/** Resume **/

export const fetchGetAllResumes = createAsyncThunk(
  'resume/getAllResumes',
  async () => {
    return await ResumeData.getResumes();
  },
);

export const fetchCreateResume = createAsyncThunk(
  'resume/createResume',
  async (resume: any) => {
    return await ResumeData.createResume(resume);
  },
);

export const fetchUpdateResume = createAsyncThunk(
  'resume/updateResume',
  async ({ id, resume }: { id: number, resume: any }) => {
    return await ResumeData.updateResume(id, resume);
  },
);

export const fetchDeleteResume = createAsyncThunk(
  'resume/deleteResume',
  async (id: number) => {
    return await ResumeData.deleteResume(id);
  },
);

const resumeInitialState: IInitialState = defaultState;

const resumeReducers = {
  clearResumesError: (state: any) => {
    state.resume.hasError.get = false;
    state.resume.error.get = null;
  },
  clearAddResumeError: (state: any) => {
    state.resume.hasError.create = false;
    state.resume.error.create = null;
  },
  clearDeleteResumeError: (state: any) => {
    state.resume.hasError.delete = false;
    state.resume.error.delete = null;
  },
  clearUpdateResumeError: (state: any) => {
    state.resume.hasError.update = false;
    state.resume.error.update = null;
  },
};

const resumeExtraReducers = (builder: any) => {
  builder.addCase(fetchGetAllResumes.fulfilled, (state: any, action: any) => {
    state.resume.data = action.payload;
    state.resume.loading.get = false;
    state.resume.hasError.get = false;
    state.resume.error.get = null;
  }).addCase(fetchGetAllResumes.pending, (state: any) => {
    state.resume.loading.get = true;
  }).addCase(fetchGetAllResumes.rejected, (state: any, action: any) => {
    state.resume.loading.get = true;
    state.resume.hasError.get = true;
    state.resume.error.get = action.error;
  }).addCase(fetchCreateResume.fulfilled, (state: any, action: any) => {
    if (state.resume.data?.length > 0) {
      state.resume.data.push(action.payload);
    } else {
      state.resume.data = [ action.payload ];
    }
    state.resume.loading.create = false;
    state.resume.hasError.create = false;
    state.resume.error.create = null;
  }).addCase(fetchCreateResume.pending, (state: any) => {
    state.resume.loading.create = true;
  }).addCase(fetchCreateResume.rejected, (state: any, action: any) => {
    state.resume.loading.create = true;
    state.resume.hasError.create = true;
    state.resume.error.create = action.error;
  }).addCase(fetchUpdateResume.fulfilled, (state: any, action: any) => {
    state.resume.data = state.resume.data.map((resume: any) => {
      if (resume.id === action.payload.id) {
        return action.payload;
      }
      return resume;
    });
    state.resume.loading.update = false;
    state.resume.hasError.update = false;
    state.resume.error.update = null;
  }).addCase(fetchUpdateResume.pending, (state: any) => {
    state.resume.loading.update = true;
  }).addCase(fetchUpdateResume.rejected, (state: any, action: any) => {
    state.resume.loading.update = true;
    state.resume.hasError.update = true;
    state.resume.error.update = action.error;
  }).addCase(fetchDeleteResume.fulfilled, (state: any, action: any) => {
    state.resume.data = state.resume.data.filter((resume: any) => resume.id !== action.payload);
    state.resume.loading.delete = false;
    state.resume.hasError.delete = false;
    state.resume.error.delete = null;
  }).addCase(fetchDeleteResume.pending, (state: any) => {
    state.resume.loading.delete = true;
  }).addCase(fetchDeleteResume.rejected, (state: any, action: any) => {
    state.resume.loading.delete = true;
    state.resume.hasError.delete = true;
    state.resume.error.delete = action.error;
  });
};

export const getResumes = (state: any) => state.resume.resume.data;
export const getResumesLoading = (state: any) => state.resume.resume.loading?.get;
export const getResumesHasError = (state: any) => state.resume.resume.hasError?.get;
export const getResumesError = (state: any) => state.resume.resume.error?.get;

export const getCreateResumeLoading = (state: any) => state.resume.resume.loading.create;
export const getCreateResumeHasError = (state: any) => state.resume.resume.hasError.create;
export const getCreateResumeError = (state: any) => state.resume.resume.error.create;

export const getUpdateResumeLoading = (state: any) => state.resume.resume.loading.update;
export const getUpdateResumeHasError = (state: any) => state.resume.resume.hasError.update;
export const getUpdateResumeError = (state: any) => state.resume.resume.error.update;

export const getDeleteResumeLoading = (state: any) => state.resume.resume.loading.delete;
export const getDeleteResumeHasError = (state: any) => state.resume.resume.hasError.delete;
export const getDeleteResumeError = (state: any) => state.resume.resume.error.delete;

/** Work Experience **/

export const fetchAddWorkExperience = createAsyncThunk(
  'resume/addWorkExperience',
  async ({ id, workExperience }: { id: number, workExperience: any }) => {
    return await ResumeData.addWorkExperience(id, workExperience);
  },
);

export const fetchUpdateWorkExperience = createAsyncThunk(
  'resume/updateWorkExperience',
  async ({ id, workExperience }: { id: number, workExperience: any }) => {
    return await ResumeData.updateWorkExperience(id, workExperience);
  },
);

export const fetchDeleteWorkExperience = createAsyncThunk(
  'resume/deleteWorkExperience',
  async (id: number) => {
    return await ResumeData.deleteWorkExperience(id);
  },
);

export const fetchGetAllWorkExperiences = createAsyncThunk(
  'resume/getWorkExperiences',
  async () => {
    return await ResumeData.getAllWorkExperiences();
  },
);

const workExperienceInitialState: IInitialState = defaultState;

const workExperienceReducers = {
  clearWorkExperiencesError: (state: any) => {
    state.workExperience.hasError.get = false;
    state.workExperience.error.get = null;
  },
  clearAddWorkExperienceError: (state: any) => {
    state.workExperience.hasError.create = false;
    state.workExperience.error.create = null;
  },
  clearDeleteWorkExperienceError: (state: any) => {
    state.workExperience.hasError.delete = false;
    state.workExperience.error.delete = null;
  },
  clearUpdateWorkExperienceError: (state: any) => {
    state.workExperience.hasError.update = false;
    state.workExperience.error.update = null;
  },
};

const workExperienceExtraReducers = (builder: any) => {
  builder.addCase(fetchGetAllWorkExperiences.fulfilled, (state: any, action: any) => {
    state.workExperience.data = action.payload;
    state.workExperience.loading.get = false;
    state.workExperience.hasError.get = false;
    state.workExperience.error.get = null;
  }).addCase(fetchGetAllWorkExperiences.pending, (state: any) => {
    state.workExperience.loading.get = true;
  }).addCase(fetchGetAllWorkExperiences.rejected, (state: any, action: any) => {
    state.workExperience.loading.get = true;
    state.workExperience.hasError.get = true;
    state.workExperience.error.get = action.error;
  }).addCase(fetchAddWorkExperience.fulfilled, (state: any, action: any) => {
    if (state.workExperience.data?.length > 0) {
      state.workExperience.data.push(action.payload);
    } else {
      state.workExperience.data = [action.payload];
    }
    state.workExperience.loading.create = false;
    state.workExperience.hasError.create = false;
    state.workExperience.error.create = null;
  }).addCase(fetchAddWorkExperience.pending, (state: any) => {
    state.workExperience.loading.create = true;
  }).addCase(fetchAddWorkExperience.rejected, (state: any, action: any) => {
    state.workExperience.loading.create = true;
    state.workExperience.hasError.create = true;
    state.workExperience.error.create = action.error;
  }).addCase(fetchUpdateWorkExperience.fulfilled, (state: any, action: any) => {
    state.workExperience.data = state.workExperience.data.map((workExperience: any) => {
      if (workExperience.id === action.payload.id) {
        return action.payload;
      }
      return workExperience;
    });
    state.workExperience.loading.update = false;
    state.workExperience.hasError.update = false;
    state.workExperience.error.update = null;
  }).addCase(fetchUpdateWorkExperience.pending, (state: any) => {
    state.workExperience.loading.update = true;
  }).addCase(fetchUpdateWorkExperience.rejected, (state: any, action: any) => {
    state.workExperience.loading.update = true;
    state.workExperience.hasError.update = true;
    state.workExperience.error.update = action.error;
  }).addCase(fetchDeleteWorkExperience.fulfilled, (state: any, action: any) => {
    state.workExperience.data = state.workExperience.data.filter((workExperience: any) => workExperience.id !== action.payload);
    state.workExperience.loading.delete = false;
    state.workExperience.hasError.delete = false;
    state.workExperience.error.delete = null;
  }).addCase(fetchDeleteWorkExperience.pending, (state: any) => {
    state.workExperience.loading.delete = true;
  }).addCase(fetchDeleteWorkExperience.rejected, (state: any, action: any) => {
    state.workExperience.loading.delete = true;
    state.workExperience.hasError.delete = true;
    state.workExperience.error.delete = action.error;
  });
};

export const getWorkExperiences = (state: any) => state.resume.workExperience.data;
export const getWorkExperiencesLoading = (state: any) => state.resume.workExperience.loading.get;
export const getWorkExperiencesHasError = (state: any) => state.resume.workExperience.hasError.get;
export const getWorkExperiencesError = (state: any) => state.resume.workExperience.error.get;

export const getCreateWorkExperienceLoading = (state: any) => state.resume.workExperience.loading.create;
export const getCreateWorkExperienceHasError = (state: any) => state.resume.workExperience.hasError.create;
export const getCreateWorkExperienceError = (state: any) => state.resume.workExperience.error.create;

export const getUpdateWorkExperienceLoading = (state: any) => state.resume.workExperience.loading.update;
export const getUpdateWorkExperienceHasError = (state: any) => state.resume.workExperience.hasError.update;
export const getUpdateWorkExperienceError = (state: any) => state.resume.workExperience.error.update;

export const getDeleteWorkExperienceLoading = (state: any) => state.resume.workExperience.loading.delete;
export const getDeleteWorkExperienceHasError = (state: any) => state.resume.workExperience.hasError.delete;
export const getDeleteWorkExperienceError = (state: any) => state.resume.workExperience.error.delete;

/** Education **/

export const fetchAddEducation = createAsyncThunk(
  'resume/addEducation',
  async ({ id, education }: { id: number, education: any }) => {
    return await ResumeData.addEducation(id, education);
  },
);

export const fetchUpdateEducation = createAsyncThunk(
  'resume/updateEducation',
  async ({ id, education }: { id: number, education: any }) => {
    return await ResumeData.updateEducation(id, education);
  },
);

export const fetchDeleteEducation = createAsyncThunk(
  'resume/deleteEducation',
  async (id: number) => {
    return await ResumeData.deleteEducation(id);
  },
);

export const fetchGetAllEducations = createAsyncThunk(
  'resume/getEducations',
  async () => {
    return await ResumeData.getAllEducations();
  },
);

const educationInitialState: IInitialState = defaultState;

const educationReducers = {
  clearEducationsError: (state: any) => {
    state.education.hasError.get = false;
    state.education.error.get = null;
  },
  clearAddEducationError: (state: any) => {
    state.education.hasError.create = false;
    state.education.error.create = null;
  },
  clearDeleteEducationError: (state: any) => {
    state.education.hasError.delete = false;
    state.education.error.delete = null;
  },
  clearUpdateEducationError: (state: any) => {
    state.education.hasError.update = false;
    state.education.error.update = null;
  },
};

const educationExtraReducers = (builder: any) => {
  builder.addCase(fetchGetAllEducations.fulfilled, (state: any, action: any) => {
    state.education.data = action.payload;
    state.education.loading.get = false;
    state.education.hasError.get = false;
    state.education.error.get = null;
  }).addCase(fetchGetAllEducations.pending, (state: any) => {
    state.education.loading.get = true;
  }).addCase(fetchGetAllEducations.rejected, (state: any, action: any) => {
    state.education.loading.get = true;
    state.education.hasError.get = true;
    state.education.error.get = action.error;
  }).addCase(fetchAddEducation.fulfilled, (state: any, action: any) => {
    if (state.education.data?.length > 0) {
      state.education.data.push(action.payload);
    } else {
      state.education.data = [action.payload];
    }
    state.education.loading.create = false;
    state.education.hasError.create = false;
    state.education.error.create = null;
  }).addCase(fetchAddEducation.pending, (state: any) => {
    state.education.loading.create = true;
  }).addCase(fetchAddEducation.rejected, (state: any, action: any) => {
    state.education.loading.create = true;
    state.education.hasError.create = true;
    state.education.error.create = action.error;
  }).addCase(fetchUpdateEducation.fulfilled, (state: any, action: any) => {
    state.education.data = state.education.data.map((education: any) => {
      if (education.id === action.payload.id) {
        return action.payload;
      }
      return education;
    });
    state.education.loading.update = false;
    state.education.hasError.update = false;
    state.education.error.update = null;
  }).addCase(fetchUpdateEducation.pending, (state: any) => {
    state.education.loading.update = true;
  }).addCase(fetchUpdateEducation.rejected, (state: any, action: any) => {
    state.education.loading.update = true;
    state.education.hasError.update = true;
    state.education.error.update = action.error;
  }).addCase(fetchDeleteEducation.fulfilled, (state: any, action: any) => {
    state.education.data = state.education.data.filter((education: any) => education.id !== action.payload);
    state.education.loading.delete = false;
    state.education.hasError.delete = false;
    state.education.error.delete = null;
  }).addCase(fetchDeleteEducation.pending, (state: any) => {
    state.education.loading.delete = true;
  }).addCase(fetchDeleteEducation.rejected, (state: any, action: any) => {
    state.education.loading.delete = true;
    state.education.hasError.delete = true;
    state.education.error.delete = action.error;
  });
};

export const getEducations = (state: any) => state.resume.education.data;
export const getEducationsLoading = (state: any) => state.resume.education.loading.get;
export const getEducationsHasError = (state: any) => state.resume.education.hasError.get;
export const getEducationsError = (state: any) => state.resume.education.error.get;

export const getCreateEducationLoading = (state: any) => state.resume.education.loading.create;
export const getCreateEducationHasError = (state: any) => state.resume.education.hasError.create;
export const getCreateEducationError = (state: any) => state.resume.education.error.create;

export const getUpdateEducationLoading = (state: any) => state.resume.education.loading.update;
export const getUpdateEducationHasError = (state: any) => state.resume.education.hasError.update;
export const getUpdateEducationError = (state: any) => state.resume.education.error.update;

export const getDeleteEducationLoading = (state: any) => state.resume.education.loading.delete;
export const getDeleteEducationHasError = (state: any) => state.resume.education.hasError.delete;
export const getDeleteEducationError = (state: any) => state.resume.education.error.delete;

/** Skill **/

export const fetchAddSkill = createAsyncThunk(
  'resume/addSkill',
  async ({ id, skill }: { id: number, skill: any }) => {
    return await ResumeData.addSkill(id, skill);
  },
);

export const fetchUpdateSkill = createAsyncThunk(
  'resume/updateSkill',
  async ({ id, skill }: { id: number, skill: any }) => {
    return await ResumeData.updateSkill(id, skill);
  },
);

export const fetchDeleteSkill = createAsyncThunk(
  'resume/deleteSkill',
  async (id: number) => {
    return await ResumeData.deleteSkill(id);
  },
);

export const fetchGetAllSkills = createAsyncThunk(
  'resume/getSkills',
  async () => {
    return await ResumeData.getAllSkills();
  },
);

const skillInitialState: IInitialState = defaultState;

const skillReducers = {
  clearSkillsError: (state: any) => {
    state.skill.hasError.get = false;
    state.skill.error.get = null;
  },
  clearAddSkillError: (state: any) => {
    state.skill.hasError.create = false;
    state.skill.error.create = null;
  },
  clearDeleteSkillError: (state: any) => {
    state.skill.hasError.delete = false;
    state.skill.error.delete = null;
  },
  clearUpdateSkillError: (state: any) => {
    state.skill.hasError.update = false;
    state.skill.error.update = null;
  },
};

const skillExtraReducers = (builder: any) => {
  builder.addCase(fetchGetAllSkills.fulfilled, (state: any, action: any) => {
    state.skill.data = action.payload;
    state.skill.loading.get = false;
    state.skill.hasError.get = false;
    state.skill.error.get = null;
  }).addCase(fetchGetAllSkills.pending, (state: any) => {
    state.skill.loading.get = true;
  }).addCase(fetchGetAllSkills.rejected, (state: any, action: any) => {
    state.skill.loading.get = true;
    state.skill.hasError.get = true;
    state.skill.error.get = action.error;
  }).addCase(fetchAddSkill.fulfilled, (state: any, action: any) => {
    if (state.skill.data?.length > 0) {
      state.skill.data.push(action.payload);
    } else {
      state.skill.data = [action.payload];
    }
    state.skill.loading.create = false;
    state.skill.hasError.create = false;
    state.skill.error.create = null;
  }).addCase(fetchAddSkill.pending, (state: any) => {
    state.skill.loading.create = true;
  }).addCase(fetchAddSkill.rejected, (state: any, action: any) => {
    state.skill.loading.create = true;
    state.skill.hasError.create = true;
    state.skill.error.create = action.error;
  }).addCase(fetchUpdateSkill.fulfilled, (state: any, action: any) => {
    state.skill.data = state.skill.data.map((skill: any) => {
      if (skill.id === action.payload.id) {
        return action.payload;
      }
      return skill;
    });
    state.skill.loading.update = false;
    state.skill.hasError.update = false;
    state.skill.error.update = null;
  }).addCase(fetchUpdateSkill.pending, (state: any) => {
    state.skill.loading.update = true;
  }).addCase(fetchUpdateSkill.rejected, (state: any, action: any) => {
    state.skill.loading.update = true;
    state.skill.hasError.update = true;
    state.skill.error.update = action.error;
  }).addCase(fetchDeleteSkill.fulfilled, (state: any, action: any) => {
    state.skill.data = state.skill.data.filter((skill: any) => skill.id !== action.payload);
    state.skill.loading.delete = false;
    state.skill.hasError.delete = false;
    state.skill.error.delete = null;
  }).addCase(fetchDeleteSkill.pending, (state: any) => {
    state.skill.loading.delete = true;
  }).addCase(fetchDeleteSkill.rejected, (state: any, action: any) => {
    state.skill.loading.delete = true;
    state.skill.hasError.delete = true;
    state.skill.error.delete = action.error;
  });
};

export const getSkills = (state: any) => state.resume.skill.data;
export const getSkillsLoading = (state: any) => state.resume.skill.loading.get;
export const getSkillsHasError = (state: any) => state.resume.skill.hasError.get;
export const getSkillsError = (state: any) => state.resume.skill.error.get;

export const getCreateSkillLoading = (state: any) => state.resume.skill.loading.create;
export const getCreateSkillHasError = (state: any) => state.resume.skill.hasError.create;
export const getCreateSkillError = (state: any) => state.resume.skill.error.create;

export const getUpdateSkillLoading = (state: any) => state.resume.skill.loading.update;
export const getUpdateSkillHasError = (state: any) => state.resume.skill.hasError.update;
export const getUpdateSkillError = (state: any) => state.resume.skill.error.update;

export const getDeleteSkillLoading = (state: any) => state.resume.skill.loading.delete;
export const getDeleteSkillHasError = (state: any) => state.resume.skill.hasError.delete;
export const getDeleteSkillError = (state: any) => state.resume.skill.error.delete;

/** Combining States and Reducers **/

const combinedInitialState: {
  resume: IInitialState,
  workExperience: IInitialState,
  education: IInitialState,
  skill: IInitialState,
} = {
  resume: resumeInitialState,
  workExperience: workExperienceInitialState,
  education: educationInitialState,
  skill: skillInitialState,
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState: combinedInitialState,
  reducers: {
    ...resumeReducers,
    ...workExperienceReducers,
    ...educationReducers,
    ...skillReducers,
  },
  extraReducers: (builder: any) => {
    resumeExtraReducers(builder);
    workExperienceExtraReducers(builder);
    educationExtraReducers(builder);
    skillExtraReducers(builder);
  },
});

export const {
  clearResumesError,
  clearAddResumeError,
  clearDeleteResumeError,
  clearUpdateResumeError,
  clearWorkExperiencesError,
  clearAddWorkExperienceError,
  clearDeleteWorkExperienceError,
  clearUpdateWorkExperienceError,
  clearEducationsError,
  clearAddEducationError,
  clearDeleteEducationError,
  clearUpdateEducationError,
  clearSkillsError,
  clearAddSkillError,
  clearDeleteSkillError,
  clearUpdateSkillError,
} = resumeSlice.actions;

export default resumeSlice.reducer;
