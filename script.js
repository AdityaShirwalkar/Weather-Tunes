const apiKey = '9c72e80b45006b55f9d3335a235b8308'; 

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchInput = document.querySelector('input[type="search"]');
    const cityName = searchInput.value.trim();
    const weatherHeading = document.querySelector('#weather-heading');
    const musicHeading = document.querySelector('#musicHeading');

    if (cityName) {
        weatherHeading.textContent = `Fetching weather for ${cityName}...`;
        musicHeading.textContent = `Fetching music recommendations for you...`;

        fetchWeatherData(cityName);
    } else {
        weatherHeading.textContent = 'Welcome to Weather Tunes!';
        musicHeading.textContent = 'Music Recommendations';
    }

    searchInput.value = '';
});

function fetchWeatherData(city) {
    if (!apiKey) {
        alert("API key is required to fetch weather data.");
        return;
    }   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or incomplete data');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.querySelector('#weather-heading').textContent = 'City not found. Please try again.';
            resetFields();
        });
}

function resetFields() {
    document.querySelector('#temperature-display').textContent = '--°C';
    document.querySelector('#feels-like').textContent = '--°C';
    document.querySelector('#min-temp').textContent = '--°C';
    document.querySelector('#max-temp').textContent = '--°C';

    document.querySelector('#humidity-display').textContent = '--%';
    document.querySelector('#pressure').textContent = '-- hPa';
    document.querySelector('#sea-level').textContent = '--';
    document.querySelector('#ground-level').textContent = '--';

    document.querySelector('#wind-speed-display').textContent = '-- m/s';
    document.querySelector('#wind-degree').textContent = '--°';
    document.querySelector('#visibility').textContent = '-- m';

    document.querySelector('#sunrise').textContent = '--:--';
    document.querySelector('#sunset').textContent = '--:--';
    document.querySelector('#description').textContent = '--';
}

function displayWeatherData(data) {
    const weatherHeading = document.querySelector('#weather-heading');
    const weatherDescription = document.querySelector('.fs-5.text-body-secondary');

    weatherHeading.textContent = `Weather for ${data.name}, ${data.sys.country}`;
    
    const condition = data.weather[0]?.main.toLowerCase() || 'unknown';
    const detailedDescription = data.weather[0]?.description || 'No description available';
    if (condition.includes('sun')) {
        weatherDescription.textContent = 'It’s sunny outside! Perfect time to hit the beach or enjoy a sunny walk!';
    } else if (condition.includes('cloud')) {
        weatherDescription.textContent = 'It’s cloudy outside! A great day for a cozy coffee or tea.';
    } else if (condition.includes('rain')) {
        weatherDescription.textContent = 'Rainy day! Don’t forget your umbrella and a warm drink.';
    } else {
        weatherDescription.textContent = `Current condition: ${detailedDescription}.`;
    }
  

    document.querySelector('#temperature-display').textContent = `${data.main.temp || '--'}°C`;
    document.querySelector('#feels-like').textContent = `${data.main.feels_like || '--'}°C`;
    document.querySelector('#min-temp').textContent = `${data.main.temp_min || '--'}°C`;
    document.querySelector('#max-temp').textContent = `${data.main.temp_max || '--'}°C`;

    
    document.querySelector('#humidity-display').textContent = `${data.main.humidity || '--'}%`;
    document.querySelector('#pressure').textContent = `${data.main.pressure || '--'} hPa`;
    document.querySelector('#sea-level').textContent = data.main.sea_level ? `${data.main.sea_level} hPa` : 'N/A';
    document.querySelector('#ground-level').textContent = data.main.grnd_level ? `${data.main.grnd_level} hPa` : 'N/A';

    
    document.querySelector('#wind-speed-display').textContent = `${data.wind.speed || '--'} m/s`;
    document.querySelector('#wind-degree').textContent = `${data.wind.deg || '--'}°`;
    document.querySelector('#visibility').textContent = `${data.visibility || '--'} m`;

    
    const sunriseTime = data.sys.sunrise ? new Date(data.sys.sunrise * 1000).toLocaleTimeString() : '--:--';
    const sunsetTime = data.sys.sunset ? new Date(data.sys.sunset * 1000).toLocaleTimeString() : '--:--';
    document.querySelector('#sunrise').textContent = sunriseTime;
    document.querySelector('#sunset').textContent = sunsetTime;
    document.querySelector('#description').textContent = detailedDescription;
    
    
    handleMusicRecommendation(data.weather[0]?.main.toLowerCase());

}


