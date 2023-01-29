
const initialState = {
  allDogs: null,
  dogsFilter: null,
  detail: null,
  tempers: [],
};

export default function rootReducer(state = initialState, action) {
  switch(action.type) {
    case "GET_DOGS": 
    const response = action.payload
// console.log(response)
      return {
       ...state,
       allDogs: action.payload
      }
  }
}