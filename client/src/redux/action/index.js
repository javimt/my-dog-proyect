import axios from 'axios';

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
console.log(response.data)
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
console.log(response.data)
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: response.data
    })
  }
}

export const createDogs = (payload) => {
  return () => {
    const dogCreate = axios.post("http://localhost:3001/dogs", payload);
    return dogCreate.data;
  }
}