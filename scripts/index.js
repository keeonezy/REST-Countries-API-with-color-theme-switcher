// template
const pointTemplate = document.querySelector(".flags__cards");

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


// Получение данных с API о странах
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
  const flagTemplate = document.getElementById("flags");

  const setElement = flagTemplate.content.cloneNode(true);
  setElement.querySelector('.flags__image').src = `${data.flags.svg}`;
  setElement.querySelector('.flags__title').textContent = `${data.name.common}`;
  setElement.querySelector('.text_population').textContent = `${data.population}`;
  setElement.querySelector('.text_region').textContent = `${data.region}`;
  setElement.querySelector('.text_capital').textContent = `${data.capital ?? "-"}`;
  pointTemplate.appendChild(setElement);

  // const openPopups = setElement.querySelector;

  setElement.addEventListener("click", () => {
    console.log("hi")
    openPopupCountry(data);
  });

  return setElement;
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
  const popupTemplate = document.getElementById("popup");

  const setElement = popupTemplate.content.cloneNode(true);

  popup.classList.add("popup_opened");
  setElement.querySelector('.popup__flag').src = `${data.flags.svg}`;
  setElement.querySelector('.popup__title').textContent = `${data.name.common}`;
  setElement.querySelector('.Native').textContent = `${data.nativeName}`;
  setElement.querySelector('.Population').textContent = `${data.population}`;
  setElement.querySelector('.Region').textContent = `${data.region}`;
  setElement.querySelector('.SubRegion').textContent = `${data.subRegion}`;
  setElement.querySelector('.Capital').textContent = `${data.capital}`;
  setElement.querySelector('.TopLevelDomain').textContent = `${data.population}`;
  setElement.querySelector('.Currencies').textContent = `${data.region}`;
  setElement.querySelector('.Languages').textContent = `${data.capital}`;
  popupSet.appendChild(setElement);

  return setElement;
}
