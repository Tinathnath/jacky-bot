require('discord.js');
const Config = require('../config');

let SayCommand = require('./commands/say');

module.exports = class Jacky {
    constructor(discordClient){
        this.client = discordClient;
    }

    /**
     * @param {Message} message 
     */
    handleMessage(message){
        if(message.content.startsWith(Config.delimiter))
            return this.handleCommandMessage(message);
    }

    /**
     * 
     * @param {Message} message 
     */
    handleCommandMessage(message){
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
}