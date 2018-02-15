// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
require("dotenv").config();


var action = process.argv[2];
var value = process.argv[3];
var Twitter = require('twitter');
var Spotify = require('node-spotify-api')
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (process.argv[2] == "my-tweets"){

var params = {
       screen_name: 'ShitPetitgout',
       count: 20
     }
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
      console.log(tweets[i].created_at);
    }
  }
});
}

if(process.argv[2] == "spotify-this"){
    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
     
      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].name);
      console.log(data.tracks.items[0].album.name);
      console.log(data.tracks.items[0].preview_url);
      });

}


 



if (process.argv[2]=="movie-this"){

  var getMovie= function(movieName){
  
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
  
  
  request(queryUrl, function(error, response, body) {
   
      if (!error && response.statusCode === 200) {
        var omdbData=JSON.parse(body);
        
           console.log("Movie Title: " + JSON.parse(body).Title);
           console.log("Release Year: " + JSON.parse(body).Year);
           console.log("OMDBRating: " + JSON.parse(body).Rated);
           console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
           console.log("Country: " + JSON.parse(body).Country);
           console.log("Language: " + JSON.parse(body).Language);
           console.log("Plot: " + JSON.parse(body).Plot);
           console.log("Actors: " + JSON.parse(body).Actors);
  
           getMovie(process.argv[2]);
         }
        });
    };
  };
  
  
  
  if (process.argv[2]=="do-what-it-says"){
  
   fs.readFile("random.txt", "utf8", function(error, data){
       if (error) {
       return console.log(error);
       console.log(data);
  
      }
    });
  };



