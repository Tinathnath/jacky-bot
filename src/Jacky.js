const Discord = require('discord.js');
const Config = require('../config');

const Commands = require('./commands/commands');
const CommandHelper = require('./commands/commandHelper');

module.exports = class Jacky {
    constructor(discordClient) {
        this.client = discordClient;
    }

    /**
     * Decides what to do with a message
     * @param {Message} message 
     */
    handleMessage(message) {
        if (message.content.startsWith(Config.delimiter))
            return this._handleCommandMessage(message);
        else if (message.mentions.users.has(this.client.user.id))
            return this._handleMentionnedMessage(message);
    }

    /**
     * Handles a command
     * @param {Message} message 
     */
    _handleCommandMessage(message) {
        let content = message.content.trim();
        let command = content.substr(Config.delimiter.length);
        let commandArgs = command.split(" ");
        let commandName = commandArgs.shift();

        if (Commands.hasOwnProperty(commandName))
            return Commands[commandName].run(message, commandArgs);
    }

    /**
     * Handles a message sent with @Jacky mentionned
     * @param {Message} message 
     */
    _handleMentionnedMessage(message) {
        let content = CommandHelper.removeMessageMentions(message.content, message.mentions).toLowerCase();
        content = content.trim();

        switch (content) {
            case "tg":
            case "ta gueule":
            case "🖕":
                message.reply(":middle_finger:");
                break;
            case ":wave:":
            case "👋":
            case "hello":
            case "salut":
            case "bonjour":
                message.reply("Hey ! :wave:");
                break;
        }
    }
}