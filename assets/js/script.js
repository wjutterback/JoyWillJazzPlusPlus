const preview = document.querySelector('img');
var imgResult = "";

//change query URL to skinanalyze API
// A file input's value attribute contains a DOMString that represents the path to the selected file(s)
// $('input')[0].files[0] - path to stored img on webpage

function doubleSearch(htmlsrc, htmlinput) {
  $('.error').text("");
  var fileList = $('input').prop('files'); // the array, not used just as a reminder
  console.log(imgResult);

  function googleSearch(searchVar) {

    var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyC1f9T-Bn9SvN0xu__sSjW-nTrsl_eqp-o&cx=f70009e920516f93e&q=" + searchVar;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var googleArray = response.items;
      // $('.imgdisplay').append(`<a href="${response.items[0].link}"> <img src="${response.items[0].pagemap.cse_thumbnail[0].src}" /></a>`)
      for (i = 0; i < 3; i++) {
        console.log(i);
        if (response.items[i].link.includes('/p/') === true) {
          $('.imgdisplay').append(`<a href="${response.items[i].link}"> <img src="${response.items[i].pagemap.cse_thumbnail[0].src}" /></a>`)
        } else { }
      }
    })
  }

  function scanFace(file64) {
    const data = {
      api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
      api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
      image_base64: file64,
    }
    var queryURL = "https://api-us.faceplusplus.com/facepp/v1/skinanalyze";
    $.ajax({
      url: queryURL,
      method: "POST",
      data: data,
      error: function () {
        $('.error').text("There was an error with your picture! It was larger than 2MB!")
      }
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
      var oilySkinConfidence = response.result.skin_type.details[0].confidence;
      var drySkin = response.result.skin_type.details[1].value;
      var drySkinConfidence = response.result.skin_type.details[1].confidence;
      var normalSkin = response.result.skin_type.details[2].value;
      var normalSkinConfidence = response.result.skin_type.details[2].confidence;
      var mixedSkin = response.result.skin_type.details[3].value;
      var mixedSkinConfidence = response.result.skin_type.details[3].confidence;
      var darkCircle = response.result.dark_circle.value;
      var darkCircleConfidence = response.result.dark_circle.confidence;
      var warning = response.warning[0];

      if (warning === !undefined) {

        $('.error2').text(`Warning: ${warning}`);
      }

      if (faceAcne === 1 && faceAcneConfidence >= .70) {
        googleSearch("Acne medication")
      }
      if (oilySkin === 1 && oilySkinConfidence >= .70) {
        googleSearch("oily skin products")
      }
      if (drySkin === 1 && drySkinConfidence >= .70) {
        googleSearch("dry skin products")
      }
      if (mixedSkin === 1 && mixedSkinConfidence >= .70) {
        googleSearch("combination skin products")
      }
      if (darkCircle === 1 && darkCircleConfidence >= .70) {
        googleSearch("dark circles")
      }
      if (normalSkin === 1 && normalSkinConfidence >= .70) {
        $('.error').text("You're beautiful just the way you are.")
      }
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
      error: function () {
        $('.error').text("There was an error with your picture! It was larger than 2MB!")
      }
    }).then(function (response) {
      // will need to make a conditional statement for what google searches.
      console.log(response);
      var faceAcne = response.result.acne.value;
      var faceAcneConfidence = response.result.acne.confidence;
      var oilySkin = response.result.skin_type.details[0].value;
      var oilySkinConfidence = response.result.skin_type.details[0].confidence;
      var drySkin = response.result.skin_type.details[1].value;
      var drySkinConfidence = response.result.skin_type.details[1].confidence;
      var normalSkin = response.result.skin_type.details[2].value;
      var normalSkinConfidence = response.result.skin_type.details[2].confidence;
      var mixedSkin = response.result.skin_type.details[3].value;
      var mixedSkinConfidence = response.result.skin_type.details[3].confidence;
      var darkCircle = response.result.dark_circle.value;
      var darkCircleConfidence = response.result.dark_circle.confidence;
      var warning = response.warning[0];

      if (warning === !undefined) {

        $('.error2').text(`Warning: ${warning}`);
      }

      if (faceAcne === 1 && faceAcneConfidence >= .70) {
        googleSearch("Acne medication")
      }
      if (oilySkin === 1 && oilySkinConfidence >= .70) {
        googleSearch("oily skin products")
      }
      if (drySkin === 1 && drySkinConfidence >= .70) {
        googleSearch("dry skin products")
      }
      if (mixedSkin === 1 && mixedSkinConfidence >= .70) {
        googleSearch("combination skin products")
      }
      if (darkCircle === 1 && darkCircleConfidence >= .70) {
        googleSearch("dark circles")
      }
      if (normalSkin === 1 && normalSkinConfidence >= .70 && faceAcne === 0 && darkCircle === 0) {
        $('.error').text("You're beautiful just the way you are.")
      }
    })

  }

  if (htmlinput === true) {
    scanFaceHTML();
  } else {
    scanFace(imgResult);
  }
}

// when encodeIMG is run it will convert our imgFile variable into base64 and display it to page
function encodeIMG() {
  var imgFile = $('input').prop('files')[0];
  if (imgFile.size >= 2000000) {
    $('.error').text("Your image is larger than 2mb!")
  }
  var reader = new FileReader();
  reader.onloadend = function () {
    console.log(reader.result); // base64 conversion result
    preview.src = reader.result;
    imgResult = reader.result; // displays image on site
    return imgResult;
  }
  reader.readAsDataURL(imgFile) // Takes the file and converts the data to base64
}

//currently uses two buttons - would like to just use one but will require more work
$("#submitButton").on("click", function () {
  doubleSearch($('#imgURL').val(), true)
});

$("#fileSubmit").on("click", doubleSearch);
// when we upload a file, we encode it
$('#fileIMG').on("change", encodeIMG);