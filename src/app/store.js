import { configureStore } from '@reduxjs/toolkit';
import carReducer from "../features/car/carSlice"
import userSlice from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
		car: carReducer,
		user: userSlice
  },
});
