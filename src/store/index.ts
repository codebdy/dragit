import { createStore, combineReducers, applyMiddleware } from "redux";
import menuReducer from './menu/reducers'
import intlReducer from './intl/reducers'
import sidebarReducer from './sidebar/reducers'
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  menu: menuReducer,
  intl: intlReducer,
  sidebar: sidebarReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}