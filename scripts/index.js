const flagsUl = document.querySelector(".flags__cards");
const flagTemplate = document.getElementById("flags");

// flagsUl.appendChild(flagTemplate.content.cloneNode(true));
// flagsUl.appendChild(flagTemplate.content.cloneNode(true));

function Flags() {
    fetch(`https://restcountries.com/v3.1/all`)
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

Flags()