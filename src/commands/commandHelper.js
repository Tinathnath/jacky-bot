module.exports = class CommandHelper {

    /**
     * 
     * @param {String} message 
     * @param {MessageMentions} mentions 
     */
    static removeMessageMentions(message, mentions){
        mentions.users.array().forEach((mention) => {
            let mentionString = '<@'+ mention['id'] +'>';
            message = message.replace(mentionString, '');
        });

        return message;
    }
}