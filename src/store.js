import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/AuthSlice";
import userReducer from "./slices/userSlice";
import noticeReducer from "./slices/NoticeSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    notice: noticeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});