require("dotenv").config();
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const { prefix } = require("./config.json");
const { ping, daily, server, react, collector } = require('./src/controllers/index');

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const command = message.content.slice(1);

  switch (command) {
    case "ping":
      ping(message)
      break;
    case "daily":
      daily(message)
      break;
    case "react":
      react(message)
      break;
    case "server":
      server(message)
      break;
    case "collector":
      collector(message)
      break;
    default:
  }
});

client.login(process.env.TOKEN);
