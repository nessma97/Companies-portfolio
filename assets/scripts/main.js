let personsContainer = document.querySelector(".persons"); //grid
var searchPersonsInput = document.querySelector("#search__persons--input");
let companiesContainer = document.querySelector(".companies");
let booksContainer = document.querySelector(".books");
let loader = document.querySelector(".loader");
let SearchPersonsData = [];

function displayPersonsData(persons) {
  personsContainer.innerHTML = "";
  persons.forEach((person) => {
    personsContainer.innerHTML += `
                <div class="persons__data">
                    <div class="persons__images">
                        <img class='perons__images--img' src="${person.image}" alt="A person">
                    </div>
                    <div class="persons__info">
                        <h2><span id='#persons__firstname'>${person.firstname}</span><span>${person.lastname}</span></h2>
                        <p class="persons__birthday"> ${person.birthday}</p>
                        <div class="contact__info">
                            <button class='contact__info--email'>
                                <a href="mailto: ${person.email}">My Email</a>
                            </button>
                            <button class="contact__info--website">
                                <a href="${person.website}" >Visit my site</a>
                            </button>
                        </div>
                    </div>
                </div`;
  });
}

function getRandomPerson() {
  loader.classList.remove("hidden");
  fetch("https://fakerapi.it/api/v1/persons?_quantity=20")
    .then((response) => response.json())
    .then(({ data }) => {
      displayPersonsData(data);
      SearchPersonsData = data;
    })
    .catch((error) => {
      console.log("Resquest Failed", error);
    })
    .finally(() => {
      loader.classList.add("hidden");
    });
}
// Search Person Data
searchPersonsInput.addEventListener("input", searchPersons);
function searchPersons() {
  let searchPersonsResult = searchPersonsInput.value.toLowerCase();
  // console.log(searchPersonsResult);
  let personDataFiltered = SearchPersonsData.filter((person) => {
    return (
      person.firstname.toLowerCase().includes(searchPersonsResult) ||
      person.lastname.toLowerCase().includes(searchPersonsResult)
    );
  });
  displayPersonsData(personDataFiltered);
}
getRandomPerson();

function displayCompaniesData(companies) {
  companies.forEach((company) => {
    companiesContainer.innerHTML += `
        <div class="companies__data">
            <h3>${company.name}</h3>
            <h4>${company.country}</h4>
            <div class="company__buttons">
                <button class="companies__site">
                    <a href="${company.website}">Visit our site</a>
                </button>
                <button class="companies__email">
                    <a href="mailto: ${company.email}">Email us</a>
                </button>
                <button class="companies__number">
                    <a href="tel: ${company.phone}">call us now</a>
                </button>
            </div>
        </div>
        <div class="image__box">
            <img src="${company.image}" alt="comapny image">
        </div>`;
  });
}

async function getRandomCompanies() {
  await fetch("https://fakerapi.it/api/v1/companies?_quantity=15")
    .then((response) => response.json())
    .then((data) => displayCompaniesData(data.data))
    .catch((error) => {
      console.log("Resquest Failed", error);
    });
}
getRandomCompanies();

function displayBooksData(books) {
  books.forEach((book) => {
    booksContainer.innerHTML += `
                <div class="books__data">
                    <div class="books__images">
                        <img src="${book.image}" class="books__images--img" alt="books cover">
                    </div>
                    <div class="books__info">
                        <h2 class="book__title">${book.title}</h2>
                        <h3 class="book__author">${book.author}</h3>
                        <p class="book__description"> ${book.description} </p>
                    </div>
                </div>`;
  });
}

async function getRandomBooks() {
  await fetch("https://fakerapi.it/api/v1/books?_quantity=12")
    .then((response) => response.json())
    .then((data) => displayBooksData(data.data))
    .catch((error) => {
      console.log("Resquest Failed", error);
    });
}
getRandomBooks();

// async function getRandomData() {
//   await getRandomPerson();
//   await getRandomCompanies();
//   await getRandomBooks();
// }
// getRandomData();
