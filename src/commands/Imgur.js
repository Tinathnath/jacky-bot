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
    static run(message, args) {
        let self = this;
        let search = CommandHelper.removeMessageMentions(args.join(" "), message.mentions);
        let imgur = new ImgurModule(Config.IMGUR_APP_ID);
        imgur.requestGallery(encodeURIComponent(search))
            .then((images) => {
                //no result
                if(images.length < 1){
                    message.channel.send(util.format("J'ai rien trouvé pour `%s`", search));
                    return;
                }

                //pick a random image in the results
                let index = CommandHelper.random(0, images.length -1 );
                let selected = images[index];
                let selectedImage = null;

                if(selected.is_album){
                    let idx = 0;
                    if(selected.images.length > 1)
                        idx = CommandHelper.random(0, selected.images.length - 1);

                    selectedImage = selected.images[idx];
                }
                else{
                    selectedImage = selected;
                }

                //check NSFW and create embed response
                if(self.checkNSFW(message.channel, selectedImage)){
                    let embed = self.createEmbed(selectedImage);
                    if(embed)
                        message.channel.send("", embed);
                    else
                        message.channel.send(util.format("Erreur lors de la recherche de `%s`", search));      
                }
                else{
                    message.channel.send(util.format("L'image est NSFW mais pas le chan, sois cohérent putain !"));
                }
            }).catch((error) => {
                message.channel.send(util.format("Erreur lors de la recherche de `%s`", search));
                console.error(error);
            });
    }

    /**
     * Creates a Discord.RichEmbed with the image to send
     * @param {Object} image 
     */
    static createEmbed(image){
        let embed = new Discord.RichEmbed();
        embed.setImage(image.link);
        embed.setURL(image.link);
        if(image.title)
            embed.setTitle(image.title);

        if(image.description)
            embed.setDescription(image.description);

        return embed;
    }

    /**
     * Checks the image can be sent if NSFW
     * @param {Discord.Channel} channel 
     * @param {Object} image 
     */
    static checkNSFW(channel, image){
        if(image.nsfw)
            return channel.nsfw;

        return true;
    }
}