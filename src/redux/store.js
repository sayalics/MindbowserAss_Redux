import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {fetchData, fetchDataFulfilled, fetchDataFailed} from './reducer';
import api from '../utils/api';

export const getData = () => {
    //IN order to use await your callback must be asynchronous using async keyword.
    return async dispatch => {
        //Then perform your asynchronous operations.
        try {
            //Have it first fetch data from our starwars url.
            const griphy = await fetch(api.getData);
            dispatch(fetchData(true));
            //Then use the json method to get json data from api/
            const data = await griphy.json();
            console.log('----------data-----------', data);
            // console.log('data results-------', data.results);
            //Now when the data is retrieved dispatch an action altering redux state.
            dispatch(fetchDataFulfilled(data))
          } catch(error) {
            console.log('Error in geting data', error);
            dispatch(fetchDataFailed(error))
          }
    }
}

export default createStore(reducer, applyMiddleware(thunk));
