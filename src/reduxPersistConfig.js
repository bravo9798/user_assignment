import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose localStorage or sessionStorage

const persistConfig = {
  key: "root",
  storage,
  // Add any other options as needed
};

export default persistConfig;
