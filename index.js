console.log('Starting Jacky...');

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/src/static'));
app.set('views', path.join(__dirname, '/src/static/views'));

const Config = require('./config')
const Discord = require('discord.js')
const Jacky = require('./src/Jacky');

const client = new Discord.Client();
const bot = new Jacky(client);

app.get('/', (request, response) => {
    response.render('index');
});

app.listen(port, () => {
    console.log('Front-end server started. Listening on http://localhost:' + port);
});

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