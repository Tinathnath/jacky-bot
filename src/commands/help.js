const Discord = require('discord.js');
const sounds = require('./sounds');

module.exports = class HelpCommand {
    
    /**
     * Sends help page
     * @param {Message} message 
     * @param {string[]} args 
     */
    static run(message, args){
        let soundNames = Object.keys(sounds);
        let soundNamesString = soundNames.join(" | ");
        let helpMessage = `
\`\`\`
Commandes de Jacky
******************
?say     : J'envoie un message à quelqu'un pour toi (s'pèce de lâche): ?say coucou @user1 @user2
?spotify : Envoie le mini-lecteur depuis une URI Spotify (spotify:track:id): ?spotify spotify:track:2R7858bg0GHuBBxjTyOL7N
?get     : Recherche une image sur Reddit (bot-à-putes): ?get cat
?joke    : Raconte une blague (Attention: haut niveau)
?help    : Affiche l'aide

******************
Jacky DJ, fais péter le soooon !
La commande ?play (ou ?pl) fait de la musique, essaye un de ceux là:
`+ soundNamesString +`
\`\`\``;
        message.reply(helpMessage);
    }
}