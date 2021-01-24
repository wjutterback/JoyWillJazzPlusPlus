$(document).foundation();
var imgResult = '';

function doubleSearch(htmlsrc, htmlinput) {
  $('.error').text('');
  $('.error2').text('');
  $('#message').empty();
  $('.resultdisplay h1').text('');
  $('.erase').empty();
  $('#canvas-div').empty();

  function googleSearch(searchVar) {
    var queryURL =
      'https://www.googleapis.com/customsearch/v1?key=AIzaSyC1f9T-Bn9SvN0xu__sSjW-nTrsl_eqp-o&cx=f70009e920516f93e&q=' +
      searchVar;
    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (response) {
      var googleArray = response.items;

      for (let i = 0; i < googleArray.length; i++) {
        if (response.items[i].link.includes('/p/') === true) {
          if (searchVar === 'Acne medication') {
            $('#acnedisplay').append(
              `<a target="_blank" href="${response.items[i].link}"> <img src="${response.items[i].pagemap.cse_thumbnail[0].src}" /></a>`
            );
          } else if (
            searchVar === 'oily skin products' ||
            searchVar === 'dry skin products' ||
            searchVar === 'combination skin products'
          ) {
            $('#skindisplay').append(
              `<a target="_blank" href="${response.items[i].link}"> <img src="${response.items[i].pagemap.cse_thumbnail[0].src}" /></a>`
            );
          } else if (searchVar === 'dark circles') {
            $('#eyedisplay').append(
              `<a target="_blank" href="${response.items[i].link}"> <img src="${response.items[i].pagemap.cse_thumbnail[0].src}" /></a>`
            );
          }
        }
      }
    });
  }

  function scanFace() {
    var data = '';
    var error = () =>
      $('.error').text(
        'There was an error with your picture! It was larger than 2MB!'
      );
    if (htmlinput === true) {
      $('.image').remove();
      $('<img>')
        .attr('src', htmlsrc)
        .attr('alt', 'User Image')
        .attr('class', 'image')
        .appendTo($('.imgdisplay'));
      imgResult = htmlsrc;
      data = {
        api_key: 'CKjT0AMrUWohOGp31Z91LRwt5wLh9frE',
        api_secret: 'u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt',
        image_url: htmlsrc,
        return_landmark: 'all',
      };
    } else {
      data = {
        api_key: 'CKjT0AMrUWohOGp31Z91LRwt5wLh9frE',
        api_secret: 'u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt',
        image_base64: imgResult,
        return_landmark: 'all',
      };
    }
    var queryURL = 'https://api-us.faceplusplus.com/facepp/v1/skinanalyze';
    $.ajax({
      url: queryURL,
      method: 'POST',
      data: data,
      error: error,
    }).then(function (response) {
      var faceAcne = response.result.acne.value;
      var faceAcneConfidence = response.result.acne.confidence;
      var oilySkin = response.result.skin_type.details[0].value;
      var oilySkinConfidence = response.result.skin_type.details[0].confidence;
      var drySkin = response.result.skin_type.details[1].value;
      var drySkinConfidence = response.result.skin_type.details[1].confidence;
      var normalSkin = response.result.skin_type.details[2].value;
      var normalSkinConfidence =
        response.result.skin_type.details[2].confidence;
      var mixedSkin = response.result.skin_type.details[3].value;
      var mixedSkinConfidence = response.result.skin_type.details[3].confidence;
      var darkCircle = response.result.dark_circle.value;
      var darkCircleConfidence = response.result.dark_circle.confidence;
      var warning = response.warning[0];

      if (warning === !undefined && warning.includes('improper') === true) {
        $('.error2').text(
          `Warning: Improper Head Pose (use a picture where you look at the camera directly)`
        );
      }

      if (faceAcne === 1 && faceAcneConfidence >= 0.7) {
        $('.acneresult h1').text(
          "We've detected acne. Here are some products that might work for you!"
        );
        googleSearch('Acne medication');
      }

      if (oilySkin === 1 && oilySkinConfidence >= 0.7) {
        $('.skinresult h1').text(
          "We've detected oily skin. Here are some products that might work for you!"
        );
        googleSearch('oily skin products');
      }

      if (drySkin === 1 && drySkinConfidence >= 0.7) {
        $('.skinresult h1').text(
          "We've detected dry skin. Here are some products that might work for you!"
        );
        googleSearch('dry skin products');
      }

      if (mixedSkin === 1 && mixedSkinConfidence >= 0.7) {
        $('.skinresult h1').text(
          "We've detected combined or mixed skin . Here are some products that might work for you!"
        );
        googleSearch('combination skin products');
      }

      if (darkCircle === 1 && darkCircleConfidence >= 0.7) {
        $('.eyeresult h1').text(
          "We've detected dark circles. Here are some products that might work for you!"
        );
        googleSearch('dark circles');
      }

      if (
        normalSkin === 1 &&
        normalSkinConfidence >= 0.7 &&
        faceAcne === 0 &&
        darkCircle === 0
      ) {
        $('<div>').text('You have perfect skin!').appendTo($('#message'));
      } else if (normalSkin === 1 && normalSkinConfidence >= 0.7) {
        $('<div>')
          .text("You don't have oily or dry skin!")
          .appendTo($('#message'));
      }
    });

    $.ajax({
      url: 'https://api-us.faceplusplus.com/facepp/v1/face/thousandlandmark',
      method: 'POST',
      data: data,
    }).then(function (response) {
      //draws canvas image
      var image = new Image();
      image.src = imgResult;
      $('#canvas-div').append(`<canvas id="canvasID"></canvas>`);
      var canvas = document.getElementById('canvasID');
      var ctx = canvas.getContext('2d');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      //redraw canvas if image natural width is very large - not exact, eyeballed the amount
      if (canvas.width >= '1800') {
        ctx.scale(0.5, 0.5);
        ctx.translate(1300, 30);
      }
      ctx.drawImage(image, 0, 0);

      const { landmark } = response.face;
      const parts = Object.keys(landmark);
      const coords = [];
      parts.forEach((part) => {
        const partKeys = Object.keys(landmark[part]);
        partKeys.forEach((coord) => {
          coords.push(landmark[part][coord]);
        });
      });
      //plots 1,000 coordinates onto canvas image
      coords.forEach(function (value) {
        ctx.fillRect(value.x, value.y, 2, 2);
      });
    });
  }
  scanFace();
}

