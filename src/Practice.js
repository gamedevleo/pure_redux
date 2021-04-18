//async function to fetch date from url;

const redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;


//initialState of the app
const initialState = {
  loading:false,
  users:[],
  error:''
}

//actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//action creaters
const fetchUsersRequest = () =>{
  return {
    type:FETCH_USERS_REQUEST,
  }
}

const fetchUsersSuccess =(users)=>{
  return {
    type:FETCH_USERS_SUCCESS,
    payload:users
  }
}

const fetchUsersFailure =(error) =>{
  return {
    type:FETCH_USERS_FAILURE,
    payload:error
  }
}


//reducer of app
const reducer = (state= initialState, action)=>{
  switch(action.type){
    case FETCH_USERS_REQUEST:
     return {
       ...state,
       loading:true
     }
    case FETCH_USERS_SUCCESS:
      return {
        loading:false,
        users:action.payload,
        error:''
      }
    case FETCH_USERS_FAILURE:
      return {
        loading:false,
        users:[],
        error:action.payload
      }

  }
}

//important!!!     why need to return a function?  try to search
const fetchUsers = () =>{
  return dispatch=>{
    dispatch(fetchUsersRequest());
    axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res=>{
          const users = res.data.map(user => user.id);
          dispatch(fetchUsersSuccess(users));
        })
        .catch(error=>{
          dispatch(fetchUsersFailure(error.message));
        })
  }
}




//create store of the app
const store = createStore(reducer,applyMiddleware(thunkMiddleware));

store.subscribe(()=>{console.log(store.getState())});
store.dispatch(fetchUsers());
