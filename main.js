const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '56db583eb2bfdaedaa0b4effc9985438';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
        
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'image/clear.png';
                    alert('AUCUNE ALERTE , IL FAIT BEAU . Bonne journée');
                    break;

                case 'Rain':
                    image.src = 'image/rainy.png';
                    alert('ALEEEERTE IL PLEUT, prenez vos parapluies');
                    break;

                case 'Snow':
                    image.src = 'image/snow.png';
                    alert('ALEEEERTE IL NEIGE. Mets tes bottes, gants et bonnet');
                    break;

                case 'Clouds':
                    image.src = 'image/cloudy.png';
                    alert('ALEEEERTE IL Y A DES NUAGES. Le ciel est gris');
                    break;

                case 'Haze':
                    image.src = 'image/mist.png';
                    alert('ALEEEERTE BRUME. Le brouillard est fort');
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
        

            weatherBox.style.display = '';
            weatherBox.classList.add('fadeIn');
            container.style.height = '590px';


        });


});