import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Authslics from "../Reducers/Authslics";

const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted version of your auth reducer
const persistedAuthReducer = persistReducer(persistConfig, Authslics);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // Add other reducers here if you have any
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
