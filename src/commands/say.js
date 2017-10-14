require('discord.js');
const util = require('util');
const Config = require('../../config');
const CommandHelper = require('./commandHelper');

module.exports = class SayCommand {

    /**
     * 
     * @param {Message} message 
     * @param {string[]} args
     */
    static run(message, args){
        let whatToSay = CommandHelper.removeMessageMentions(args.join(" "), message.mentions);
        let shouldDelete = false;
        message.mentions.users.array().forEach((mention) => {
            message.channel.send(util.format('%s %s (de la part de %s)', mention, whatToSay, message.author));
            shouldDelete = true;
        });
        
        if(shouldDelete)
            message.delete();
    }
}