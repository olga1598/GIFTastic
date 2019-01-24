$(document).ready(function () {
    
    var topics = ["pasta", "burger", "cake", "ice cream", "soup", "salad"];
    console.log(topics);


var fetch = function() {
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

            var result = response.data;
            // console.log(result)
            // console.log("RESULT: ", result);

            for (var i = 0; i < result.length; i++) {
  
                let src = result[i].images.fixed_height.url;
                // console.log(src)
                // Creating and storing an image tag
                var topicImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                topicImage.attr("src", src ) ;
                let imageTag = topicImage[0];
                console.log(typeof(imageTag))
                
    
                // Prependng the  to the HTML page in the "#images" div
                $('#images').append(imageTag)
                // console.log(topicImage)
                // console.log(topics);

    
            }  

            

            });
            topicButtons();
    }); 
}

fetch()

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
    fetch()
};

topicButtons();

var addBtn = function() {
    var newTopic = $(".form-control").val();

    if(topics.indexOf(newTopic) === -1) {

    topics.push(newTopic);
    $('#usertopicadd').val('');
    topicButtons();


    }
}

$("#add").on("click", function(event) {
    event.preventDefault();

    addBtn()
});