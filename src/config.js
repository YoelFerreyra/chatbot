require("dotenv").config();
const { Client } = require("discord.js");
const client = new Client();
const { prefix } = require("../config.json");
const { ping, server, react, dailyUpdate, reportPr } = require("./controllers/index");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const command = message.content.slice(1);

  switch (command) {
    case "ping":
      ping(message);
      break;
    case "daily":
      dailyUpdate(message, client);
      break;
    case "react":
      react(message);
      break;
    case "server":
      server(message);
      break;
    case "report":
      reportPr(message, client);
      break;
    default:
  }
});

module.exports = { client };
