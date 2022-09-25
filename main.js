const { Client, GatewayIntentBits } = require('discord.js')
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
})

client.once('ready', () => {
  console.log('Anarchy Free Bot is online!');
});

client.login(process.env.TOKEN);