
var queryURL = 'https://api-us.faceplusplus.com/facepp/v3/compare?key=AIzaSyC1f9T-Bn9SvN0xu__sSjW-nTrsl_eqp-o'

$.ajax ({
    url: queryURL,
    method:'POST'
}).then(function (response){
    console.log(response);
});