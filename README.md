# LiriNode Application


```
Languagues: JavaScript  
Other: Node, Axios, Moment, APIs for Spotify, Bandsintown, and OMDb
```

When running the app in the command line, use the following to find your desired data: 

* node liri.js movie-this <*movie name here*>
* node liri.js spotify-this-song <*song name here*>
* node liri.js concert-this <*artist/band name here*>
* node liri.js do-what-it-says 


<img src="demo-video.gif" />


# LiriNode

LiriNode, similar to iPhone's Siri, is a Node.js application that provides a simple command-line interface for performing various tasks using external APIs and libraries. It allows you to search for information about songs, concerts, and movies, and even execute random commands specified in a text file. Below is a breakdown of its features and functionalities:

## Setup

Before using LiriNode, make sure to create a `.env` file in the root directory with the necessary API keys. You can utilize the `dotenv` package to manage these keys securely.

```javascript
require("dotenv").config();
```

## Features

LiriNode supports the following commands:

- `spotify-this-song`: Look up song information on Spotify.
- `concert-this`: Find upcoming concerts and events for a specific artist.
- `movie-this`: Retrieve details about a movie from OMDB.
- `do-what-it-says`: Execute random commands stored in the `random.txt` file.

## Usage

To use LiriNode, open your terminal and run the application with one of the supported commands. For example:

```shell
node liri.js spotify-this-song "Song Name"
```

Replace `"Song Name"` with the name of the song you want to search for.

## Command-line Interface

LiriNode uses a command-line interface where you can input your desired command and search parameters. The application processes these inputs and returns relevant information. It also provides a default message when no valid command is entered.

## Functionality

### Spotify Search

LiriNode can search for song information on Spotify. It uses the `node-spotify-api` to access Spotify's database and provides details such as the artist(s), song name, a preview link, and the album. It also logs the search results in a text file for reference.

### Concert Search

For concert searches, LiriNode queries the Bandsintown API to find upcoming events for a specified artist. It displays information about the venue, location, and date of the event. Just like with Spotify, the results are logged for later reference.

### Movie Search

Using the OMDB API, LiriNode can fetch details about a movie, including its title, release year, IMDB rating, Rotten Tomatoes rating, country of production, language, plot, and cast. The results are also logged in the text file.

### Random Command Execution

The "do-what-it-says" command reads a command and parameter from the `random.txt` file and executes it. This feature allows you to automate tasks based on pre-defined commands.

## Example Usage

Here's an example of using LiriNode:

```shell
node liri.js concert-this "Black Keys"
```

This command will look up upcoming concerts for Black Keys and display the relevant details.

<img src="demo-video.gif" />

If you encounter any issues or have questions, refer to the application's error handling for guidance.

Feel free to explore the world of LiriNode and make your life easier by retrieving information about songs, concerts, and movies with ease.

**Note:** Remember to replace `"liri.js"` with the actual filename of your script if it's different.

Happy LiriNode exploring! 🎵 🎥 🎤