

function doubleSearch(imgURL) {

  const data = {
    api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
    api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
    image_url: imgURL,
    return_landmark: "1",
    return_attributes: "beauty,age,gender",
  }
  alert('button clicked');
  console.log(imgURL)
  console.log(data);

  function googleSearch(searchVar) {

    var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyC1f9T-Bn9SvN0xu__sSjW-nTrsl_eqp-o&cx=f70009e920516f93e&q=" + searchVar;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
    })
  }

  function scanFace() {
    var queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?"
    $.ajax({
      url: queryURL,
      method: "POST",
      data: data,
    }).then(function (response) {
      var faceInfo = response.faces[0].attributes.age.value;
      console.log(response);
      console.log(faceInfo)
      googleSearch(faceInfo);
    })

  }

  // googleSearch();
  scanFace();
}

$("#submitButton").on("click", function () {
  doubleSearch($('#imgURL').val());
})