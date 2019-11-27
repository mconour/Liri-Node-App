require("dotenv").config();

/*
==> variable for keys.js file to access required Spotify API keys (located in same root directory)
==> variables for required packages, which inclues Axios, Dotenv, FS to read/write, 
Spotify and Moment for converting event date for Bandsintown API
*/

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// variable for arguments to be entered by user in app
var userCommands = process.argv[2];

//console.log("userCommands: " + userCommands);

// use slice method to account for user's search, starting with index 3 position forth because search could have spaces

var userSearch = process.argv.slice(3).join(" ");

//console.log("userSearch: " + userSearch);

// using switch statement to execute code that's appropriate to the userCommands that's inputed from user 

function runLiri(userCommands, userSearch) {
    switch (userCommands) {
        case "spotify-this-song":
            getSpotify(userSearch);
            break;

        case "concert-this":
            getBandsInTown(userSearch);
            break;
        case "movie-this":
            getOMDB(userSearch);
            break;
        case "do-what-it-says":
            getRandom();
            break;

            // if userCommands is left blank, default message below will display

        default:
            console.log("You didn't say one of the magic commands. Please enter 'movie-this', 'concert-this', 'spotify-this-song' or 'do-what-it-says' to continue");
    }
}


// function to search Spotify
function getSpotify(songName) {
    // Variables for the secret ids for spotify
    var spotify = new Spotify(keys.spotify);
    //console.log("Spotify key: " + spotify);

    if (!songName) {
        songName = "The Sign";
    }

    //console.log("SongName if not a song name: " + songName);

    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log("Data for searched song: " + data.tracks.items[0]);

        // adding a line break for clarity of when search results begin
        console.log("=============================");
        
        //return artist(s)
        console.log("Artist(s) Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
        
        //return the song's name
        console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
        
        //return a preview link of the song from Spotify
        console.log("Song Preview Link: " + data.tracks.items[0].href + "\r\n");
        
        //return the album that the song is from
        console.log("Album: " + data.tracks.items[0].album.name + "\r\n");

        // append text to log.txt
        var logSong = "======Begin Spotify Log Entry======" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\n Preview Link: " + data.tracks.items[0].href + "\nAlbum Name: " + data.tracks.items[0].album.name + "\n======End Spotify Log Entry======" + "\n";

        fs.appendFile("log.txt", logSong, function (err) {
            if (err) throw err;
        });

        //logResults(data)
    });
}

// Bandsintown function

function getBandsInTown(artist) {

    var artist = userSearch;
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(bandQueryURL).then(
        function (response) {
            
            // line break added for neatness when search results start
            
            console.log("=============================");
            //console.log(response);
            console.log("Name of the venue: " + response.data[0].venue.name + "\r\n");
            console.log("Venue Location: " + response.data[0].venue.city + "\r\n");
            console.log("Date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");

            // append text into log.txt file
            var logConcert = "======Begin Concert Log Entry======" + "\nName of the musician: " + artist + "\nName of the venue: " + response.data[0].venue.name + "\nVenue location: " + response.data[0].venue.city + "\n Date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n======End Concert Log Entry======" + "\n";

            fs.appendFile("log.txt", logConcert, function (err) {
                if (err) throw err;
            });
            //logResults(response)
        });
}

// OMDb function

function getOMDB(movie) {
    
    //console.log("Movie: " + movie);
    
    // if user doesn't add movie, program will auto output data for "Crimes and Misdemeanors" film     
    
    if (!movie) {
        movie = "Crimes and Misdemeanors";
    }
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

       
    axios.request(movieQueryUrl).then(
        function (response) {           
          
            console.log("=============================");
            console.log("* Title: " + response.data.Title + "\r\n");
            console.log("* Year Released: " + response.data.Year + "\r\n");
            console.log("* IMDB Rating: " + response.data.imdbRating + "\r\n");
            console.log("* Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n");
            console.log("* Country Where Produced: " + response.data.Country + "\r\n");
            console.log("* Language: " + response.data.Language + "\r\n");
            console.log("* Plot: " + response.data.Plot + "\r\n");
            console.log("* Actors: " + response.data.Actors + "\r\n");

            // Log response;
            
            var logMovie = "======Begin Movie Log Entry======" + "\nMovie title: " + response.data.Title + "\nYear released: " + response.data.Year + "\nIMDB rating: " + response.data.imdbRating + "\nRotten Tomatoes rating: " + response.data.Ratings[1].Value + "\nCountry where produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n======End Movie Log Entry======" + "\n";

            fs.appendFile("log.txt", logMovie, function (err) {
                if (err) throw err;
            });
        });
}


/*
==> Take the text inside of random.txt 
and use it to call one of the app's commands, 
using FS Node package
*/



// Random function
function getRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);

        } else {
            console.log(data);

            var randomData = data.split(",");
            runLiri(randomData[0], randomData[1]);
        }
        //console.log("\r\n" + "testing: " + randomData[0] + randomData[1]);

    });
}

// this function is used to log results from other functions

function logResults(data) {
    fs.appendFile("log.txt", data, function (err) {
        if (err) throw err;
    });
}

runLiri(userCommands, userSearch);
