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



// Смена сайта на светлый/темный фон
const toggleTheme = document.querySelector(".header__group-theme");

// Переключаем на темный и светлый режим
toggleTheme.addEventListener("click", () => {
  const colorScheme = document.documentElement.getAttribute("data-color-scheme");
  document.documentElement.setAttribute("data-color-scheme", colorScheme === "default" ? "dark" : "default");
})


dropButton.addEventListener("click", () => {
  dropList.classList.toggle("flags_opened");
})
