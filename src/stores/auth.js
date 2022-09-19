import {createSlice} from '@reduxjs/toolkit';

export const auth = createSlice({
  name: 'auth',
  initialState: {
    status: false,
    token: '',
    loginin: true,
    name: '',
    email: '',
  },

  reducers: {
    signin: (state, action) => {
      state.status = true;
      state.token = action.payload.token;
    },
    loginin: (state, action) => {
      state.loginin = false;
    },
    userinfo: (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    signout: (state, action) => {
      state.status = false;
      state.token = '';
    },
  },
});

export const {signin, signout, loginin, userinfo} = auth.actions;

export default auth.reducer;
