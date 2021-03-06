$(document).foundation();
var imgResult = '';

function doubleSearch(htmlsrc, htmlinput) {
  $('.error').text('');
  $('#clooneyMessage').text('');

  function scanFace() {
    var data = '';
    var error = () =>
      $('.error').text(
        'There was an error with your picture! It was larger than 2MB!'
      );
    if (htmlinput === true) {
      $('#imgOne').empty();
      $('<img>')
        .attr('src', htmlsrc)
        .attr('alt', 'User Image')
        .attr('id', 'preview1')
        .appendTo($('#imgOne'));
      imgResult = htmlsrc;
      data = {
        api_key: 'CKjT0AMrUWohOGp31Z91LRwt5wLh9frE',
        api_secret: 'u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt',
        image_url1: htmlsrc,
        image_url2:
          'https://i.pinimg.com/originals/d1/88/98/d18898c13240578f2d6aaf8c909234bb.jpg',
      };
    } else {
      data = {
        api_key: 'CKjT0AMrUWohOGp31Z91LRwt5wLh9frE',
        api_secret: 'u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt',
        image_base64_1: imgResult,
        image_url2:
          'https://i.pinimg.com/originals/d1/88/98/d18898c13240578f2d6aaf8c909234bb.jpg',
      };
    }
    var queryURL = 'https://api-us.faceplusplus.com/facepp/v3/compare';
    $.ajax({
      url: queryURL,
      method: 'POST',
      data: data,
      error: error,
    }).then(function (response) {
      var similarFace = Math.round(response.confidence);

      if (similarFace === undefined || similarFace === null) {
        $('<div>')
          .text('Your picture was unable to be scanned.')
          .appendTo($('#clooneyMessage'));
      }

      if (similarFace >= 0 && similarFace <= 10) {
        $('<div>')
          .text(
            `You do not really look like George Clooney! You look ${similarFace}% like George Clooney.`
          )
          .appendTo($('#clooneyMessage'));
      }

      if (similarFace > 10 && similarFace <= 35) {
        $('<div>')
          .text(
            `You look a bit like George Clooney! You look ${similarFace}% like George Clooney.`
          )
          .appendTo($('#clooneyMessage'));
      }

      if (similarFace > 35 && similarFace <= 50) {
        $('<div>')
          .text(
            `You look sort of like George Clooney! You look ${similarFace}% like George Clooney.`
          )
          .appendTo($('#clooneyMessage'));
      }

      if (similarFace > 50 && similarFace <= 75) {
        $('<div>')
          .text(
            `You have many similiar features to George Clooney! You look ${similarFace}% like George Clooney.`
          )
          .appendTo($('#clooneyMessage'));
      }

      if (similarFace > 75) {
        $('<div>')
          .text(
            `You look a lot like George Clooney! You look ${similarFace}% like George Clooney.`
          )
          .appendTo($('#clooneyMessage'));
      }
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
        .attr('id', 'preview1')
        .appendTo($('#imgOne'));
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
  $('#clooneyMessage').text('');
  $('#imgOne').empty();
  encodeIMG();
});
