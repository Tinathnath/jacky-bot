const Discord = require('discord.js');
const Config = require('../config');

let SayCommand = require('./commands/say');

module.exports = class Jacky {
    constructor(discordClient){
        this.client = discordClient;
    }

    /**
     * Decides what to do with a message
     * @param {Message} message 
     */
    handleMessage(message){
        if(message.content.startsWith(Config.delimiter))
            return this._handleCommandMessage(message);
        else if(message.mentions.users.has(this.client.user.id))
            return this._handleMentionnedMessage(message);
    }

    /**
     * Handles a command
     * @param {Message} message 
     */
    _handleCommandMessage(message){
        let content = message.content.trim();
        let command = content.substr(Config.delimiter.length);
        let commandArgs = command.split(" ");
        let commandName = commandArgs.shift();
        
        switch(commandName){
            case "say":
                SayCommand.run(message, commandArgs);
            break;
        }
    }

    /**
     * Handles a message sent with @Jacky mentionned
     * @param {Message} message 
     */
    _handleMentionnedMessage(message){

    }
}