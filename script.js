function searchCountry() {
    const countryName = document.getElementById("countryInput").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous results
  
    if (!countryName) {
      resultDiv.innerHTML = "<p>Please enter a country name.</p>";
      return;
    }
  
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        if (!response.ok) throw new Error("Country not found");
        return response.json();
      })
      .then(data => {
        const country = data[0];
        const name = country.name.common;
        const capital = country.capital ? country.capital[0] : "N/A";
        const flag = country.flags.svg;
        const currencies = country.currencies ? Object.values(country.currencies).map(cur => cur.name).join(", ") : "N/A";
        const population = country.population;
        const region = country.region;
        const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
  
        resultDiv.innerHTML = `
          <h2>${name}</h2>
          <img class="country-flag" src="${flag}" alt="Flag of ${name}" />
          <p><strong>Capital:</strong> ${capital}</p>
          <p><strong>Currency:</strong> ${currencies}</p>
          <p><strong>Population:</strong> ${population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${region}</p>
          <p><strong>Languages:</strong> ${languages}</p>
        `;
      })
      .catch(error => {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  }