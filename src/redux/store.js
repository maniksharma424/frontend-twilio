import { configureStore } from "@reduxjs/toolkit";
import previewSlice from "./previewSlice";

const store = configureStore({
  reducer: {
    previewSlice: previewSlice,
  },
});
export default store;
