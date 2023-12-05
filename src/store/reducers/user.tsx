import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../data';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    return await UserData.getUser();
  },
);

export const fetchUserLogin = createAsyncThunk(
  'user/fetchUserLogin',
  async ({email, password}: {email: string, password: string}) => {
    return await UserData.loginUser(email, password);
  },
);

export const fetchUserLogout = createAsyncThunk(
  'user/fetchUserLogout',
  async () => {
    return await UserData.logoutUser();
  },
);

export const fetchUserRegister = createAsyncThunk(
  'user/fetchUserRegister',
  async (user: any) => {
    return await UserData.registerUser(user);
  },
);

export const fetchUserUpdate = createAsyncThunk(
  'user/fetchUserUpdate',
  async (user: any) => {
    return await UserData.updateUser(user);
  },
);

export const fetchUserPasswordChange = createAsyncThunk(
  'user/fetchUserPasswordChange',
  async ({oldPassword, newPassword}: {
    oldPassword: string,
    newPassword: string,
  }) => {
    return await UserData.changePassword(oldPassword, newPassword);
  },
);

const initialState: {
  data: any,
  token: string|null,
  loggedin: boolean,
  loadingUser: boolean,
  loadingUpdate: boolean,
  loadingLogin: boolean,
  loadingPasswordChange: boolean,
  loadingRegister: boolean,
  loadingLogout: boolean,
  loadingError: boolean,
  loginError: boolean,
  logoutError: boolean,
  registerError: boolean,
  updateError: boolean,
  passwordChangeError: boolean,
  errorForLoading: any,
  errorForLogin: any,
  errorForRegister: any,
  errorForUpdate: any,
  errorForPasswordChange: any,
  errorForLogout: any,
} = {
  data: {},
  token: null,
  loggedin: false,
  loadingUser: true,
  loadingUpdate: false,
  loadingPasswordChange: false,
  loadingLogin: false,
  loadingRegister: false,
  loadingLogout: false,
  loadingError: false,
  loginError: false,
  logoutError: false,
  registerError: false,
  updateError: false,
  passwordChangeError: false,
  errorForLoading: null,
  errorForLogin: null,
  errorForLogout: null,
  errorForRegister: null,
  errorForUpdate: null,
  errorForPasswordChange: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUserData: (state, action) => {
      state.data = action.payload?.user;
      state.token = action.payload?.token;
      state.loadingUser = false;
    },
    updateUser: (state, action) => {
      state.data = action.payload;
    },
    login: (state, action) => {
      state.token = action.payload;
      state.loggedin = true;
    },
    logout: (state) => {
      state.token = null;
      state.loggedin = false;
    },
    register: (state, action) => {
      state.token = action.payload;
      state.loggedin = true;
    },
    clearUserError: (state) => {
      state.errorForLoading = null;
      state.loadingError = false;
      state.passwordChangeError = false;
      state.loginError = false;
      state.registerError = false;
      state.errorForLogin = null;
      state.errorForRegister = null;
      state.errorForPasswordChange = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload.data;
        state.token = action.payload.token;
        state.loggedin = true;
      } else {
        state.data = {};
        state.token = null;
        state.loggedin = false;
      }
      state.loadingUser = false;
    }).addCase(fetchUserData.pending, (state) => {
      state.loadingUser = true;
    }).addCase(fetchUserData.rejected, (state, action) => {
      state.data = {};
      state.token = null;
      state.loggedin = false;
      state.loadingUser = false;
      state.loadingError = true;
      state.errorForLoading = action.error;
    }).addCase(fetchUserUpdate.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
      state.loadingUpdate = false;
      state.updateError = false;
      state.errorForUpdate = null;
    }).addCase(fetchUserUpdate.pending, (state) => {
      state.loadingUpdate = true;
    }).addCase(fetchUserUpdate.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.updateError = true;
      state.errorForUpdate = action.error;
    }).addCase(fetchUserPasswordChange.fulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
        state.data = action.payload.data;
        state.loggedin = true;
      } else {
        state.token = null;
        state.data = {};
        state.loggedin = false;
      }
      state.loadingPasswordChange = false;
      state.passwordChangeError = false;
      state.errorForPasswordChange = null;
    }).addCase(fetchUserPasswordChange.pending, (state) => {
      state.loadingPasswordChange = true;
    }).addCase(fetchUserPasswordChange.rejected, (state, action) => {
      state.token = null;
      state.data = {};
      state.passwordChangeError = true;
      state.errorForPasswordChange = action.error;
    }).addCase(fetchUserLogin.fulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
        state.data = action.payload.data;
        state.loggedin = true;
      } else {
        state.token = null;
        state.data = {};
        state.loggedin = false;
      }
      state.loadingLogin = false;
      state.loginError = false;
      state.errorForLogin = null;
    }).addCase(fetchUserLogin.pending, (state) => {
      state.loadingLogin = true;
    }).addCase(fetchUserLogin.rejected, (state, action) => {
      state.token = null;
      state.data = {};
      state.loginError = true;
      state.errorForLogin = action.error;
    }).addCase(fetchUserLogout.fulfilled, (state) => {
      state.token = null;
      state.data = {};
      state.loggedin = false;
      state.logoutError = false;
      state.errorForLogout = null;
    }).addCase(fetchUserLogout.pending, (state) => {
      state.loadingLogout = true;
    }).addCase(fetchUserLogout.rejected, (state, action) => {
      state.token = null;
      state.data = {};
      state.logoutError = true;
      state.errorForLogout = action.error;
    }).addCase(fetchUserRegister.fulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
        state.data = action.payload.data;
        state.loggedin = true;
      } else {
        state.token = null;
        state.data = {};
        state.loggedin = false;
      }
      state.loadingRegister = false;
      state.registerError = false;
      state.errorForRegister = null;
    }).addCase(fetchUserRegister.pending, (state) => {
      state.loadingRegister = true;
    }).addCase(fetchUserRegister.rejected, (state, action) => {
      state.token = null;
      state.data = {};
      state.registerError = true;
      state.errorForRegister = action.error;
    });
  },
});

