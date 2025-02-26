import { createSlice } from '@reduxjs/toolkit';

const initialChatId = Date.now().toString();

const initialState = {
  conversations: {
    [initialChatId]: {
      messages: [{ text: 'Hello! How can I help you today?', sender: 'bot' }],
      title: 'New Chat',
    },
  },
  activeChatId: initialChatId, 
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;

      if (!state.conversations[chatId]) {
        state.conversations[chatId] = { messages: [], title: 'New Chat' };
      }

      state.conversations[chatId].messages.push(message);
    },

    startNewChat: state => {
      const newChatId = Date.now().toString();
      state.conversations[newChatId] = {
        messages: [],
        title: 'Generating title...',
      };
      state.activeChatId = newChatId;
    },

    setActiveChat: (state, action) => {
      state.activeChatId = action.payload;
    },
  },
});

export const { addMessage, startNewChat, setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
