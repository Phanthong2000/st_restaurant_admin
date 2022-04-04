import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import areaReducer from './reducers/areaReducer';
import authReducer from './reducers/authReducer';
import customerReducer from './reducers/customerReducer';
import employeeReducer from './reducers/employeeReducer';
import foodReducer from './reducers/foodReducer';
import orderReducer from './reducers/orderReducer';
import socketReducer from './reducers/socketReducer';
import userReducer from './reducers/userReducer';
import analyticReduce from './reducers/analyticReduce';

const rootReducer = combineReducers({
  user: userReducer,
  food: foodReducer,
  order: orderReducer,
  auth: authReducer,
  customer: customerReducer,
  employee: employeeReducer,
  area: areaReducer,
  socket: socketReducer,
  analytic: analyticReduce
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
