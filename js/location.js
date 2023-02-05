
function getLocationCoords() {
    let location = document.getElementById('location');
    let temperature = document.getElementById('temperature');
    const loader = document.querySelector('.loader');

    async function successCallback(position) {
        const FORECAST = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current_weather=true`;
        const GEOCODING = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;
        const urls = [FORECAST, GEOCODING];

        var promises = urls.map(url => fetch(url).then(y => y.json()));
        Promise.all(promises).then(results => {
            console.log(results)
            loader.style.display = 'none';
            temperature.innerHTML = 'Temperature: ' + Math.floor(results[0].current_weather.temperature) + '\xB0C';
            location.innerHTML = 'Location: ' + results[1].locality;
        }).catch(err => {
            console.log(err);
            loader.style.display = 'none'
        });
    }
    
    function failureCallback() {
        loader.style.display = 'none';
        alert("Unable to retrieve your location. Please allow location services and refresh page");
    }

    /* geolocation is available */
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
    }else {/* geolocation IS NOT available */
        loader.style.display = 'none';
        alert('Geolocation is not supported by your browser')
    }
}



getLocationCoords();