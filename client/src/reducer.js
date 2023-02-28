import { useReducer } from "react";
import { createStore } from "redux";
import axios from "axios";
const initialState = {
    activeBatch:'',
    subjects:[],
    activeSub:'',
    exam:[],
    batches:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case 'showSubjects': 
        {
            localStorage.setItem("batch", action.payload.batch)
            return {
                ...state,
                subjects: action.payload.data,
                activeBatch:action.payload.batch
                
            }
        }
case "SHOWEXAM" :{
    return {
        ...state,
        exam: action.payload.data,
        activeSub: action.payload.sub
        
    }
}
case"fetchBatches":{
    return {
        ...state,
        batches: action.payload
    }
}


        default:
            return state;

    }





}

export const store = createStore(reducer)