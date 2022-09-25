const { Client, GatewayIntentBits } = require('discord.js')
const express = require("express"); // middleware

require("dotenv").config();

const prefix = '-';
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.once('ready', () => {
  console.log('Anarchy Free Bot is online!');
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send('pong!');
  }
});

client.login(process.env.TOKEN);