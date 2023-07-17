const apiKey = "e42418d4a3af9c732fac9c87869475dd";
const rest_country_api = "https://restcountries.com/v3.1/all"
let row = document.getElementById('row');

async function getCountryData() {
    try {
        fetch(`https://restcountries.com/v3.1/all`)
            .then(response => response.json())
            .then(data => {
                data.forEach(country => {
                    const current_country = {
                        capital: country.capital,
                        region: country.region,
                        latitude: country.latlng[0],
                        longitude: country.latlng[1],
                        name: country.name.common,
                        flag: country.flags.png,
                        code: country.cca2
                    };


                    let col = document.createElement('div');
                    col.classList.add('col-lg-4', 'col-sm-12');
                    col.innerHTML = `
                                    <div class="card bg-light mb-3 rounded" style="max-width: 25rem; ">
                                        <div class="card-header text-center"><strong>${current_country.name}</strong></div>
                                        <div class="card-body text-center">
                                            <img src="${current_country.flag}" class="card-img-top" alt="${current_country.name}" style="height:100px; width:150px;"> <br>
                                            <!-- <h5 class="card-title">Light card title</h5> -->
                                            <strong>Region:</strong> ${current_country.region} <br>
                                            <strong>Capital:</strong> ${current_country.capital} <br>
                                            <strong>Country Code:</strong> ${current_country.code} <br>
                                            <strong>Latitude:</strong> ${current_country.latitude.toFixed(2)} <br>
                                            <strong>Longitude:</strong>${current_country.longitude.toFixed(2)}<br>
                                        </div>
                                        <div class="card-footer border-0 bg-transparent text-center">
                                            <button 
                                            class="btn btn-primary rounded ${current_country.latitude} ${current_country.longitude} "
                                            onClick='getWeatherData(${current_country.latitude},${current_country.longitude},"${current_country.name}")'
                                            type="button"
                                            data-toggle="modal" 
                                            data-target="#myModal"
                                            >
                                                Click for weather
                                            </button>
                                            
                                        </div>
                                    </div>
                                    `;
                    row.append(col);
                }

                );
            })

    } catch (error) {
        console.error(error);
    }
}

async function getWeatherData(latitude, longitude, name) {
    try {
        document.getElementById('modal-body').innerHTML = `
        <h3>${name}</h3>
        <p><strong>Description:</strong>     <span id="temp">   </span></p>
        <p><strong>Temperature:</strong> <span id="temp">  </span></p>
        <p><strong>Humidity:</strong>    <span id="hum">    </span></p>
        <p><strong>Pressure:</strong>    <span id="press">   </span></p>
        <p><strong>Width:</strong>       <span id="width">    </span></p> 
        `
        const apiKey = "e42418d4a3af9c732fac9c87869475dd";

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        const weather = {
            description: data.weather[0].description,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed
        };

        document.getElementById('modal-body').innerHTML = `
        <h3>${name}</h3>
        <p><strong>Description:</strong>     <span id="temp"> ${weather.description}  </span></p>
        <p><strong>Temperature:</strong> <span id="temp"> ${weather.temperature}&#176;C  </span></p>
        <p><strong>Humidity:</strong>    <span id="hum">  ${weather.humidity}%  </span></p>
        <p><strong>Pressure:</strong>    <span id="press"> ${weather.pressure}  </span></p>
        <p><strong>Width:</strong>       <span id="width">  ${weather.wind} m/s </span></p> 
                                                      `


    } catch (error) {
        console.error(error);
    }
}


getCountryData()