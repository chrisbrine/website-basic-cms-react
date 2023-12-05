import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MainData } from '../../data';

export const fetchMainData = createAsyncThunk(
  'main/fetchMainData',
  async () => {
    return await MainData.getMain();
  },
);

export const fetchSettings = createAsyncThunk(
  'main/fetchSettings',
  async () => {
    return await MainData.getSettings();
  },
);

export const fetchAddSetting = createAsyncThunk(
  'main/fetchAddSetting',
  async (setting: any) => {
    return await MainData.addSetting(setting);
  },
);

export const fetchUpdateSetting = createAsyncThunk(
  'main/fetchUpdateSetting',
  async ({id, setting}: {id: number, setting: any}) => {
    return await MainData.updateSetting(id, setting);
  },
);

const initialState: {
  data: any,
  settings: any,
  loading: boolean,
  loadingError: boolean,
  error: any,
  resumeLoading: boolean,
  resumeLoadingError: boolean,
  resumeError: any,
  settingsLoading: boolean,
  settingsLoadingError: boolean,
  settingsError: any,
} = {
  data: {},
  settings: [],
  loading: true,
  loadingError: false,
  error: null,
  resumeLoading: false,
  resumeLoadingError: false,
  resumeError: null,
  settingsLoading: true,
  settingsLoadingError: false,
  settingsError: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    loadMainData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    addResume: (state, action) => {
      if (state.data.resumes.length <= 0) {
        state.data.resumes.push(action.payload);
      } else {
        state.data.resumes[0] = action.payload;
      }
      state.resumeLoading = false;
      state.resumeLoadingError = false;
      state.resumeError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMainData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    }).addCase(fetchMainData.pending, (state) => {
      state.loading = true;
    }).addCase(fetchMainData.rejected, (state, action) => {
      state.loading = true;
      state.loadingError = true;
      state.error = action.error;
    }).addCase(fetchSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
      state.settingsLoading = false;
    }).addCase(fetchSettings.pending, (state) => {
      state.settingsLoading = true;
    }).addCase(fetchSettings.rejected, (state, action) => {
      state.settingsLoading = true;
      state.settingsLoadingError = true;
      state.settingsError = action.error;
    }).addCase(fetchAddSetting.fulfilled, (state, action) => {
      state.settings.push(action.payload);
      state.settingsLoading = false;
      state.settingsLoadingError = false;
      state.settingsError = null;
    }).addCase(fetchAddSetting.pending, (state) => {
      state.settingsLoading = true;
    }).addCase(fetchAddSetting.rejected, (state, action) => {
      state.settingsLoading = true;
      state.settingsLoadingError = true;
      state.settingsError = action.error;
    }).addCase(fetchUpdateSetting.fulfilled, (state, action) => {
      const index = state.settings.findIndex((setting: any) => setting.id === action.payload.id);
      state.settings[index] = action.payload;
      state.settingsLoading = false;
      state.settingsLoadingError = false;
      state.settingsError = null;
    }).addCase(fetchUpdateSetting.pending, (state) => {
      state.settingsLoading = true;
    }).addCase(fetchUpdateSetting.rejected, (state, action) => {
      state.settingsLoading = true;
      state.settingsLoadingError = true;
      state.settingsError = action.error;
    });
  },
});

export const { loadMainData } = mainSlice.actions;

export default mainSlice.reducer;

export const getMainData = (state: any) => state.main.data;
export const getMainIsLoading = (state: any) => state.main.loading;
export const getMainIsError = (state: any) => state.main.loadingError;
export const getMainError = (state: any) => state.main.error;

export const getMainSettings = (state: any) => state.main.settings;
export const getMainSettingsLoading = (state: any) => state.main.settingsLoading;
export const getMainSettingsLoadingError = (state: any) => state.main.settingsLoadingError;
export const getMainSettingsError = (state: any) => state.main.settingsError;
