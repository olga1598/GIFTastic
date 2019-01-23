$(document).ready(function () {
    
    var topics = ["pasta", "burger", "cake", "ice cream", "soup", "salad"];
    var topicImage;
    console.log(topics);

    function topicButtons() {
        // Deleting the movie buttons prior to adding new movie buttons, so will not repeat
        $(".topicbuttons").empty();

        for (var i = 0; i < topics.length; i++) {
            // Adding the empty HTML tag <button></button>
            var buttonTop = $("<button>");
            // Adding a data-attribute with a value of the movie at index i
            buttonTop.attr("data-food", topics[i]);
            // Adding a class name to all topic buttons
            buttonTop.addClass("buttons");
            // Adding the names to all buttons acording to the topics
            buttonTop.text(topics[i]);
            // Adding the buttons to HTML
            $(".topicbuttons").append(buttonTop);
        }
        $("#images").empty();
        
    };


    topicButtons();

    $("#add").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        // Grabbing the user input text from search box
        var newTopic = $(".form-control").val();
        for (var i = 0; i < topics.length; i++) {
            if (newTopic == topics[i]){
                alert("Topic " + newTopic + " already exists.");
                return;
            } 
        }    
        // The new topic theme added to our array
        topics.push(newTopic);
        // Calling our topicButtons funcion to creatr new button
        topicButtons();
    });

    //Adding click event listener to the buttons
    $(".buttons").on("click", function() {

        // In this case, the "this" keyword refers to the button that was clicked
        var topic = $(this).attr("data-food");

        // Constructing a URL to search Giphy for the chosen topic   
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
  
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) { // After the data from the AJAX request comes back

            //Storing the data from ajax request in the result variable
            var result = response.data;
            console.log("RESULT: ", result);

            //Looping through each result item
            for (var i = 0; i < result.length; i++) {

                //Create and store div tag
                var resultsDiv = $("<div>");

                //Crerating a paragraph tag with the item's rating 
                var rating = $("<p>").text("Rating: " + result[i].rating);
                console.log(rating);

                // Creating and storing an image tag
                topicImage = $("<img>");
                //Creating an ID for each image
                topicImage.attr("id", i);
                //Creating one class for all images
                topicImage.addClass("recievedImgs");
                // Setting the src attribute of the image to a property pulled off the result item
                topicImage.attr("src", result[i].images.fixed_height_still.url);
                topicImage.attr("data-still", result[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", result[i].images.fixed_height.url);
                topicImage.attr("data-now", "still");

                //Appending a paragraph and image to the resultsDiv 
                resultsDiv.append(topicImage);
                resultsDiv.append(rating);

                // Appending the resultsDiv to the HTML page in the "#images" div
                $("#images").append(resultsDiv);
    
            } 
        });
        $("#images").empty();
    });
       
    //$("#images .recievedImgs").on("click", function(){
    //$(".recievedImgs").on("click", function(){ 
    $("#images").on("click", ".recievedImgs", function(){ 
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var objImg = $(this).attr("data-now"); //this referes to the image that was clicked
        //Checking if the image is still and switching for animate and opposite
        if (objImg === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-now", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-now", "still");

        }
    });
   
    






});