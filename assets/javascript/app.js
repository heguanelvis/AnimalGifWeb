//Get jQuery to start:
$(document).ready(function () {


$("#submit-button").on("click", function(){
  var animalButton = $("<button>").addClass("btn btn-light btn-lg animal-button")
  var animalName = $("#animal-name-input").val().trim()
  console.log(animalName)
  animalButton.html(animalName).attr("data-animal",animalName)
  $("#button-area").append(animalButton)

})


$(document.body).on("click",".animal-button", function(){

  var animal = $(this).attr("data-animal");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=FPeP8rsV9Cb5XB79l42Cy0XI5brpKQeO&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(queryURL);
    console.log(response);

    var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>").addClass("animal-gif-div");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").addClass("rating-text").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");

            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height_still.url).addClass("animal-gif-image");
            
            // Add data-still, data-animate and data-state
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state","still")

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gif-area").prepend(animalDiv);
          }

  })

})

$(document.body).on("click",".animal-gif-image", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});





});