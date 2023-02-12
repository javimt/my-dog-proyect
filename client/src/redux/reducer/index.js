//import { cases } from "../action";
import pageModulated, { pageNumbers } from "../../pageFunction";

const initialState = {
  
  allDogs: [],
  dogsRender: [],
  detail: [],
  tempers: [],
  changePage:[],
  page: 0,
  pages: 0
};

export default function rootReducer(state = initialState, action) {
  const dogs = state.dogsRender
  switch(action.type) {
    case "GET_DOGS":
    //const response = action.payload
//console.log(response)
      return {
        ...state,
        allDogs: action.payload,
        dogsRender: pageModulated([...action.payload], 8),
        //pages: pageNumbers([...action.payload], 8), 
        page: 0 
      }
    case "GET_DOGS_BY_NAME": 
   const result = [...state.allDogs].filter(d => d.name.toLowerCase().includes(action.payload.toLowerCase()))
//console.log(state.allDogs)
      return {
        ...state,
        //allDogs: action.payload,
        dogsRender: pageModulated(result, 8),
        //pages: pageNumbers(result, 8),
        page: 0
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
        //dogsRender: action.payload
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
    case "FILTER_BY_TEMPERAMENTS":
      const dogsTemp =
        action.payload === "all"
          ? dogs //state.copyAllDogs
          : dogs.filter((elem) => elem.temperament?.includes(action.payload)); //uso la copia de todos los perros, porque este filtro se va a asignar a allDogs
      return {
        //así que si elijo otra opción va a filtrar en un allDogs ya filtrado
        ...state,
        dogsRender: dogsTemp,
      };
    case "FILTER_BY_API":
      const apiFilt =
        action.payload === "api"
          ? dogs.filter((elem) => !elem.createInDb)
          : dogs.filter((elem) => elem.createInDb);
      return {
        ...state,
        dogsRender: action.payload === "all" ? dogs : apiFilt,
      };
    case "CHANGE_PAGE":
      const act = action.payload
      return {
        ...state,
        page: act === "prev" ?
        state.page > 0 ?   // && state.page - 1 : 
        state.page - 1 :
        state.page :
        state.page < state.dogsRender.length - 1 ?
        state.page + 1 : 
        state.page
      }
    case "SORT_BY_WEIGHT":
      const weightArr = action.payload === "asc" 
      ? dogs.sort((a, b) => {
        if (a.weight > b.weight) return 1;
        if (b.weight > a.weight) return -1;
        return 0;
      })
    : dogs.sort((a, b) => {
        if (a.weight > b.weight) return -1;
        if (b.weight > a.weight) return 1;
        return 0;
      });
      return {
        ...state,
        dogsRender: weightArr,
      }
    case "SORT_BY_NAME":
      const sortName = action.payload === "asc"
      ? dogs.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
      })
    : dogs.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (b.name > a.name) return 1;
        return 0;
      });
    return {
      ...state,
      dogs: sortName,
    };

    default:
      return {
        ...state
      }
  }
   
}