const weatherBasedRecommendations = {
    clear: {
        happy: [
            { name: "Walking on Sunshine", artist: "Katrina & The Waves", genre: "Pop", image: "images/albums/walking-on-sunshine.jpg" },
            { name: "Good Day Sunshine", artist: "The Beatles", genre: "Rock", image: "images/albums/good-day-sunshine.jpg" },
            { name: "Here Comes the Sun", artist: "The Beatles", genre: "Rock", image: "images/albums/here-comes-the-sun.jpg" }
        ],
        sad: [
            { name: "Sun Is Shining", artist: "Bob Marley", genre: "Reggae", image: "images/albums/sun-is-shining.jpg" },
            { name: "Sunday Morning", artist: "Maroon 5", genre: "Pop", image: "images/albums/sunday-morning.jpg" },
            { name: "Soak Up The Sun", artist: "Sheryl Crow", genre: "Pop Rock", image: "images/albums/soak-up-the-sun.jpg" }
        ],
        energetic: [
            { name: "Summer of '69", artist: "Bryan Adams", genre: "Rock", image: "images/albums/summer-of-69.jpg" },
            { name: "Beautiful Day", artist: "U2", genre: "Rock", image: "images/albums/beautiful-day.jpg" },
            { name: "Good Vibrations", artist: "The Beach Boys", genre: "Pop", image: "images/albums/good-vibrations.jpg" }
        ],
        calm: [
            { name: "Sunny Afternoon", artist: "The Kinks", genre: "Rock", image: "images/albums/sunny-afternoon.jpg" },
            { name: "Three Little Birds", artist: "Bob Marley", genre: "Reggae", image: "images/albums/three-little-birds.jpg" },
            { name: "Island in the Sun", artist: "Weezer", genre: "Alternative", image: "images/albums/island-in-the-sun.jpg" }
        ]
    },
    clouds: {
        happy: [
            { name: "Silver Lining", artist: "First Aid Kit", genre: "Folk", image: "images/albums/silver-lining.jpg" },
            { name: "Break Through", artist: "The Script", genre: "Pop/Rock", image: "images/albums/break-through.jpg" },
            { name: "Cloud 9", artist: "Beach Bunny", genre: "Indie", image: "images/albums/cloud-9.jpg" }
        ],
        sad: [
            { name: "Both Sides Now", artist: "Joni Mitchell", genre: "Folk", image: "images/albums/both-sides-now.jpg" },
            { name: "The Sound of Silence", artist: "Simon & Garfunkel", genre: "Folk", image: "images/albums/sound-of-silence.jpg" },
            { name: "Mad World", artist: "Gary Jules", genre: "Alternative", image: "images/albums/mad-world.jpg" }
        ],
        energetic: [
            { name: "Life Is a Highway", artist: "Tom Cochrane", genre: "Rock", image: "images/albums/life-is-highway.jpg" },
            { name: "Break on Through", artist: "The Doors", genre: "Rock", image: "images/albums/break-on-through.jpg" },
            { name: "Cloud Number Nine", artist: "Bryan Adams", genre: "Rock", image: "images/albums/cloud-number-nine.jpg" }
        ],
        calm: [
            { name: "Cloudy", artist: "Simon & Garfunkel", genre: "Folk", image: "images/albums/cloudy.jpg" },
            { name: "Yesterday", artist: "The Beatles", genre: "Rock", image: "images/albums/yesterday.jpg" },
            { name: "The Only Exception", artist: "Paramore", genre: "Alternative", image: "images/albums/the-only-exception.jpg" }
        ]
    },
    rain: {
        happy: [
            { name: "Singing in the Rain", artist: "Gene Kelly", genre: "Soundtrack", image: "images/albums/singing-in-the-rain.jpg" },
            { name: "Rainbow", artist: "Sia", genre: "Pop", image: "images/albums/rainbow.jpg" },
            { name: "Electric Storm", artist: "Delta Goodrem", genre: "Pop", image: "images/albums/electric-storm.jpg" }
        ],
        sad: [
            { name: "Set Fire to the Rain", artist: "Adele", genre: "Pop", image: "images/albums/set-fire-to-rain.jpg" },
            { name: "November Rain", artist: "Guns N' Roses", genre: "Rock", image: "images/albums/november-rain.jpg" },
            { name: "Rain", artist: "Madonna", genre: "Pop", image: "images/albums/rain-madonna.jpg" }
        ],
        energetic: [
            { name: "Purple Rain", artist: "Prince", genre: "Pop/Rock", image: "images/albums/purple-rain.jpg" },
            { name: "Have You Ever Seen the Rain", artist: "CCR", genre: "Rock", image: "images/albums/have-you-seen-rain.jpg" },
            { name: "Umbrella", artist: "Rihanna ft. Jay-Z", genre: "Pop", image: "images/albums/umbrella.jpg" }
        ],
        calm: [
            { name: "Rain", artist: "The Beatles", genre: "Rock", image: "images/albums/rain-beatles.jpg" },
            { name: "Riders on the Storm", artist: "The Doors", genre: "Rock", image: "images/albums/riders-on-storm.jpg" },
            { name: "Only Happy When It Rains", artist: "Garbage", genre: "Alternative", image: "images/albums/only-happy-when-rains.jpg" }
        ]
    }
};


