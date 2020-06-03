import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import menuReducer from './Menu/reducers';
import intlReducer from './Intl/reducers';
import sidebarReducer from './Sidebar/reducers';
import areaSelectReducer from './AreaSelect/reducers';
import fixedBarReducer from './FixedBar/reducers';

const rootReducer = combineReducers({
  menu: menuReducer,
  intl: intlReducer,
  sidebar: sidebarReducer,
  areaSelect: areaSelectReducer,
  fixedBar: fixedBarReducer,
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