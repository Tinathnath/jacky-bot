module.exports = class CommandHelper {

    /**
     * Returns a message content without users' mentions
     * @param {String} message 
     * @param {MessageMentions} mentions 
     */
    static removeMessageMentions(message, mentions) {
        mentions.users.array().forEach((mention) => {
            let mentionString = '<@' + mention['id'] + '>';
            message = message.replace(mentionString, '');
        });

        return message;
    }

    /**
     * Generates a random number between min and max
     * @param {integer} min 
     * @param {integer} max 
     */
    static random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}