import { sortByName, sortByWeight } from "../redux/action";

export default function pageModulated(arr, page) {

  let pages = Math.ceil(arr.length / page)
  let pageNumbers = [];
  for(let i = 0; i < pages; i++) {
    pageNumbers.push(arr.splice(0, page));
  }
  return pageNumbers;
}

export function pageNumbers(arr, pages) {
  let numbers = Math.ceil(arr.length / pages)
  let numbersPages = [];
  for(let i = 0; i <= numbers; i++) {
    numbersPages.push(i);
  }
  return numbersPages;
}

export function pageLength (array){
  return array.length/8
}

/* export function filtred (array , funct = ""){
  switch(funct){
    case "asc":
      return sortByWeight(array, funct)
    
    case "desc":
      return sortByWeight(array, funct)

    case "A_to_Z":
      return sortByName(array, funct)

    case "Z_to_A":
      return sortByName(array, funct)

    default: return sortByName(array)
  }
} */