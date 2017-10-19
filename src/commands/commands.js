let SayCommand = require('./say');
let HelpCommand = require('./help');
let SpotifyCommand = require('./spotify');
let ImgurCommand = require('./Imgur');
let JokeCommand = require('./jokeCommand');
let SoundCommand = require('./musicCommand');

module.exports = {
    "say" : SayCommand,
    "help" : HelpCommand,
    "spotify" : SpotifyCommand,
    "get" : ImgurCommand,
    "joke" : JokeCommand,
    "play" : SoundCommand,
    "pl" : SoundCommand
}