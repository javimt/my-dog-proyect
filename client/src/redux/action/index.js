import axios from "axios";

/* export const cases = {
  get_Dogs: "GET_DOGS"
  
} */

export const getDogs = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/dogs");
//console.log(response.data.data);
    return dispatch({
      type: "GET_DOGS",
      payload: response.data.data,
    })
  };
};

export const getDogsByName = (name) => {
//console.log("name:", name)
  return {
    type: "GET_DOGS_BY_NAME",
    payload: name
  }
  /* return async function(dispatch) {
    const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
console.log(response.data)
    return dispatch({
      type: "GET_DOGS_BY_NAME",
      payload: response.data
    })
  } */
};

export const getDetail = (id) => {
  return async function(dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
//console.log(response.data)
    return dispatch({
      type: "GET_DETAIL",
      payload: response.data
    })
    } catch (error) {
      console.error(error)
    }
  }
}

export const getTemperaments = () => {
  return async function(dispatch) {
    const response = await axios.get("http://localhost:3001/tempers");
//console.log(response.data)
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: response.data
    })
  }
}

export const createDogs = (payload) => {
  return () => {
    const dogCreate = axios.post("http://localhost:3001/dogs", payload);
console.log(payload)
    return dogCreate;
  }
}

export const deleteDog = (id) => {
  return async function(dispatch) {
    try {
      const deleteDog = axios.delete(`http://localhost:3001/dogs/${id}`)
console.log(deleteDog)
    return dispatch({
      type: "DELETE_DOG",
      payload: deleteDog.data
    })
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateDog = (id) => {
  return async function(dispatch) {
    try {
      const updateDog = axios.delete(`http://localhost:3001/dogs/${id}`)
console.log(updateDog)
    return dispatch({
      type: "UPDATE_DOG",
      payload: updateDog.data
    })
    } catch (error) {
      console.error(error)
    }
  }
}
//======================>> FILTERS <<=========================\\

// Botones/Opciones para filtrar por:
// Temperamento
// Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)

export const filterByTemperaments = (payload) => {
  return {
    type: "FILTER_BY_TEMPERAMENTS",
    payload,
  }
}

export const filterDogsByApi = (payload) => {
  return {
    types: "FILTER_BY_API",
    payload
  }
}

/* export const filterDogsByDb = (payload) => {
  return {
    types: "FILTER_BY_DB",
    payload
  }
} */
//======================>> END FILTERS <<=========================\\


//========================>> SORT BY ASC AND DESC <<==========================\\

// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
// Orden alfabético
// Peso

export const sortByWeight = (payload) => {
  return {
    type: "SORT_BY_WEIGHT",
    payload
  }
}

export const sortByName = (payload) => {
  return {
    type: "SORT_BY_NAME",
    payload
  }
}
//========================>> END SORT BY ASC AND DESC <<==========================\\


//========================>> PAGINATED <<==========================\\

export const changePage = (payload) => {
  return {
    type: "CHANGE_PAGE",
    payload
  }
}

//========================>> END PAGINATED <<==========================\\

