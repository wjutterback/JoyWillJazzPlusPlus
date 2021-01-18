$(document).foundation()

const preview = document.querySelector('img');
var imgResult = "";

function doubleSearch(htmlsrc, htmlinput) {
  $('.error').text("");
  $('.error2').text("");
  $('#message').empty();
  $('.resultdisplay h1').text('');
  $('.erase').empty();
  var fileList = $('input').prop('files'); // the array, not used just as a reminder

  function googleSearch(searchVar) {

    var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyC1f9T-Bn9SvN0xu__sSjW-nTrsl_eqp-o&cx=f70009e920516f93e&q=" + searchVar;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var googleArray = response.items;

      if (searchVar === "Acne medication") {
        $('.acneresult h1').text("Acne products:")
      } else if (searchVar === "oily skin products" || searchVar === "dry skin products" || searchVar === "combination skin products") {
        $('.skinresult h1').text("Skincare products:")
      } else if (searchVar === "dark circles") {
        $('.eyeresult h1').text("Eyecare products:")
      }
      for (i = 0; i < googleArray.length; i++) {
        if (response.items[i].link.includes('/p/') === true) {
          if (searchVar === "Acne medication") {
            $('#acnedisplay').append(`<a href="${response.items[i].link}"> <img src="${response.items[i].pagemap.cse_thumbnail[0].src}" /></a>`)
          } else if (searchVar === "oily skin products" || searchVar === "dry skin products" || searchVar === "combination skin products") {
            $('#skindisplay').append(`<a href="${response.items[i].link}"> <img src="${response.items[i].pagemap.cse_thumbnail[0].src}" /></a>`)
          } else if (searchVar === "dark circles") {
            $('#eyedisplay').append(`<a href="${response.items[i].link}"> <img src="${response.items[i].pagemap.cse_thumbnail[0].src}" /></a>`)
          }
        } else { }
      }
    })
  }

  function scanFace() {

    if (htmlinput === true) {
      preview.src = htmlsrc;
      imgResult = htmlsrc;
      var error = () => $('.error').text("There was an error with your picture! It was larger than 2MB!");
      var data = {
        api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
        api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
        image_url: htmlsrc,
        return_landmark: "all"
      }
    } else {
      var data = {
        api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
        api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
        image_base64: imgResult,
        return_landmark: "all"
      }
    }
    var queryURL = "https://api-us.faceplusplus.com/facepp/v1/skinanalyze";
    $.ajax({
      url: queryURL,
      method: "POST",
      data: data,
      error: error,
    }).then(function (response) {
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

      if (warning === undefined) {
      } else if (warning.includes('improper') === true) {
        $('.error2').text(`Warning: Improper Head Pose (use a picture where you look at the camera directly)`);
      }

      if (faceAcne === 1 && faceAcneConfidence >= .70) {
        $('<div>').text('You have acne. Here are some products that might work for you!').appendTo($('#message'));
        googleSearch("Acne medication");
      }

      if (oilySkin === 1 && oilySkinConfidence >= .70) {
        $('<div>').text('You have oily skin. Here are some products that might work for you!').appendTo($('#message'));
        googleSearch("oily skin products");
      }

      if (drySkin === 1 && drySkinConfidence >= .70) {
        $('<div>').text('You have dry skin. Here are some products that might work for you!').appendTo($('#message'));
        googleSearch("dry skin products")
      }

      if (mixedSkin === 1 && mixedSkinConfidence >= .70) {
        $('<div>').text('You have combined or mixed skin . Here are some products that might work for you!').appendTo($('#message'));
        googleSearch("combination skin products")
      }

      if (darkCircle === 1 && darkCircleConfidence >= .70) {
        $('<div>').text('You have dark circles. Here are some products that might work for you!').appendTo($('#message'));
        googleSearch("dark circles")
      }

      if (normalSkin === 1 && normalSkinConfidence >= .70) {
        $('<div>').text('You have perfect skin!').appendTo($('#message'));
      }
    })

    $.ajax({
      url: "https://api-us.faceplusplus.com/facepp/v1/face/thousandlandmark",
      method: "POST",
      data: data,
    }).then(function (response) {
      console.log(response);
      var image = new Image();
      image.src = imgResult;
      var canvas = document.getElementById("canvasImg");
      var ctx = canvas.getContext("2d");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0);

      const { landmark } = response.face;
      const parts = Object.keys(landmark);
      const coords = [];
      parts.forEach(part => {
        const partKeys = Object.keys(landmark[part]);
        partKeys.forEach((coord) => {
          coords.push(landmark[part][coord]);
        })
      });
      coords.forEach(function (value) {
        ctx.fillRect(value.x, value.y, 2, 2)
      })

    });
  };
  scanFace();
}

// when encodeIMG is run it will convert our imgFile variable into base64 and display it to page
function encodeIMG() {
  var imgFile = $('input').prop('files')[0];
  if (imgFile.size >= 2000000) {
    $('.error').text("Your image is larger than 2mb!")
  }
  var reader = new FileReader();
  reader.onloadend = function () {
    preview.src = reader.result; // displays image on site
    imgResult = reader.result; // base64 conversion result 
    return imgResult;
  }
  reader.readAsDataURL(imgFile) // Takes the file and converts the data to base64
}

//currently uses two buttons - would like to just use one but will require more work
$("#submitButton").on("click", function () {
  doubleSearch($('#imgURL').val(), true)
});

$("#fileSubmit").on("click", function () {
  doubleSearch()
});
// when we upload a file, we encode it
$('#fileIMG').on("change", function () {
  $('.error').text("");
  $('.error2').text("");
  encodeIMG();
});
