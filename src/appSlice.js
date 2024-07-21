import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  isVendor:null,
  success:'',
}

export const app = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    reset: (state) => {
      state.email='';
      state.isVendor=null;
      state.success=''
    },
    setEmail: (state,{payload}) => {
      state.email = payload
    },
    setIsVendor: (state,{payload}) => {
      state.isVendor = payload
    },
    setSuccess: (state, {payload}) => {
      state.success = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEmail, setIsVendor, setSuccess,reset } = app.actions

export default app.reducer