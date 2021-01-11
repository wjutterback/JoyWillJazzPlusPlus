
// A file input's value attribute contains a DOMString that represents the path to the selected file(s)
// $('input')[0].files[0] - path to stored img on webpage

function doubleSearch(htmlsrc, htmlsearch) {
  var fileList = $('input')[0].files; // the array, not used just as a reminder
  var imgFile = $('input')[0].files[0];
  const preview = document.querySelector('img')
  console.log($('input')[0])
  console.log($('input')[0].files[0])
  console.log(fileList);

  function googleSearch(searchVar) {

    var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyC1f9T-Bn9SvN0xu__sSjW-nTrsl_eqp-o&cx=f70009e920516f93e&q=" + searchVar;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
    })
  }

  function scanFace(file64) {
    const data = {
      api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
      api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
      image_base64: file64,
      return_landmark: "1",
      return_attributes: "age,gender,skinstatus", // more options available, emotion, smile, ethnicity etc.
    }
    console.log(data);
    var queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?"
    $.ajax({
      url: queryURL,
      method: "POST",
      data: data,
    }).then(function (response) {
      var faceInfoAge = response.faces[0].attributes.age.value;
      var faceInfoGender = response.faces[0].attributes.gender.value;
      var faceInfoSkinAcne = response.faces[0].attributes.skinstatus.acne;
      var faceInfoSkinDarkCircle = response.faces[0].attributes.skinstatus.dark_circle;
      var faceInfoSkinHealth = response.faces[0].attributes.skinstatus.health;
      // will need to make a conditional statement for what google searches.
      console.log(response);
      console.log(faceInfoAge)
      googleSearch(faceInfoAge);
    })
  }

  function scanFaceHTML(link) {
    preview.src = $('#imgURL').val();
    const data = {
      api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
      api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
      image_url: link,
      return_landmark: "1",
      return_attributes: "age,gender,skinstatus", // more options available, emotion, smile, ethnicity etc.
    }
    console.log(data);
    var queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?"
    $.ajax({
      url: queryURL,
      method: "POST",
      data: data,
    }).then(function (response) {
      var faceInfoAge = response.faces[0].attributes.age.value;
      var faceInfoGender = response.faces[0].attributes.gender.value;
      var faceInfoSkinAcne = response.faces[0].attributes.skinstatus.acne;
      var faceInfoSkinDarkCircle = response.faces[0].attributes.skinstatus.dark_circle;
      var faceInfoSkinHealth = response.faces[0].attributes.skinstatus.health;
      // will need to make a conditional statement for what google searches.
      console.log(response);
      console.log(faceInfoAge)
      googleSearch(faceInfoAge);
    })

  }

  // when encodeIMG is run it will convert our imgFile variable into base64 and display it to page
  function encodeIMG() {
    var reader = new FileReader();
    reader.onloadend = function () {
      console.log(reader.result); // base64 conversion result
      preview.src = reader.result; // displays image on site
      scanFace(reader.result);
    }
    reader.readAsDataURL(imgFile) // Takes the file and converts the data to base64
  }

  if (htmlsearch === true) {
    scanFaceHTML(htmlsrc);
  } else {
    encodeIMG();
  }
}
//currently uses two buttons - would like to just use one but will require more work
$("#submitButton").on("click", function () {
  doubleSearch($('#imgURL').val(), true);
})

$("#fileSubmit").on("click", function () {
  doubleSearch();
})