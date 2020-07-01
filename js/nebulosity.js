
function cloudiness(nebulosite){
  let result = "";
  let showCiel = "";
    if (nebulosite < 2){
        return ("<img src ='../img/mbrisun2_99594.png'>" + "<br>ciel dégagé</p>") ;
    } else if (nebulosite >= 2 && nebulosite <4) 
    {
      return ("<img src ='../img/overcastday_weather_sun_cloudy_4493.png'>" + "<br>ciel peu nuageux</p>");
    } else if (nebulosite >= 4 && nebulosite <=6) {
      return ("<img src='../img/clouds.png' width='64px'>" + "<br>ciel nuageux");
    } else if (nebulosite > 6  && nebulosite < 8) {
      return ("<img src='../img/very_cloudy.png' width='64px'>" + "<br>ciel très nuageux");
    } else if (nebulosite === 8) {
      return ("<img src='../img/black_clouds.png' width='64px'>" + "<br>ciel couvert");
    }
};


  
  export {cloudiness}; // a list of exported variables
