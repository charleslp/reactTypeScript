import {combineReducers} from 'redux';

const defaultData = {
  loginInfo : {
    
  },
  statusCount:1
}

function loginInfo(state=defaultData.loginInfo,action){
  switch(action.type){
    case 'LOGIN_INFO':
      return action.data;
    default:
      return state;
  }
}

function statusCount(state=defaultData.statusCount,action){
  switch(action.type){
    case 'STATUS_COUNT':
      return action.data;
    default:
      return state
  }
}

export default combineReducers({
  loginInfo,
  statusCount
})
