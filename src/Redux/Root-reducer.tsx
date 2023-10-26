import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import productReducer from "./Product/Reducer";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: "react",
    storage: storage,
};

const rootReducer = combineReducers({
    product: productReducer
});

export default persistReducer(persistConfig, rootReducer)