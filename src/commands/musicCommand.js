const Discord = require('discord.js');
const util = require('util');
const path = require('path');
const fs = require('fs');
const Config = require('../../config');
const CommandHelper = require('./commandHelper');
const sounds = require('./sounds');

module.exports = class MusicCommand {

    /**
     * Run command
     * @param {Message} message 
     * @param {string[]} args
     */
    static run(message, args){
        if(!message.guild)
            return;
        
        if (!message.member.voiceChannel){
            message.reply("Hey du con, je peux pas te jouer de la musique si t'es pas dans un chan vocal ! :middle_finger: ");
            return;
        }
            
        let sound = CommandHelper.removeMessageMentions(args.join(" "), message.mentions);
        if(!sounds.hasOwnProperty(sound)){
            message.reply(util.format("Désolé, j'ai pas `%s` en réserve", sound));
            return;
        }
        
        message.member.voiceChannel.join()
        .then(voiceConnection => {
            let file = path.resolve('src/static/sound', sounds[sound]);
            if(!fs.existsSync(file)){
                message.channel.send(util.format("Erreur de lecture de `%s`", sound));
                console.error(util.format("File not found: %s", file));
                return;
            }

            let dispatcher = voiceConnection.playFile(file);
            dispatcher.setVolume(0.8);
            dispatcher.on('error', (e) => {
                console.error(e);
            });
        })
        .catch((error) => {
            message.channel.send("J'ai pas réussi à rejoindre le chan vocal :-/ ");
            console.error(error);
        });

    }
}