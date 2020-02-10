
const initialState = {
    data: [],
    loading: true,
    error: ''
}

// Define action types
const GET_DATA =  'GET_DATA';
const GET_DATA_FULLFILLED = 'GET_DATA_FULLFILLED';
const GET_DATA_FAIL = 'GET_DATA_FAIL';

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DATA :
            return {
                ...state,
                loading:false 
                };
        case GET_DATA_FULLFILLED :
            return{ 
                ...state,
                data: action.payload, 
                loading: false
                };
        case GET_DATA_FAIL :
            return{ 
                ...state,
                error: action.payload, 
                loading: false
                };
        default:
            return state;
    }
}

export const fetchData = (bool) => {
    return {
        type: GET_DATA,
        payload: bool,
        loading: false,
        };
    }

export const fetchDataFulfilled = (data) => {
    return {
        type: GET_DATA_FULLFILLED,
        payload: data,
        loading: false,
        };
    }

export const fetchDataFailed = (error) => {
    return {
        type: GET_DATA_FAIL,
        payload: error,
        loading:false,
        }
    }

export default reducer;