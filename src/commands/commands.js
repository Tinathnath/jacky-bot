let SayCommand = require('./say');
let HelpCommand = require('./help');
let SpotifyCommand = require('./spotify');
let ImgurCommand = require('./Imgur');
let JokeCommand = require('./jokeCommand');

module.exports = {
    "say" : SayCommand,
    "help" : HelpCommand,
    "spotify" : SpotifyCommand,
    "get" : ImgurCommand,
    "joke" : JokeCommand
}