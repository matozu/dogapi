export function fetchData(url, pageNumber) {
  url = url + "?page[number]=" + pageNumber;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