export const {
  loadUserData,
  updateUser,
  login,
  logout,
  register,
  clearUserError,
} = userSlice.actions;

export default userSlice.reducer;

export const getUserData = (state: any) => state.user.data;
export const getUserToken = (state: any) => state.user.token;
export const getUserLoggedin = (state: any) => state.user.loggedin;
/* Initial Functions */
export const getUserIsLoading = (state: any) => state.user.loadingUser;
export const getUserIsError = (state: any) => state.user.loadingError;
export const getUserError = (state: any) => state.user.error;
/* Update Functions */
export const getUserIsUpdating = (state: any) => state.user.loadingUpdate;
export const getUserIsUpdatingError = (state: any) => state.user.updateError;
export const getUserUpdatingError = (state: any) => state.user.errorForUpdate;
/* Password Change Functions */
export const getUserIsPasswordChanging = (state: any) => state.user.loadingPasswordChange;
export const getUserIsPasswordChangingError = (state: any) => state.user.passwordChangeError;
export const getUserPasswordChangingError = (state: any) => state.user.errorForPasswordChange;
/* Login Functions */
export const getUserIsLoggingIn = (state: any) => state.user.loadingLogin;
export const getUserIsLoggingInError = (state: any) => state.user.loginError;
export const getUserLoggingInError = (state: any) => state.user.errorForLogin;
/* Logout Functions */
export const getUserIsLoggingOut = (state: any) => state.user.loadingLogout;
export const getUserIsLoggingOutError = (state: any) => state.user.logoutError;
export const getUserLoggingOutError = (state: any) => state.user.errorForLogout;
/* Register Functions */
export const getUserIsRegistering = (state: any) => state.user.loadingRegister;
export const getUserIsRegisteringError = (state: any) => state.user.registerError;
export const getUserRegisteringError = (state: any) => state.user.errorForRegister;

