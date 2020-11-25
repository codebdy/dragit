import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import sidebarReducer from './sidebar/reducers';
import designReducer from './designer/reducers';
import pageReducer from './page/reducers';
import alertbarReducer from './alertbar/reducers';
import themeSetingsReducer from './theme/reducers';
import appReducer from './app/reducers';

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  designer: designReducer,
  page: pageReducer,
  alertbar:alertbarReducer,
  themeSettings:themeSetingsReducer,
  app:appReducer,
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