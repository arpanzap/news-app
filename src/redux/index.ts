import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import AuthReducer from './reducers/AuthReducer';
import thunk from 'redux-thunk';
import LoadingReducer from './reducers/LoadingReducer';

const persistConfig = {
  storage: AsyncStorage,
  key: 'persistedReducer',
  version: 1,
};

const rootReducer = combineReducers({
  persistedReducer: persistReducer(persistConfig, AuthReducer),
  loadingReducer: LoadingReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

// type to be used in useSelector
export type RootState = ReturnType<typeof rootReducer>;
export default store