const Discord = require('discord.js');

module.exports = class HelpCommand {
    
    /**
     * Sends help page
     * @param {Message} message 
     * @param {string[]} args 
     */
    static run(message, args){
        let helpMessage = `
\`\`\`
Commandes de Jacky
******************
?say     : Fait dire à Jacky le message que vous lui demandez aux personnes mentionnées: ?say coucou @user1 @user2
?spotify : Envoie un morceau avec mini-lecteur depuis une URI Spotify (spotify:track:id): ?spotify spotify:track:2R7858bg0GHuBBxjTyOL7N
?get     : Recherche une image sur Reddit (bot-à-putes): ?get cat
?help    : Affiche l'aide
\`\`\``;
        message.reply(helpMessage);
    }
}