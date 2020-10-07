import {applyMiddleware, compose, createStore} from "redux";
import { persistStore } from "redux-persist";
import reducers from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";

const sagaMiddleware = createSagaMiddleware();



const middlewares = [sagaMiddleware];

//const composeEnhancers = compose;
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore(initialState) {
  const store = createStore(
    reducers(),
    composeEnhancers(applyMiddleware(...middlewares))
  );

	sagaMiddleware.run(rootSaga);
	store.__PERSISTOR = persistStore(store);
  

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/index", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}