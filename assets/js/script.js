=======

//change query URL to skinanalyze API
// A file input's value attribute contains a DOMString that represents the path to the selected file(s)
// $('input')[0].files[0] - path to stored img on webpage

function doubleSearch(htmlsrc, htmlinput) {
  var fileList = $('input').prop('files'); // the array, not used just as a reminder
  var imgFile = $('input').prop('files')[0];

  const preview = document.querySelector('img');

  console.log(fileList);
  console.log(imgFile);

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
    }
    console.log(data);

    var queryURL = "https://api-us.faceplusplus.com/facepp/v1/skinanalyze";

    $.ajax({
      url: queryURL,
      method: "POST",
      data: data,
    }).then(function (response) {

      // will need to make a conditional statement for what google searches.
      console.log(response);
      //skin_type values below
      // 0	oily skin
      // 1	dry skin
      // 2	normal skin
      // 3	mixed skin
      var faceAcne = response.result.acne.value;
      var faceAcneConfidence = response.result.acne.confidence;
      var oilySkin = response.result.skin_type.details[0].value;
      var drySkin = response.result.skin_type.details[1].value;
      var normalSkin = response.result.skin_type.details[2].value;
      var mixedSkin = response.result.skin_type.details[3].value;
      var darkCircle = response.result.dark_circle.value;
      var darkCircleConfidence = response.result.dark_circle.confidence;
      // googleSearch(faceAcne); // if faceAcne.value = 1 {googleSearch(faceAcne)} - something like this
    })
  }

  function scanFaceHTML() {
    preview.src = $('#imgURL').val();
    const data = {
      api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
      api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
      image_url: htmlsrc,
    }
    console.log(data);
    var queryURL = "https://api-us.faceplusplus.com/facepp/v1/skinanalyze";

    $.ajax({
      url: queryURL,
      method: "POST",
      data: data,
    }).then(function (response) {
      // will need to make a conditional statement for what google searches.
      console.log(response);
      var faceAcne = response.result.acne.value;
      var faceAcneConfidence = response.result.acne.confidence;
      var oilySkin = response.result.skin_type.details[0].value;
      var drySkin = response.result.skin_type.details[1].value;
      var normalSkin = response.result.skin_type.details[2].value;
      var mixedSkin = response.result.skin_type.details[3].value;
      var darkCircle = response.result.dark_circle.value;
      var darkCircleConfidence = response.result.dark_circle.confidence;
      // googleSearch(faceInfoAge);
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

  if (htmlinput === true) {
    scanFaceHTML();
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
