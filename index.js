console.log('Starting Jacky...');

const Config = require('./config')
const Discord = require('discord.js')
const Jacky = require('./src/Jacky');

const client = new Discord.Client();
const bot = new Jacky(client);

client.on('ready', () => {
    console.log("Connected to Discord");
    console.log(`Connected as ${client.user.tag}`);
});

client.on('message', (msg) => {
    if(msg.author.username != client.user.username){
        try {
            return bot.handleMessage(msg);
        }
        catch(e){
            console.error(e);
        }
    }
    
    return;
});

console.log("Connecting to Discord...");
client.login(Config.DISCORD_TOKEN);