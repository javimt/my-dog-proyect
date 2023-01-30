
const initialState = {
  allDogs: [],
  dogsFilter: [],
  detail: {},
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
      }
    case "GET_DOGS_BY_NAME": 
    //const result = [...state.allDogs].filter(d => d.name.toLowerCase().includes(action.payload.toLowerCase()));
//console.log(result)
    return {
      ...state,
      allDogs: action.payload
      //dogsFilter: result
    }
    default:
      return {
        ...state
      }
  }
   
}
