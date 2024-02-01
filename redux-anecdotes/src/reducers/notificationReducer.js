import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '' },
  reducers: {
    createAnecdoteMessage(state, action) {
      state.message = action.payload
    },
    removeMessage(state) {
      state.message = ''
    },
  }
})

export const { createAnecdoteMessage, removeMessage } = notificationSlice.actions;

export const setMessage = (message, time) => {
  return async dispatch => {
    dispatch(createAnecdoteMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time * 1000);
  }
}

export default notificationSlice.reducer;