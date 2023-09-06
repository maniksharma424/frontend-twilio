import { createSlice } from "@reduxjs/toolkit";

const previewSlice = createSlice({
  name: "previewSlice",
  initialState: {
    fromName: "",
    fromPhoneNumber: "",
    message: "",
    media: null,
    recipients: [{ name: "", phoneNumber: "" }],
  },
  reducers: {
    setFromName: (state, action) => {
      state.fromName = action.payload;
    },
    setFromPhoneNumber: (state, action) => {
      state.fromPhoneNumber = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    addRecipent: (state, action) => {
      state.recipients = [{ name: "", phoneNumber: "" }, ...state.recipients];
    },
    handleRecipientNameChange: (state, action) => {
      state.recipients = action.payload;
    },
    handleRecipientPhoneNumberChange: (state, action) => {
      state.recipients = action.payload
    },
    clear:(state)=>{
      state.fromName= "",
      state.fromPhoneNumber= "",
      state.message= "",
      state.media= null,
      state.recipients = [{ name: "", phoneNumber: "" }]
    }
  },
});
export default previewSlice.reducer;
export const {
  setFromName,
  setFromPhoneNumber,
  setMessage,
  setMedia,
  addRecipent,
  handleRecipientNameChange,
  handleRecipientPhoneNumberChange,
  clear
} = previewSlice.actions;
