var movies = ["The Nightmare before Christmas", "American Psycho", "The Conjuring", "Dracula", "The Exorcist", "IT", "Zombieland", "The Bride of Frankenstein", "The Texas Chainsaw Massacre", "Child's Play"];


//This function generates buttons for each movie inside the array
function renderButtons() {
	$('#halloweenButtons').empty();
  for(i = 0; i < movies.length; i++) {
     var a = $('<button>');
     a.addClass('movie');
     a.attr('data-type', movies[i]);
     a.text(movies[i]);
     $('#halloweenButtons').append(a);
    }
   }
 	
//Populates the gifs 
$('#halloweenButtons').on("click", '.movie', function(){
	$("#movieGiphys").empty();
	var movie = $(this).text();
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	var results = response.data;
        	for(var i=0; i<results.length; i++){
        	var giphyDiv = $("<div class=movie>");
        	var rating = results[i].rating;        	
        	var ratingDiv = $("<p>").text("Rating:" + rating);
        	var giphyAnimate = results[i].images.fixed_height.url;
        	var giphyStill = results[i].images.fixed_height_still.url;
        	var giphyImage = $('<img>');
        	giphyImage.attr('src', giphyAnimate);
        	giphyImage.attr('data-still', giphyStill);
        	giphyImage.attr('data-animate', giphyAnimate);
        	giphyImage.attr('data-state', giphyStill);
        	giphyDiv.append(giphyImage);
        	giphyDiv.append(ratingDiv);
        	$('#movieGiphys').append(giphyDiv);
        	}

    });
      
})

//This event handler changes the images from static to animated
$(document).on('click', 'giphyImage', function(){
    var state = $(this).data('state'); 
    
    if (state == 'giphyStill'){
        $(this).attr('src', $(this).data('giphyAnimate'));
        data('state', 'giphyAnimate');
    }else{
        $(this).attr('src', $(this).data('giphyStill'));
        data('state', 'giphyStill');
    };
});


//This function handles when the movie button is clicked
//Takes input from the textbox
//Then adds it to the array
$("#addMovie").on("click", function() {
	event.preventDefault();
	movie = $('#halloweenInput').eq(0).val();
	movies.push(movie);
	renderButtons();

});


renderButtons();