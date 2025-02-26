import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Folosim localStorage
import chatReducer from './chatSlice';

// Configurația pentru redux-persist
const persistConfig = {
  key: 'chat',
  storage,
};

const persistedReducer = persistReducer(persistConfig, chatReducer);

export const store = configureStore({
  reducer: {
    chat: persistedReducer, // Reducer-ul persistat
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Necesită dezactivarea verificării pentru persist
    }),
});

export const persistor = persistStore(store);
