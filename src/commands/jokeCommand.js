const Discord = require('discord.js');
const util = require('util');
const Config = require('../../config');
const CommandHelper = require('./commandHelper');
let jokes = require('../modules/jokes');

module.exports = class JokeCommand{

    /**
     * Run command
     * @param {Message} message 
     * @param {string[]} args
     */
    static run(message, args){
        if(jokes == null || jokes.lenght < 1)
            return;

        let rand = CommandHelper.random(0, jokes.length - 1);
        let joke = jokes[rand];
        if(joke)
            message.channel.send(joke);
    }
}