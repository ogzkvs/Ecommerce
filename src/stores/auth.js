import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
    name: 'auth',
    initialState: {
        status: false,
        token: '',
        loginin: true,
    },

    reducers: {
        signin: (state, action) => {
            state.status = true
            state.token = action.payload.token
        },
        loginin: (state, action) => {
            state.loginin = false

        },
        signout: (state, action) => {
            state.status = false
            state.token = ''
        },


    },
})


export const { signin, signout, loginin } = auth.actions

export default auth.reducer