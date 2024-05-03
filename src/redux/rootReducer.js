/* Instruments */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can use other storage options if needed
// slices
import UserReducer from './slices/user';
import chatReducer from './slices/chat';
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['user', 'isAuthenticated'],
};

const reducer = combineReducers({
  user: persistReducer(userPersistConfig, UserReducer),
  chat: chatReducer,
});
export { rootPersistConfig, reducer };
