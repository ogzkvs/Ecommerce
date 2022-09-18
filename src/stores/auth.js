import {createSlice} from '@reduxjs/toolkit';

export const auth = createSlice({
  name: 'auth',
  initialState: {
    status: false,
    token: '',
    loginin: true,
    active: true,
  },

  reducers: {
    signin: (state, action) => {
      state.status = true;
      state.token = action.payload.token;
    },
    loginin: (state, action) => {
      state.loginin = false;
    },
    signout: (state, action) => {
      state.status = false;
      state.token = '';
    },
    click: (state, action) => {
      state.active = false;
    },
  },
});

export const {signin, signout, loginin, click} = auth.actions;

export default auth.reducer;
