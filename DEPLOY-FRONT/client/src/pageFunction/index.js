
export default function pageModulated(arr, page) {

  let pages = Math.ceil(arr.length / page)
  let pageNumbers = [];
  for(let i = 0; i < pages; i++) {
    pageNumbers.push(arr.splice(0, page));
  }
  return pageNumbers;
}

export function pageNumbers(arr, pages) {
  //let numbers = Math.ceil(arr.length / pages)
  let numbersPages = [];
  for(let i = 0; i <= Math.ceil(arr.length / pages); i++) {
    numbersPages.push(i);
  }
  return numbersPages;
}

export function pageLength (array){
  return Math.ceil(array.length / 8)
}
