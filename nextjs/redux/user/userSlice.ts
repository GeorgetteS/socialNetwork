import { createSlice } from '@reduxjs/toolkit';

import { userAuthDTO } from '../../restApi/dto/userAuth.dto';

const initialState = {
  user: {} as userAuthDTO,
  isAuth: false,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, setAuth, reset } = user.actions;
export default user.reducer;
