const Discord = require('discord.js');
const util = require('util');
const Config = require('../../config');
const CommandHelper = require('./commandHelper');

module.exports = class SpotifyCommand {
    
    /**
     * Run command
     * @param {Message} message 
     * @param {string[]} args
     */
    static run(message, args){
        let webSpotifyBase = 'https://open.spotify.com';
        let spotifyUri = CommandHelper.removeMessageMentions(args.join(" "), message.mentions);
        let spotifyParts = args[0].split(":");
        
        if(spotifyParts.length < 2)
                return;

        if(spotifyParts[0] != "spotify")
            return;

        let embedUrl = util.format('%s/%s/%s', webSpotifyBase, spotifyParts[1], spotifyParts[2]);
        message.channel.send(embedUrl);   
    }
}