import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import persistConfig from '../reduxPersistConfig';
import persistReducer from 'redux-persist/es/persistReducer';

const persistedUserReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

export default store;