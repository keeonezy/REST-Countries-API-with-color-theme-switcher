const flagsUl = document.querySelector(".flags__cards");
const flagTemplate = document.getElementById("flags");

// flagsUl.appendChild(flagTemplate.content.cloneNode(true));
// flagsUl.appendChild(flagTemplate.content.cloneNode(true));

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



const searchInput = document.querySelector(".flags__input");

function searchFlagName() {

    fetch(`https://restcountries.com/v3.1/name/${searchInput.value}`)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            data.forEach(element => {
                flagTemplate.content.querySelector('.flags__image').src = `${element.flags.svg}`;
                flagTemplate.content.querySelector('.flags__title').textContent = `${element.name.common}`;
                flagTemplate.content.querySelector('.text_population').textContent = `${element.population}`;
                flagTemplate.content.querySelector('.text_region').textContent = `${element.region}`;
                flagTemplate.content.querySelector('.text_capital').textContent = `${element.capital}`;
                flagsUl.appendChild(flagTemplate.content.cloneNode(true));
            });

        })
        .catch((error) => {
            console.log(error);
        });
}



const dropButton = document.querySelector(".flags__button-choose");
const dropList = document.querySelector(".flags__lists");
const regionText = document.querySelectorAll(".flags__list-description");
const regionTextApi = document.getElementsByClassName("text_region");

dropButton.addEventListener("click", () => {
    dropList.classList.toggle("flags_opened");
})

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