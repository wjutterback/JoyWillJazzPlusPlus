var imgURL = $("#imgURL").val();

const data = {
  api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
  api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
  image_url: imgURL,
  return_landmark: "1",
  return_attributes: "beauty,age,gender",
}

function doubleSearch() {
  console.log(imgURL)

  function googleSearch() {

    var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyC1f9T-Bn9SvN0xu__sSjW-nTrsl_eqp-o&cx=f70009e920516f93e&q=lotion"
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
      console.log(response);
    })
  }

  // googleSearch();
  // scanFace();
}

$("#submitButton").on("click", doubleSearch(imgUrl))