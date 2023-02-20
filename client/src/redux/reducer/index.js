//import { cases } from "../action";
import pageModulated, { pageLength } from "../../pageFunction";

const initialState = {
  
  allDogs: [],
  dogsRender: [],
  detail: [],
  tempers: [],
  pages: 0,
  page: 0,
};

export default function rootReducer(state = initialState, action) {
  const dogs = state.allDogs;
  switch(action.type) {
    case "GET_DOGS":
      return {
        ...state,
        allDogs: action.payload,
        dogsRender: pageModulated([...action.payload], 8),
        pages: pageLength([...action.payload], 8), 
        page: 0
      }
    case "GET_DOGS_BY_NAME":
    console.log(action.payload)//if(action.payload === ) 
      const result = [...state.allDogs].filter(d => d.name.toLowerCase().includes(action.payload.toLowerCase()))
//console.log(result)
      return {
        ...state,
        dogsRender: pageModulated([...result], 8),
        pages: pageLength(result, 8),
        page: 0
      }
    case "GET_DETAIL": 
      return {
        ...state,
        detail: action.payload[0] 
      }
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        tempers: action.payload,
      }
    case "CREATE_DOG":
      return {
        ...state,
        dogsRender: action.payload,
      }
    case "DELETE_DOG":
      return {
        ...state,
      }
    case "UPDATE_DOG":
      return {
        ...state,
        dogsRender: action.payload
      }
    case "FILTER_BY_TEMPERAMENTS":
//console.log(action.payload)  
      const dogsTemp =
        action.payload !== "all"
          ? dogs.filter((t) => t.temperament?.includes(action.payload))
          : dogs;
      return {
        ...state,
        dogsRender: pageModulated([...dogsTemp], 8),
        pages: pageLength([...dogsTemp], 8),
        page: 0,
      };
    case "FILTER_DOGS_BY_API":
      const dataDogs = state.dogsRender
      const dogsData = dataDogs.flat()
//console.log(dogsData)
      const apiFilter =
        action.payload !== "api"
          ? dogsData.filter((e) => e?.createdInDb)
          : dogs;
      return {
        ...state,
        dogsRender: pageModulated([...apiFilter], 8),
        pages: pageLength([...apiFilter], 8),
        page: 0,
      };
    case "CHANGE_PAGE":
      const act = action.payload
      return {
        ...state,
        page: !["prev","next"].includes(act) ? act : act === "prev" ? 
        state.page > 0 ? 
        state.page - 1 :
        state.page :
        state.page < state.dogsRender.length - 1 ?
        state.page + 1 : 
        state.page
      }
    case "SORT_BY_WEIGHT":
      const weightArr =
       action.payload === "asc" 
      ? dogs.sort((a, b) => a.weightMin - b.weightMin)
      : dogs.sort((a, b) => b.weightMin - a.weightMin);
//console.log(weightArr)
      return {
        ...state,
        dogsRender: pageModulated([...weightArr], 8),
        page: 0,
      }
    case "SORT_BY_NAME":
      const sortName = action.payload === "AZ"
      ? dogs.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
        })
      : dogs.sort((a, b) => {
        if (b.name > a.name) return 1;
        if (a.name > b.name) return -1;
        return 0; 
      });
    return {
      ...state,
      dogsRender: pageModulated([...sortName], 8),
      page: 0,
    };

    default:
      return {
        ...state
      }
  }
   
}
