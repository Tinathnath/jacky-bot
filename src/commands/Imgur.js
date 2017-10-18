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
        imgur.requestGallery(search)
            .then((images) => {
                if(images.length < 1){
                    message.channel.send(util.format("Aucun résultat pour %s", search));
                    return;
                }
                let index = self.random(0, images.length -1 );
                let selected = images[index];
                let selectedImage = null;
                if(selected.is_album){
                    let idx = 0;
                    if(selected.images.length > 1)
                        idx = self.random(0, selected.images.length - 1);

                    selectedImage = selected.images[idx];
                }
                else{
                    selectedImage = selected;
                }

                if(self.checkNSFW(message, selectedImage)){
                    let embed = self.createEmbed(selectedImage);
                    if(embed)
                        message.channel.send("", embed);
                    else
                        message.channel.send(util.format("Erreur lors de la recherche de `%s`", search));      
                }
                else{
                    message.channel.send(util.format("L'image est NSFW. Veuillez activer l'option `nsfw` pour ce chan."));
                }
            }).catch((error) => {
                message.channel.send(util.format("Erreur lors de la recherche de `%s`", search));
                console.error(error);
            });
    }

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

    static checkNSFW(message, image){
        if(image.nsfw)
            return message.channel.nsfw;

        return true;
    }

    static random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}