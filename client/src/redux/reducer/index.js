import { cases } from "../action";

const initialState = {
  allDogs: [],
  dogsRender: [],
  detail: [],
  tempers: [],
};

export default function rootReducer(state = initialState, action) {
  switch(action.type) {
    case "GET_DOGS":
    //const response = action.payload
//console.log(response)
      return {
       ...state,
       allDogs: action.payload,
       dogsRender: action.payload 
      }
    case "GET_DOGS_BY_NAME": 
   // const result = [...state.allDogs].filter(d => d.name.includes(action.payload));
console.log(state.allDogs)
      return {
        ...state,
        //allDogs: action.payload,
        dogsRender: [...state.allDogs].filter(d => d.name.toLowerCase().includes(action.payload.toLowerCase()))
      }
    case "GET_DETAIL": {
      //const ids = [...state.allDogs].filter(d => d.id.includes(action.payload))
//console.log(ids)
      return {
        ...state,
        detail: action.payload //ids
      }
    }
    default:
      return {
        ...state
      }
  }
   
}
