import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const middleware = [...getDefaultMiddleware()];

export const configuredStore = (initialState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
    preloadedState: initialState
  });

  return store;
}
