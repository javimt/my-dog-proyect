export default function pageModulated(arr, page) {
  try {
    
    let pages = Math.floor(arr.length / page)
    let pageNumbers = []
    for(let i = 0; i <= pages; i++) {
      pageNumbers.push(arr.splice(0, page))
    }
    return pageNumbers;

  } catch (error) {
    console.error(error);
  }
}