import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    pnr: null,   
    email: null, 
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPnrVal: (state, action) => {
      state.pnr = action.payload; 
    },
    setEmailVal: (state, action) => {
      state.email = action.payload; 
    },
  },
});

export const { setUser, setPnrVal, setEmailVal } = userSlice.actions;

export default userSlice.reducer;
