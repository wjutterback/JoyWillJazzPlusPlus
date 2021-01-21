$(document).foundation()

const preview = document.getElementById('preview1');
const merged = document.getElementById('merged');
var imgResult = "";
var imgResult2 = "";

function doubleSearch(htmlsrc, htmlsrc2, htmlinput) {
  $('.error').text("");
  $('#message').empty();
  $('.resultdisplay h1').text('');
  $('.erase').empty();
  var fileList = $('input').prop('files'); // the array, not used just as a reminder

  function scanFace() {

    if (htmlinput === true) {
      preview.src = htmlsrc;
      preview2.src = htmlsrc2;
      var error = () => $('.error').text("There was an error with your picture! It was larger than 2MB!");
      var data = {
        api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
        api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
        template_url: htmlsrc,
        merge_url: htmlsrc2,
      }
    } else {
      var data = {
        api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
        api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
        template_base64: imgResult,
        merge_base64: imgResult2,
      }
    }
    var queryURL = 'https://api-us.faceplusplus.com/imagepp/v1/mergeface'
    $.ajax({
      url: queryURL,
      method: 'POST',
      data: data,
      error: error,
    }).then(function (response) {
      console.log(response);
      merged.src = "data:image/jpeg;base64," + response.result;
    });

  }

  scanFace();

};

// when encodeIMG is run it will convert our imgFile variable into base64 and display it to page
function encodeIMG() {
  var imgFile = $('#fileIMG').prop('files')[0];
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

function encodeTemplate() {
  var imgFile2 = $('#fileIMG2').prop('files')[0];
  if (imgFile2.size >= 2000000) {
    $('.error2').text("Your second image is larger than 2mb!")
  }
  var reader = new FileReader();
  reader.onloadend = function () {
    preview2.src = reader.result;
    imgResult2 = reader.result;
    console.log(imgResult2);
    return imgResult2;
  }
  reader.readAsDataURL(imgFile2)
}

$("#submitButton").on("click", function () {
  doubleSearch($('#imgURL').val(), $('#imgURL2').val(), true)
});

$("#fileSubmit").on("click", function () {
  doubleSearch()
});

// when we upload a file, we encode it
$('#fileIMG').on("change", function () {
  $('.error').text("");
  encodeIMG();
});

$('#fileIMG2').on("change", function () {
  $('.error').text("");
  encodeTemplate();
});

// let image = new Image();
// image.src = "ellie.jpg"
// let canvas = document.querySelector('canvas');
// canvas.width = image.naturalWidth;
// canvas.height = image.naturalHeight;
// console.log(canvas)
// var templateFile = "";

// let context = canvas.getContext('2d');

// context.drawImage(image, 0, 0);
// canvas.toBlob(function (blob) {
//   URL.createObjectURL(blob);
//   console.log(URL.createObjectURL(blob));
// }, 'image/png');

// var reader = new FileReader();
// reader.onloadend = function () {
//   templateResult = reader.result; // base64 conversion result 
//   console.log(reader.result);
//   URL.revokeObjectURL(templateFile);
//   return templateFile;
// }
// reader.readAsDataURL(templateFile)