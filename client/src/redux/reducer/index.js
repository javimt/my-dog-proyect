//import { cases } from "../action";
import pageModulated from "../../pageFunction";

const initialState = {
  
  allDogs: [],
  dogsRender: [],
  detail: [],
  tempers: [],
  page: 0
};

export default function rootReducer(state = initialState, action) {
  switch(action.type) {
    case "GET_DOGS":
    //const response = action.payload
//console.log(response)
      return {
       ...state,
       allDogs: action.payload,
       dogsRender: pageModulated([...action.payload], 8) 
      }
    case "GET_DOGS_BY_NAME": 
   const result = [...state.allDogs].filter(d => d.name.toLowerCase().includes(action.payload.toLowerCase()))
//console.log(state.allDogs)
      return {
        ...state,
        //allDogs: action.payload,
        dogsRender: pageModulated(result, 8)
      }
    case "GET_DETAIL": 
      //const ids = [...state.allDogs].filter(d => d.id.includes(action.payload))
//console.log(ids)
      return {
        ...state,
        detail: action.payload[0] //ids
      }
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        tempers: action.payload,
        dogsRender: action.payload
      }
    case "CREATE_DOG":
      //const state1 = [...state]
//console.log(state1)
      return {
        ...state,
        dogsRender: action.payload
      }
    case "DELETE_DOG":
      return {
        ...state,
        dogsRender: action.payload
      }
    case "UPDATE_DOG":
      return {
        ...state,
        dogsRender: action.payload
      }
    case "CHANGE_PAGE":
      const act = action.payload
      return {
        ...state,
        page: act == "prev" ?
        state.page > 0 ?
        state.page - 1 :
        state.page :
        state.page < state.dogsRender.length - 1 ?
        state.page + 1 :
        state.page
      }

    default:
      return {
        ...state
      }
  }
   
}