function handleMissingImage(event) {
    event.target.src = 'images/albums/default-album.jpg';
}


function updateMusicSection(weatherCondition) {
    const musicSection = document.querySelector('#music-section .w-75');
    

    const moodSelectionHTML = `
        <div class="mood-selection mb-5" style="animation: fadeIn 2s">
            <h3 class="mb-4">How are you feeling right now?</h3>
            <div class="row justify-content-center gap-3">
                <div class="col-md-2">
                    <button onclick="selectMood('happy')" class="btn btn-light w-100 py-3 mood-btn" 
                            style="transition: all 0.3s ease">
                        😊 Happy
                    </button>
                </div>
                <div class="col-md-2">
                    <button onclick="selectMood('sad')" class="btn btn-light w-100 py-3 mood-btn"
                            style="transition: all 0.3s ease">
                        😢 Sad
                    </button>
                </div>
                <div class="col-md-2">
                    <button onclick="selectMood('energetic')" class="btn btn-light w-100 py-3 mood-btn"
                            style="transition: all 0.3s ease">
                        ⚡ Energetic
                    </button>
                </div>
                <div class="col-md-2">
                    <button onclick="selectMood('calm')" class="btn btn-light w-100 py-3 mood-btn"
                            style="transition: all 0.3s ease">
                        😌 Calm
                    </button>
                </div>
            </div>
        </div>
        <div id="music-content" class="row" style="animation: fadeIn 2s"></div>
    `;


    musicSection.innerHTML = `
        <h2 id="musicHeading" class="display-4 fw-bold mb-4" style="animation: fadeInDown 2s;">
            Select Your Current Mood
        </h2>
        ${moodSelectionHTML}
    `;


    window.currentWeather = weatherCondition;


    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = 'none';
        });
    });
}


function selectMood(mood) {
    const weatherCondition = window.currentWeather?.toLowerCase() || 'clear';
    const recommendations = weatherBasedRecommendations[weatherCondition]?.[mood] || 
                          weatherBasedRecommendations.clear[mood];

    const heading = document.querySelector('#musicHeading');
    heading.style.animation = 'none';
    heading.offsetHeight;
    heading.style.animation = 'fadeInDown 2s';
    heading.textContent = `Music for ${weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1)} Weather - ${mood.charAt(0).toUpperCase() + mood.slice(1)} Mood`;


    const musicContent = recommendations.map(track => `
        <div class="col-md-4 mb-4">
            <div class="card h-100 text-center" 
                 style="background: linear-gradient(145deg, #2193b0, #6dd5ed); 
                        color: white;
                        transform: translateY(0);
                        transition: all 0.3s ease;">
                <div class="position-relative">
                    <img src="${track.image}" 
                         class="card-img-top" 
                         alt="${track.name} album cover" 
                         style="height: 250px; object-fit: cover;"
                         onerror="handleMissingImage(event)">
                    <div class="position-absolute bottom-0 start-0 w-100 p-2"
                         style="background: linear-gradient(transparent, rgba(0,0,0,0.7));">
                        <h5 class="card-title mb-0">${track.name}</h5>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <p class="card-text">By ${track.artist}</p>
                    <p class="card-text"><small>Genre: ${track.genre}</small></p>
                    <div class="mt-auto">
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    const musicContentDiv = document.querySelector('#music-content');
    musicContentDiv.style.animation = 'none';
    musicContentDiv.offsetHeight; 
    musicContentDiv.style.animation = 'fadeIn 2s';
    musicContentDiv.innerHTML = musicContent;


    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.2)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
}

function handleMusicRecommendation(weatherCondition) {
    updateMusicSection(weatherCondition);
}

function playPreview(songName) {
    alert(`Playing preview of: ${songName}\nNote: This is a placeholder. Actual audio preview requires audio file sources.`);
}