// when encodeIMG is run it will convert our imgFile variable into base64 and display it to page
function encodeIMG() {
  if ($('input').prop('files')[0]) {
    var imgFile = $('input').prop('files')[0];
    if (imgFile.size >= 2000000) {
      $('.error').text(
        'Your image is larger than 2mb! Please upload a smaller image.'
      );
    }
    var reader = new FileReader();
    reader.onloadend = function () {
      $('<img>')
        .attr('src', reader.result)
        .attr('alt', 'User Image')
        .attr('class', 'image')
        .appendTo($('.imgdisplay'));
      imgResult = reader.result; // base64 conversion result
      return imgResult;
    };
    reader.readAsDataURL(imgFile); // Takes the file and converts the data to base64
  }
}

$('#submitButton').on('click', function () {
  if ($('#imgURL').val() === '') {
    $('.error').text('Please include a link to a picture!');
  } else {
    doubleSearch($('#imgURL').val(), true);
  }
});

$('#fileSubmit').on('click', function () {
  if ($('#fileIMG').prop('files')[0] === undefined) {
    $('.error').text('Please upload a picture!');
  } else {
    doubleSearch();
  }
});
// when we upload a file, we encode it
$('#fileIMG').on('change', function () {
  $('.error').text('');
  $('.error2').text('');
  $('#message div').remove();
  $('img').remove();
  $('.resultdisplay h1').text('');
  $('.erase').empty();
  $('#canvas-div').empty();
  encodeIMG();
});
