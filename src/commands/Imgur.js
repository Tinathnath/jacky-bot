const Discord = require('discord.js');
const util = require('util');
const Config = require('../../config');
const CommandHelper = require('./commandHelper');
const ImgurModule = require('../modules/ImgurModule');

module.exports = class ImgurCommand {
    /**
     * Run command
     * @param {Message} message 
     * @param {string[]} args
     */
    static run(message, args){
        let search = CommandHelper.removeMessageMentions(args.join(" "), message.mentions);
        let imgur = new ImgurModule(Config.IMGUR_APP_ID);
        imgur.requestGallery(search);
    }
}