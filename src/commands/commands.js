let SayCommand = require('./say');
let HelpCommand = require('./help');
let SpotifyCommand = require('./spotify');

module.exports = {
    "say" : SayCommand,
    "help" : HelpCommand,
    "spotify" : SpotifyCommand
}