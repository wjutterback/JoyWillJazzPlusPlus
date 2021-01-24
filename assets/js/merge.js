$(document).foundation();

var imgResult = '';
var imgResult2 = '';

function doubleSearch(htmlsrc, htmlsrc2, htmlinput) {
  $('.error').text('');

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
        .attr('id', 'preview1')
        .attr('class', 'image')
        .appendTo($('.imgdisplay'));
      $('<img>')
        .attr('src', htmlsrc2)
        .attr('alt', 'User Image')
        .attr('id', 'preview2')
        .attr('class', 'image')
        .appendTo($('.imgdisplay'));
      data = {
        api_key: 'CKjT0AMrUWohOGp31Z91LRwt5wLh9frE',
        api_secret: 'u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt',
        template_url: htmlsrc,
        merge_url: htmlsrc2,
      };
    } else {
      data = {
        api_key: 'CKjT0AMrUWohOGp31Z91LRwt5wLh9frE',
        api_secret: 'u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt',
        template_base64: imgResult,
        merge_base64: imgResult2,
      };
    }
    var queryURL = 'https://api-us.faceplusplus.com/imagepp/v1/mergeface';
    $.ajax({
      url: queryURL,
      method: 'POST',
      data: data,
      error: error,
    }).then(function (response) {
      //source merged image from base64 result
      $('<img>')
        .attr('src', 'data:image/jpeg;base64,' + response.result)
        .attr('alt', 'User Image')
        .attr('id', 'merged')
        .attr('class', 'image')
        .appendTo($('#mergedID'));
    });
  }

  scanFace();
}

// when encodeIMG is run it will convert our imgFile variable into base64 and display it to page
function encodeIMG() {
  if ($('#fileIMG').prop('files')[0]) {
    var imgFile = $('#fileIMG').prop('files')[0];
    if (imgFile.size >= 2000000) {
      $('.error').text(
        'Your image is larger than 2mb! Please upload a smaller image.'
      );
    }
    var reader = new FileReader();
    reader.onloadend = function () {
      $('.file1').remove();
      $('<img>')
        .attr('src', reader.result)
        .attr('alt', 'User Image')
        .attr('id', 'preview1')
        .attr('class', 'file1')
        .appendTo($('.imgdisplay')); // displays image on site
      imgResult = reader.result; // base64 conversion result
      return imgResult;
    };
    reader.readAsDataURL(imgFile); // Takes the file and converts the data to base64
  }
}

function encodeTemplate() {
  if ($('#fileIMG2').prop('files')[0]) {
    var imgFile2 = $('#fileIMG2').prop('files')[0];
    if (imgFile2.size >= 2000000) {
      $('.error').text(
        'Your image is larger than 2mb! Please upload a smaller image.'
      );
    }
    var reader = new FileReader();
    reader.onloadend = function () {
      $('.file2').remove();
      $('<img>')
        .attr('src', reader.result)
        .attr('alt', 'User Image')
        .attr('id', 'preview2')
        .attr('class', 'file2')
        .appendTo($('.imgdisplay'));
      imgResult2 = reader.result;
      return imgResult2;
    };
    reader.readAsDataURL(imgFile2);
  }
}

$('#submitButton').on('click', function () {
  if ($('#imgURL').val() === '' || $('#imgURL2').val() === '') {
    $('.error').text('Please include two pictures!!');
  } else {
    doubleSearch($('#imgURL').val(), $('#imgURL2').val(), true);
  }
});

$('#fileSubmit').on('click', function () {
  if (
    $('#fileIMG').prop('files')[0] === undefined ||
    $('#fileIMG2').prop('files')[0] === undefined
  ) {
    $('.error').text('Please upload two pictures!');
  } else {
    doubleSearch();
  }
});

// when we upload a file, we encode it
$('#fileIMG').on('change', function () {
  $('.error').text('');
  $('.file1').remove();
  $('#merged').remove();
  encodeIMG();
});

$('#fileIMG2').on('change', function () {
  $('.error').text('');
  $('.file2').remove();
  $('#merged').remove();
  encodeTemplate();
});
