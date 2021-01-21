$(document).foundation()

const preview = document.getElementById('preview1');

var imgResult = "";

function doubleSearch(htmlsrc, htmlinput) {
    $('.error').text("");
    $('#clooneyMessage').text("");
    $('.resultdisplay h1').text('');
    $('.erase').empty();
    var fileList = $('input').prop('files'); // the array, not used just as a reminder

    function scanFace() {

        if (htmlinput === true) {
            preview.src = htmlsrc;
            imgResult = htmlsrc;
            var error = () => $('.error').text("There was an error with your picture! It was larger than 2MB!");
            var data = {
                api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
                api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
                image_url1: htmlsrc,
                image_url2: "https://i.pinimg.com/originals/d1/88/98/d18898c13240578f2d6aaf8c909234bb.jpg",
            }
        } else {
            var data = {
                api_key: "CKjT0AMrUWohOGp31Z91LRwt5wLh9frE",
                api_secret: "u-ZntJ_4-YXqxAQ7kKiLK5PVsy784IIt",
                image_base64_1: imgResult,
                image_url2: "https://i.pinimg.com/originals/d1/88/98/d18898c13240578f2d6aaf8c909234bb.jpg",
            }
        }
        var queryURL = 'https://api-us.faceplusplus.com/facepp/v3/compare'
        $.ajax({
            url: queryURL,
            method: 'POST',
            data: data,
            error: error,
        }).then(function (response) {
            console.log(response);
            console.log(response.confidence);

            var similarFace = response.confidence;

            if (similarFace === undefined) {
                $('<div>').text('Your picture was unable to be scanned.').appendTo($('#clooneyMessage'));
            }

            if (similarFace === 0 ) {
            $('<div>').text('You do not look like George Clooney at all!').appendTo($('#clooneyMessage'));
            }

            if (similarFace >= 1 && similarFace <= 25) {
                $('<div>').text('You do not really look like George Clooney!').appendTo($('#clooneyMessage'));
                }
    

            if (similarFace >= 25 && similarFace <= 45) {
            $('<div>').text('You look a bit like George Clooney!').appendTo($('#clooneyMessage'));
            }


            if (similarFace >= 45 && similarFace <= 65) {
            $('<div>').text('You look sort of like George Clooney!').appendTo($('#clooneyMessage'));
            }


            if (similarFace >= 65 && similarFace <= 85) {
            $('<div>').text('You have many similiar features to George Clooney!').appendTo($('#clooneyMessage'));
            }

            if (similarFace >= 85) {
            $('<div>').text('You look a lot like George Clooney!').appendTo($('#clooneyMessage'));
            }        
        });

    }

    scanFace();

};

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