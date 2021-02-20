const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&appid=fd5d23547e69d0663dbc0e5f3f183640';

const generate = document.getElementById('generate');

generate.addEventListener('click', (e) => {
    e.preventDefault();

    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(apiURL, zip, apiKey).then( (weatherData) => {
        try {
        const temp = weatherData.main.temp;
        const city = weatherData.name;
        const weather = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const humidity = weatherData.main.humidity;
        const wind = weatherData.wind.speed;
        const pressure = weatherData.main.pressure;
        const date = weatherData.dt;

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

const postWeather = async (url , data) => {
    console.log(data);
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        Headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
};

const updateUI = async () => {
    const request = await fetch('/grab');
    try {
        const last = request.json();
        console.log(last);

        document.getElementById('temp').textContent = Math.floor(last.temp);

    } catch(error) {
        console.log('error', error);
    }
}