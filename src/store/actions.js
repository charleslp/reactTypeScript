
export function getLoginInfo(data){
  return (dispatch,getState)=>{
    dispatch({type:'LOGIN_INFO',data})
  }
}
export function getStatus(data){
  return (dispatch,getState)=>{
    dispatch({type:"STATUS_COUNT",data})
  }
}