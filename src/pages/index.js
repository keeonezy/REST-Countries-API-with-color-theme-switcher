import "./index.css";
// template
const pointTemplate = document.getElementById("flags__cards");

const dropButton = document.querySelector(".flags__button-choose");
const dropList = document.querySelector(".flags__lists");
const dropDownRegionText = document.querySelectorAll(".flags__list-description");
const toggleTheme = document.querySelector(".header__group-theme");
const regionTextApi = document.getElementsByClassName("text_region");
const countryTextApi = document.getElementsByClassName("flags__title");
// popup
const closePopup = document.querySelector(".popup__back");
const popup = document.querySelector(".popup");
// input
const searchInput = document.querySelector(".flags__input");


// Получение данных о странах по API
async function getCountryAll() {
  await fetch(`https://restcountries.com/v3.1/all`)
    .then(res => res.json())
    .then((data) => {
      console.log(data);

      data.forEach(country => {
        showCountry(country);
      });

    })
    .catch((error) => {
      console.log(error);
    });
}

getCountryAll()

// Работа с template
function showCountry(data) {
  const setHTML = document.createElement('li');
  setHTML.classList.add('flags__card');
  setHTML.innerHTML = `
      <img src="${data.flags.svg}" alt="" class="flags__image" loading="lazy">
      <h2 class="flags__title">${data.name.common}</h2>
      <p class="flags__text">Population: <span class="flags__span text_population">${data.population}</span></p>
      <p class="flags__text">Region: <span class="flags__span text_region">${data.region}</span></p>
      <p class="flags__text">Capital: <span class="flags__span text_capital">${data.capital ?? "-"}</span></p>
  `

  pointTemplate.appendChild(setHTML);

  setHTML.addEventListener("click", () => {
    console.log("hi");
    openPopupCountry(data);
  });
}

// Фильтрация по стране в drop down
dropDownRegionText.forEach(element => {
  element.addEventListener("click", () => {
    console.log(element)
    Array.from(regionTextApi).forEach(elem => {
      console.log(elem.innerText)
      if (elem.innerText.includes(element.innerText) || element.innerText == "All") {
        elem.parentElement.parentElement.style.display = "block";
      } else {
        elem.parentElement.parentElement.style.display = "none";
      }
    })
  })
});

// Input поиск страны
searchInput.addEventListener("input", () => {
  console.log(searchInput.value.toLowerCase())
  Array.from(countryTextApi).forEach(elem => {
    if (elem.innerText.toLowerCase().includes(searchInput.value.toLowerCase())) {
      elem.parentElement.style.display = "block";
    } else {
      elem.parentElement.style.display = "none";
    }
  });
})

// Переключаем на темный и светлый режим
toggleTheme.addEventListener("click", () => {
  const colorScheme = document.documentElement.getAttribute("data-color-scheme");
  document.documentElement.setAttribute("data-color-scheme", colorScheme === "default" ? "dark" : "default");
})

// Открыть/Закрыть список drop down
dropButton.addEventListener("click", () => {
  dropList.classList.toggle("flags_opened");
})


// Закрыть попап
closePopup.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
})


const popupSet = document.querySelector(".popup__group-main");

// Информация в попапе
function openPopupCountry(data) {
  const [currency] = Object.values(data?.currencies ?? {});
  const languages = Object.values(data?.languages ?? {});
  const [nativeName] = Object.values(data?.name?.nativeName ?? {});

  popup.classList.add("popup_opened");
  popupSet.innerHTML = `
  <img src="${data.flags.svg}" alt="" class="popup__flag">

      <div class="popup__group-right">
        <h2 class="popup__title">${data.name.common}</h2>
        <div class="popup__group-list-left">
          <p class="flags__text">Native name: <span class="flags__span Native">${nativeName ? nativeName.official : data.name.official}</span></p>
          <p class="flags__text">Population: <span class="flags__span Population">${data.population}</span></p>
          <p class="flags__text">Region: <span class="flags__span Region">${data.region}</span></p>
          <p class="flags__text">Sub Region: <span class="flags__span SubRegion">${data.subregion}</span></p>
          <p class="flags__text">Capital: <span class="flags__span Capital">${data.capital ?? "-"}</span></p>
        </div>

        <div class="popup__group-list-right">
          <p class="flags__text">Top Level Domain: <span class="flags__span TopLevelDomain">${data.tld.map(elem => elem)}</span></p>
          <p class="flags__text">Currencies: <span class="flags__span Currencies">${currency ? currency.name : "No currency used"}</span></p>
          <p class="flags__text">Languages: <span class="flags__span Languages">${languages.length ? languages.join(", ") : "No languages"}</span></p>
        </div>

        <p class="flags__text">Border Countries: <span class="flags__span text_capital">${data.borders.map(elem => elem)}</span></p>
      </div>`

  popupSet.prepend()
}
