import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '' },
  reducers: {
    createAnecdoteMessage(state, action) {
      state.message = `Anecdote "${action.payload}" created`
    },
    voteAnecdoteMessage(state) {
      state.message = `You vote was registered`
    },
    removeMessage(state) {
      state.message = ''
    },
  }
})

export const { createAnecdoteMessage, removeMessage, voteAnecdoteMessage } = notificationSlice.actions;
export default notificationSlice.reducer;