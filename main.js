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
  // Ignore messages from bot itself
  if (message.author.bot) {
    return;
  }

  const msg = message.content;

  if (!message.content.startsWith(prefix)) {
    // const ref = {
    //   '.-': 'a',
    //   '-...': 'b',
    //   '-.-.': 'c',
    //   '-..': 'd',
    //   '.': 'e',
    //   '..-.': 'f',
    //   '--.': 'g',
    //   '....': 'h',
    //   '..': 'i',
    //   '.---': 'j',
    //   '-.-': 'k',
    //   '.-..': 'l',
    //   '--': 'm',
    //   '-.': 'n',
    //   '---': 'o',
    //   '.--.': 'p',
    //   '--.-': 'q',
    //   '.-.': 'r',
    //   '...': 's',
    //   '-': 't',
    //   '..-': 'u',
    //   '...-': 'v',
    //   '.--': 'w',
    //   '-..-': 'x',
    //   '-.--': 'y',
    //   '--..': 'z',
    //   '.----': '1',
    //   '..---': '2',
    //   '...--': '3',
    //   '....-': '4',
    //   '.....': '5',
    //   '-....': '6',
    //   '--...': '7',
    //   '---..': '8',
    //   '----.': '9',
    //   '-----': '0',
    // };

    // let decoded = msg;

    // for (const key of Object.keys(ref).sort((a, b) => b.length - a.length)) {
    //   decoded = decoded.replaceAll(key, ref[key]);
    // }

    // if (msg !== decoded) {
    //   message.channel.send("@" + message.author.username + " meant to say:\n```\n" + decoded + "\n```");
    // }

    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    let msg = 'List of available commands:\n';
    msg += '```\n';
    msg += '-ping\n';
    msg += '-hi\n';
    msg += '-rng <integer>\n';
    msg += '```';

    message.channel.send(msg);
  }
  if (command === 'ping') {
    message.channel.send('pong!');
  }
  if (command === 'hi') {
    message.channel.send('hello!');
  }
  if (command === 'rng') {
    const arg1 = args.shift();
    const n = parseInt(arg1);

    if (!Number.isNaN(n)) {
      message.channel.send((Math.floor(Math.random() * n) + 1).toString());
    } else {
      message.channel.send("Usage: -rng <integer>");
    }
  }
});

client.login(process.env.TOKEN);