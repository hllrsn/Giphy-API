$(document).ready(function() {

//Gif topics array
var topics = ["Bird", "Cat", "Chicken", "Cow", "Crow", "Dog", "Ferret", "Fish", "Fox", "Fruit Bat", "Giraffe", "Goat", "Guinea Pig", "Hamster", "Hippo", "Horse", "Jellyfish", "Kangaroo", "Lizard", "Mouse", "Octopus", "Owl", "Panda Bear", "Penguin", "Pig", "Polar Bear", "Rabbit", "Raccoon", "Rat", "Seagull", "Seal", "Sheep", "Snake", "Turtle", "Whale"];

//Displays gif buttons
function displayGifButtons() {
    $("#gifButtons").empty();  //empties div to prevent duplication
    
    for (var i = 0; i < topics.length; i++) {
        var gifButton = $("<button>");  //creates buttons div
        
        gifButton.addClass("topic");
        gifButton.addClass("btn btn-primary");
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        
        $("#gifButtons").append(gifButton);  //appends buttons to div
    }
}

//Add new topic button
function addNewButton() {
    $("#addGif").on("click", function() {

    var topic = $("#topic-input").val().trim();
        if (topic === "") {
          return false;  //prevents user adding blank button
        }

    topics.push(topic);

    displayGifButtons();

        return false;
    });
}

//Remove last topic button
function removeLastButton() {
    $("removeGif").on("click", function() {

    topics.pop(topic);

    displayGifButtons();

        return false;
    });
}

//Displays gifs
function displayGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=d97Je8eoCxU39u78AvOsbbCA51fkD5PA&limit=10";  //search topic, key, limit 10 results

    $.ajax({
        url: queryURL,
        method: 'GET'
    })

    .done(function(response) {
        $("#gifDisplay").empty();  //empties div of previous results
        var results = response.data;  //displays gif results

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");  //creates gifs div
            gifDiv.addClass("gifDiv");

            var gifImage = $("<img>");  //finds gif image
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); //adds still image to src
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); //still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); //animated image
            gifImage.attr("data-state", "still"); //sets image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);  //appends image

            var gifRating = $("<p>").text("Rating: " + results[i].rating);  //finds gif rating
            gifDiv.append(gifRating);  //appends gif rating to gif

            $("#gifDisplay").prepend(gifDiv);  //prepends gifs to div
        }
    });
}

//Calling functions
displayGifButtons();
addNewButton();
removeLastButton();

//Document event listeners
$(document).on("click", ".topic", displayGifs);  //displays gifs related to topic on click

$(document).on("click", ".image", function() {  //animates gif on click
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});
});
