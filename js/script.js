import {speedWind, degWind} from './boussole.js';
console.log("tata");
//date
const currentTime = new Date(Date.now());
    function getTwoDigitDateFormat(monthOrDate) {
        return (monthOrDate < 10) ? '0' + monthOrDate : '' + monthOrDate;
    }
    var twoDigitDate = getTwoDigitDateFormat(currentTime.getMonth());
    let year = currentTime.getFullYear();
    let month = getTwoDigitDateFormat(currentTime.getMonth()+1);
    let day = getTwoDigitDateFormat(currentTime.getDate());
    let hour = currentTime.getHours();
    let min = currentTime.getMinutes();
    let dateApi = "";
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    dateApi = day + "-" + month + "-" + year + " " + hour + ":" + min;

// OpenWeather - Données météo
ajaxGet("https://api.openweathermap.org/data/2.5/weather?q=Toulouse,fr&APPID=0633adde6603d1498c86bcdae0a709d1", function (reponse) {
    var profile = JSON.parse(reponse);   
    
    
    console.log(dateApi);
    let showLocalisation = document.getElementById("localisation");
    let showTemperature = document.getElementById("temperature");
    let showPression = document.getElementById("pression");
    let showHygrometrie = document.getElementById("hygrometrie");
    let showCiel = document.getElementById("ciel");
    let showSun = document.getElementById("soleil");
    let showSpeed = document.getElementById("vitesse");
    let showBoussole = document.getElementById("fond_boussole");
    const q = -273.15;
    let temperatureCalc = profile.main.temp + q;
    let dateArise = new Date(profile.sys.sunrise * 1000);
    let dateSunset = new Date(profile.sys.sunset * 1000);
    let hourArise = dateArise.getHours();
    let minuteArise = dateArise.getMinutes();
    let minuteSunset = dateSunset.getMinutes();
    if (hourArise < 10) {
        hourArise = "0" + hourArise;
    }
    if (minuteArise < 10) {
        minuteArise = "0" + minuteArise;
    }
    if (minuteSunset < 10) {
        minuteSunset = "0" + minuteSunset;
    }
    
    showLocalisation.innerHTML = "<h3>Toulouse</h3><h4>Source:<a href='https://openweathermap.org/'>OpenWeather</a></h4>" //+ "<p>" + dateApi + "</p>";
    showCiel.innerHTML = "<p>Temps: " + profile.weather[0].description + "</p>";
    showTemperature.innerHTML = "<p>Température: " + Math.round(temperatureCalc) + " °C </p>";
    showPression.innerHTML = "<p>Pression: " + profile.main.pressure + " hPa </p>";
    showHygrometrie.innerHTML = "<p>Humidité: " + (profile.main.humidity) + " % </p>";
    showSun.innerHTML = "<p><img src='../img/Weather-Sunrise-icon.png'> " + " " + hourArise + "h:" + minuteArise + "min" + " " + "<img src='../img/Weather-Sunset-icon.png'> " + " " + dateSunset.getHours() + "h:" + minuteSunset + "min </p>";
    let elmt = document.getElementById("boussole");
    elmt.style.rotate = ((degWind)+180) + "deg";
    showSpeed.innerHTML = "<p>Vitesse: " + Math.round(speedWind*(3.6)) + "km/h</p>";
    elmt.innerHTML = "<img src='../img/Fleche_Boussole.png'>";
    showBoussole.innerHTML = "<img src='../img/Fond_Boussole.png'>";
})

//Opendatasoft - Alertes météo
ajaxGet("https://data.opendatasoft.com/api/records/1.0/search/?dataset=risques-meteorologiques-par-departement-historique%40public&facet=nom_reg&facet=nom_dept&facet=etat_vent&facet=etat_pluie_inondation&facet=etat_inondation&facet=etat_neige&facet=etat_canicule&facet=etat_grand_froid&facet=etat_avalanches&facet=etat_vague_submersion&facet=timestamp&refine.timestamp="+ year + "%2F" + month + "%2F" + day + "&refine.nom_dept=HAUTE-GARONNE ",function(reponse){
    let profile = JSON.parse(reponse);
    let red = "vigilance: rouge";
    let orange = "vigilance: orange";
    let green = "vigilance: vert"
    let showAlert = document.getElementById("alerte");
    let id = " id='logo' ";

    //Affichage par défaut
    showAlert.innerHTML = "Aucune alerte météo";

    //Canicule
    if (profile.records[0].fields.etat_canicule == "Rouge"){
        console.log(red);
        showAlert.innerHTML = "Alerte: <img " + id + "src='../img/alertes/red_hot.png' width=50px>";
    } else if (profile.records[0].fields.etat_canicule == "Orange"){
        console.log(orange);
        showAlert.innerHTML = "Alerte: <img" + id + " src='../img/alertes/orange_hot.png' width=50px>";
    }

    //Inondation
    if (profile.records[0].fields.etat_inondation == "Rouge"){
        console.log(red);
        showAlert.innerHTML = "Attention Alerte: <img " + id + "src='../img/alertes/red_flood.png' width=50px>";
    } else if (profile.records[0].fields.etat_inondation == "Orange"){
        console.log(orange);
        showAlert.innerHTML = "Alerte: <img " + id + "src='../img/alertes/orange_flood.png' width=50px>";
    }

    //Froid
    if (profile.records[0].fields.etat_grand_froid == "Rouge"){
        console.log(red);
        showAlert.innerHTML = "Alerte <img src='../img/alertes/red_cold.png' width=50px>";
    } else if (profile.records[0].fields.etat_grand_froid == "Orange"){
        console.log(orange);
        showAlert.innerHTML = "Alerte: <img " + id + "src='../img/alertes/orange_cold.png' width=50px>";
    }

    //Pluie
    if (profile.records[0].fields.etat_pluie_inondation == "Rouge"){
        console.log(red);
        showAlert.innerHTML = "Alerte <img src='../img/alertes/red_rain.png' width=50px>";
    } else if (profile.records[0].fields.etat_pluie_inondation == "Orange"){
        console.log(orange);
        showAlert.innerHTML = "Alerte: <img " + id + "src='../img/alertes/orange_rain.png' width=50px>";
    }

    //Neige
    if (profile.records[0].fields.etat_neige == "Rouge"){
        console.log(red);
        showAlert.innerHTML = "Alerte: <img " + id + "src='../img/alertes/red_snow.png' width=50px>";
    } else if (profile.records[0].fields.etat_neige == "Orange"){
        console.log(orange);
        showAlert.innerHTML = "Alerte: <img " + id + "src='../img/alertes/orange_snow.png' width=50px>";
    }

    //Vent
    if (profile.records[0].fields.etat_vent == "Rouge"){
        console.log(red);
        showAlert.innerHTML = "Alerte: <img " + id + " src='../img/alertes/red_wind.png' width=50px>";
    } else if (profile.records[0].fields.etat_vent == "Orange"){
        console.log(orange);
        showAlert.innerHTML = "Alerte: <img " + id + "src='../img/alertes/orange_wind.png' width=50px>";
    }

    console.log(profile.records[0].fields.etat_canicule);
    console.log(profile.records[0].fields.etat_inondation);
    console.log(profile.records[0].fields.etat_grand_froid);
    console.log(profile.records[0].fields.etat_pluie_inondation);
    console.log(profile.records[0].fields.etat_neige);
    console.log(profile.records[0].fields.etat_vent);

})
