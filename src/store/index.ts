import { createStore } from "redux";
import { combineReducers } from 'redux'
import menuReducer from './menu/reducers'

const rootReducer = combineReducers({
  menu: menuReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default function configureStore() {
  //const middlewares = [thunkMiddleware];
  //const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer//,
    //composeWithDevTools(middleWareEnhancer)
  );

  return store;
}