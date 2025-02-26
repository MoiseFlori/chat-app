import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: {}, // 📌 Garantează că `conversations` este un obiect, nu `undefined`
  activeChatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;

      // 📌 Dacă conversația nu există, o creează
      if (!state.conversations[chatId]) {
        state.conversations[chatId] = [];
      }

      state.conversations[chatId].push(message);
    },

    startNewChat: state => {
      const newChatId = Date.now().toString();
      state.conversations[newChatId] = [];
      state.activeChatId = newChatId;
    },

    setActiveChat: (state, action) => {
      state.activeChatId = action.payload;
    },
  },
});

export const { addMessage, startNewChat, setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
