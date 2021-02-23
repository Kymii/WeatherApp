// api url and key 
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&appid=fd5d23547e69d0663dbc0e5f3f183640';

// grab button element to generate output
const generate = document.getElementById('generate');

// event listener for generate button 
generate.addEventListener('click', (e) => {
    e.preventDefault();

    // gets zip code and feeling values from input and textarea 
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // function getWeather fetches api data using given url, zip and key then assigns data to variables
    getWeather(apiURL, zip, apiKey).then( (apiWeather) => {
        try {
        const temp = apiWeather.main.temp;
        const city = apiWeather.name;
        const weather = apiWeather.weather[0].description;
        const icon = apiWeather.weather[0].icon;
        const humidity = apiWeather.main.humidity;
        const wind = apiWeather.wind.speed;
        const pressure = apiWeather.main.pressure;
        const date = apiWeather.dt;
        
        // Use POST route '/save' to post data to the server then GET route '/grab' update UI 
        postWeather('/save', {
            temp,
            city,
            weather,
            icon,
            humidity,
            wind,
            pressure,
            date,
            feelings
        }).then(updateUI()) } catch(error) {
            console.log('error', error)
            alert('Please enter a valid zip code');
        }
    })
});

//grabs data from api
const getWeather = async (apiURL, zip, apiKey) => {
    const request = await fetch (apiURL + zip + apiKey)
    try {
        const newInfo = await request.json();
        console.log(newInfo);
        return newInfo;
    } catch(error) {
        console.log('error', error);
    }
};

// async function to post weather data
const postWeather = async (url, data) => {
    console.log(data)
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
};

// update UI using an async function to fetch the data 
const updateUI = async () => {
    const request = await fetch('/grab');
    try {
        const last = await request.json();

        //update UI elements
        document.getElementById('temp').innerHTML = `${Math.floor(last.temp)}<span>&#176;</span>F`;
        document.getElementById('weather').textContent = last.weather;
        document.getElementById('city').textContent = last.city;

        // icon image link
        let imglink = 'http://openweathermap.org/img/wn/' + last.icon + '@2x.png';
        document.getElementById('weatherIcon').innerHTML = `<img alt="weather icon" src=${imglink}></img>`;

        const card_list = ['card-one', 'card-two', 'card-three'];
        
        // loop through each card to display once data is retrieved
        card_list.forEach(card => {
            document.getElementById(card).classList.remove('hide');
        })

        document.getElementById('humidity').textContent = `${last.humidity}%`;
        document.getElementById('wind').textContent = `${last.wind} mph`;
        document.getElementById('pressure').textContent = `${last.pressure} hpa`;

        //convert date value from api
        let today = new Date(last.date * 1000).toLocaleDateString('en-US');
        document.getElementById('date').textContent = `Todays Date: ${today}`;
        document.getElementById('userFeelings').textContent = `Mood: ${last.feelings}`;
    } catch(error) {
        console.log('error', error);
    }
}