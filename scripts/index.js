const flagsUl = document.querySelector(".flags__cards");
const flagTemplate = document.getElementById("flags");

const dropButton = document.querySelector(".flags__button-choose");
const dropList = document.querySelector(".flags__lists");
const regionText = document.querySelectorAll(".flags__list-description");
const regionTextApi = document.getElementsByClassName("text_region");
const countryTextApi = document.getElementsByClassName("flags__title");


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

function showCountry(data) {
  flagTemplate.content.querySelector('.flags__image').src = `${data.flags.svg}`;
  flagTemplate.content.querySelector('.flags__title').textContent = `${data.name.common}`;
  flagTemplate.content.querySelector('.text_population').textContent = `${data.population}`;
  flagTemplate.content.querySelector('.text_region').textContent = `${data.region}`;
  flagTemplate.content.querySelector('.text_capital').textContent = `${data.capital}`;
  flagsUl.appendChild(flagTemplate.content.cloneNode(true));

  flagsUl.addEventListener("click", () => {
    openPopupCountry(data);
    // console.log(openPopupCountry(data))
  })
}

regionText.forEach(element => {
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

const searchInput = document.querySelector(".flags__input");

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


const toggleTheme = document.querySelector(".header__group-theme");

// Переключаем на темный и светлый режим
toggleTheme.addEventListener("click", () => {
  const colorScheme = document.documentElement.getAttribute("data-color-scheme");
  document.documentElement.setAttribute("data-color-scheme", colorScheme === "default" ? "dark" : "default");
})

dropButton.addEventListener("click", () => {
  dropList.classList.toggle("flags_opened");
})


// Кнопка назад
const closePopup = document.querySelector(".popup__back");
const popup = document.querySelector(".popup");

closePopup.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
})


const popupSet = document.querySelector(".popup__group-main");
const popupTemplate = document.getElementById("popup");

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
