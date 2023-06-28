// template
const flagTemplate = document.getElementById("flags");
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

      data.forEach(element => {
        showCountry(element);
      });

    })
    .catch((error) => {
      console.log(error);
    });
}

getCountryAll()

// Работа с template
function showCountry(data) {
  flagTemplate.content.querySelector('.flags__image').src = `${data.flags.svg}`;
  flagTemplate.content.querySelector('.flags__title').textContent = `${data.name.common}`;
  flagTemplate.content.querySelector('.text_population').textContent = `${data.population}`;
  flagTemplate.content.querySelector('.text_region').textContent = `${data.region}`;
  flagTemplate.content.querySelector('.text_capital').textContent = `${data.capital}`;
  pointTemplate.appendChild(flagTemplate.content.cloneNode(true));

  pointTemplate.addEventListener("click", () => {
    openPopupCountry(data);
    // console.log(openPopupCountry(data))
  })
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
    console.log(elem.innerText.toLowerCase().includes(searchInput.value.toLowerCase()))
    if (elem.innerText.toLowerCase().includes(searchInput.value.toLowerCase())) {
      elem.parentElement.style.display = "grid";
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
const popupTemplate = document.getElementById("popup");

// Информация в попапе
function openPopupCountry(data) {
  popup.classList.add("popup_opened");
  popupTemplate.content.querySelector('.popup__flag').src = `${data.flags.svg}`;
  popupTemplate.content.querySelector('.popup__title').textContent = `${data.name.common}`;
  popupTemplate.content.querySelector('.Native').textContent = `${data.nativeName}`;
  popupTemplate.content.querySelector('.Population').textContent = `${data.population}`;
  popupTemplate.content.querySelector('.Region').textContent = `${data.region}`;
  popupTemplate.content.querySelector('.SubRegion').textContent = `${data.subRegion}`;
  popupTemplate.content.querySelector('.Capital').textContent = `${data.capital}`;
  popupTemplate.content.querySelector('.TopLevelDomain').textContent = `${data.population}`;
  popupTemplate.content.querySelector('.Currencies').textContent = `${data.region}`;
  popupTemplate.content.querySelector('.Languages').textContent = `${data.capital}`;
  popupSet.appendChild(popupTemplate.content.cloneNode(true));
}
