const createVenueHTML = (name, location, iconSource, photo) => {
    return `<h2>${name}</h2>
  <img class="venueimage" src="${photo}">
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => {
    // console.log(currentDay)
    return `<h2>${weekDays[(new Date()).getDay()]}</h2>
		<h2>Temperature: ${kelvinToFahrenheit(currentDay.main.temp)}&deg;F / 
${kelvinToCelsius(currentDay.main.temp)}°C
    </h2>
    <h2>Feels like:
${kelvinToFahrenheit(currentDay.main.feels_like)}&deg;F / 
${kelvinToCelsius(currentDay.main.feels_like)}°C
</h2>

		<h2>Condition: ${currentDay.weather[0].description}</h2>
  	<img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);

const kelvinToCelsius = k => ((k - 273.15).toFixed(0));