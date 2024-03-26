import { fetchData } from "./fetchData";
import join from "lodash/join";

const mainTitle = document.querySelector(".main-title");
const searchForm = document.querySelector("form#search-form");
const searchInput = document.querySelector("input#search-input");
const resultsDiv = document.querySelector("div#results");
const pagination = document.querySelector(".pagination");
const pageSpan = document.querySelector("span#page-number");
const previousPageButton = document.querySelector("button#previous-page");
const nextPageButton = document.querySelector("button#next-page");
const url = "https://dogapi.dog/api/v2/breeds";
pagination.style.display = "none";
let results = null;

var pageNumber = 1;

mainTitle.textContent = join(["hello", "webpack"], " ");
searchForm.onsubmit = (event) => {
  event.preventDefault();
  fetchData(url, pageNumber).then((result) => {
    results = result;
    displayData();
  });
};

async function displayData() {
  if (results === null) {
    await fetchData(url, pageNumber).then((result) => (results = result));
  }
  resultsDiv.innerHTML = "";
  pagination.style.display = "block";
  pageSpan.textContent = "page " + pageNumber;
  const searchValue = searchInput.value;
  const filteredResult = results.data.filter((item) =>
    item.attributes.name.includes(searchValue)
  );

  filteredResult.forEach((item) => {
    const resultItem = createResultItem(item);
    resultsDiv.appendChild(resultItem);
  });
}

function createResultItem(item) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("result-item");
  const breedName = document.createElement("h2");
  breedName.textContent = item.attributes.name;
  itemContainer.appendChild(breedName);
  const description = document.createElement("p");
  description.textContent = item.attributes.description;
  itemContainer.appendChild(description);
  return itemContainer;
}

function nextPage() {
  if (pageNumber < 29) {
    pageNumber++;
    fetchData(url, pageNumber).then((result) => displayData(result));
    previousPageButton.disabled = false;
  }
  if (pageNumber === 29) nextPageButton.disabled = true;
}

function previousPage() {
  if (pageNumber > 1) {
    pageNumber--;
    fetchData(url, pageNumber).then((result) => displayData(result));
    nextPageButton.disabled = false;
  }
  if (pageNumber === 1) previousPageButton.disabled = true;
}
