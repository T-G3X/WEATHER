let speedWind = 0;
let degWind = 0;

ajaxGet("https://api.openweathermap.org/data/2.5/weather?q=Toulouse,fr&APPID=0633adde6603d1498c86bcdae0a709d1", function (reponse) {
    var profile = JSON.parse(reponse);
    speedWind = profile.wind.speed;
    degWind = profile.wind.deg;
    if (degWind === undefined ) {
        degWind = 0;
    }
});

export {speedWind, degWind};