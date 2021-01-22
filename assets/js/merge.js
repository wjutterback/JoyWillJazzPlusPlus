$(document).foundation()

const preview = document.getElementById('preview1');
const preview2 = document.getElementById('preview2');
const merged = document.getElementById('merged');
var imgResult = "";
var imgResult2 = "";

function doubleSearch(htmlsrc, htmlsrc2, htmlinput) {
  $('.error').text("");
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
      //source merged image from base64 result
      merged.src = "data:image/jpeg;base64," + response.result;
    });

  }

  scanFace();

};

// when encodeIMG is run it will convert our imgFile variable into base64 and display it to page
function encodeIMG() {
  var imgFile = $('#fileIMG').prop('files')[0];
  if (imgFile.size >= 2000000) {
    $('.error').text("Your image is larger than 2mb! Please upload a smaller image.")
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
    $('.error').text("Your image is larger than 2mb! Please upload a smaller image.")
  }
  var reader = new FileReader();
  reader.onloadend = function () {
    preview2.src = reader.result;
    imgResult2 = reader.result;
    return imgResult2;
  }
  reader.readAsDataURL(imgFile2)
}

$("#submitButton").on("click", function () {
  if ($('#imgURL').val() === "" || $('#imgURL2').val() === "") {
    $('.error').text("Please include two pictures!!")
  } else {
    doubleSearch($('#imgURL').val(), $('#imgURL2').val(), true)
  }
});

$("#fileSubmit").on("click", function () {
  if ($('#fileIMG').prop('files')[0] === undefined || $('#fileIMG2').prop('files')[0] === undefined) {
    $('.error').text("Please upload two pictures!");
  } else {
    doubleSearch()
  }
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