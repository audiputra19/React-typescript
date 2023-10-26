import { createStore } from "redux";
import { applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import {persistStore} from "redux-persist";
import rootReducer from "./Root-reducer";

const middleWares: any = [thunk];
if(process.env.NODE_ENV === "development") middleWares.push(logger);
const finalCreateStore = applyMiddleware(...middleWares)(createStore);

export const store = finalCreateStore(rootReducer, {});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;