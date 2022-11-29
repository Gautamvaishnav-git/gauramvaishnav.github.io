const country = document.querySelector(".container");
const countrySelection = document.querySelector("#countrySelection");
const loading = document.querySelector(".loadingState");
let url = `https://restcountries.com/v3.1/name/india`;

const countrySelectionData = async () => {
  loading.style.display = "flex";
  let res = await fetch("https://restcountries.com/v3.1/all");
  let data = await res.json();
  for (const key in data) {
    let countriesName = data[key].name.common;
    countrySelection.innerHTML += `
    <option value=${countriesName}>${countriesName}</option>
    `;
  }
  loading.style.display = "none";
};
const selectCountry = (countryName) => {
  url = `https://restcountries.com/v3.1/name/${countryName.value}`;
  getCountry();
};

countrySelectionData();

const searchFunc = (input) => {
  url = `https://restcountries.com/v3.1/name/${input.value}`;
};
const searchBtn = () => {
  getCountry();
};

const getCountry = async () => {
  loading.style.display = "flex";
  let resp = await fetch(url);
  let data = await resp.json();
  loading.style.display = "none";

  let firstCountry = data[0];
  let flagImg = firstCountry.flags
    ? firstCountry.flags[Object.keys(firstCountry.flags)[0]]
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Empty_set_symbol.svg/640px-Empty_set_symbol.svg.png";

  let formateNum = Intl.NumberFormat("en-us");
  let population = formateNum.format(firstCountry.population);
  document.body.style.backgroundImage = `url(${flagImg})`;

  country.innerHTML = ` <div class="country">
        <div class="flag">
            <img src=${flagImg} alt="">
        </div>
        <div class='countryInfo' >
            <h1 class="countryName">${firstCountry.name.official} (${
    firstCountry.name.common
  }) </h1>
            <div class="region"><b>region: </b> ${firstCountry.region} </div>
            <div class="languages"><b>languages: </b>${
              firstCountry.languages
                ? Object.values(firstCountry.languages)
                : "not Found"
            }
             </div>
            <div class="currency">
                <p class="currencyName"><b>currency: </b> ${
                  firstCountry.currencies
                    ? firstCountry.currencies[
                        Object.keys(firstCountry.currencies)
                      ].name
                    : "not Found"
                }</p>
                <p class="symbol"><b>symbol: </b> ${
                  firstCountry.currencies
                    ? firstCountry.currencies[
                        Object.keys(firstCountry.currencies)
                      ].symbol
                    : "not Found"
                }</p>
            </div>
            <div class="capital"><b>Capital: </b> ${firstCountry.capital} </div>
            <div class="populaton"><b>populaton: </b> ${population}</div>
            <div class="timeZone"><b>timezone: </b> ${
              firstCountry.timezones[0]
            }</div>
        </div>
</div>`;
};

getCountry();
