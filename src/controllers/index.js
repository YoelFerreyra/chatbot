require("dotenv").config();
const { MessageEmbed, MessageCollector } = require("discord.js");
const questions = require("./questions/questionsDaily.json");
const questionsPR = require("./questions/questionsReportPR.json");

const ping = (message) => {
  message.channel.send("Pong.");
};

const server = (message) => {
  let server = message.guild;

  const embed2 = new MessageEmbed()
    .setThumbnail(server.iconURL())
    .setAuthor(server.name, server.iconURL())
    .addField("ID", server.id, true)
    .addField("Region", server.region, true)
    .addField("Creado el", server.joinedAt.toDateString(), true)
    .addField(
      "Dueño del Servidor",
      server.owner.user.tag + "(" + server.owner.user.id + ")",
      true
    )
    .addField("Miembros", server.memberCount, true)
    .addField("Roles", server.roles.size, true)
    .setColor(0x66b3ff);

  message.channel.send(embed2);
};

const react = (message) => {
  message.channel.send("Message reacting to.").then(function (sentMessage) {
    sentMessage
      .react("👍")
      .catch(() => console.error("emoji failed to react."));
    const filter = (reaction, user) => {
      return reaction.emoji.name === "👍";
    };
    message
      .awaitReactions(filter, { max: 2 })
      .then((collected) => console.log(collected.size));
  });
};

const dailyUpdate = (message, client) => {
  let counter = 0;

  const filter = (m) => m.author.id === message.author.id;

  const collector = new MessageCollector(message.channel, filter, {
    max: questions.length,
    time: 1000 * 60, //30s for response the question
  });

  message.channel.send(questions[counter++]);
  collector.on("collect", (m) => {
    if (counter < questions.length) {
      m.channel.send(questions[counter++]);
    }
  });

  collector.on("end", (collected) => {
    console.log(`Collected ${collected.size} messages`);

    let response = [];
    collected.forEach((value) => {
      response.push(value.content);
    });

    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(
        `Acabo de recibir un nuevo reporte de ${message.author.username} para el check-in Daily update. Dale una mirada: `
      )
      .setColor("#0099ff")
      .addField("Usuario", `${message.author.username}`)
      .addField(questions[0], response[0])
      .addField(questions[1], response[1])
      .addField(questions[2], response[2])
      .addField(questions[3], response[3])
      .addField("Creación", message.author.createdAt)
      .setFooter("Novabot ", "https://i.imgur.com/wSTFkRM.png");

    const channel = client.channels.cache.get("id");
    client.channels.cache.get(process.env.GENERAL_CHANNEL).send(embed);
    console.log(channel);
  });
};

const reportPr = (message, client) => {
  let counter = 0;

  const filter = (m) => m.author.id === message.author.id;

  const collector = new MessageCollector(message.channel, filter, {
    max: questionsPR.length,
    time: 1000 * 60, //30s for response the question
  });

  message.channel.send(questionsPR[counter++]);
  collector.on("collect", (m) => {
    if (counter < questionsPR.length) {
      m.channel.send(questionsPR[counter++]);
    }
  });

  collector.on("end", (collected) => {
    console.log(`Collected ${collected.size} messages`);

    let response = [];
    collected.forEach((value) => {
      response.push(value.content);
    });

    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(
        `Acabo de recibir un nuevo reporte de ${message.author.username} para el reporte de PR. Dale una mirada: `
      )
      .setColor("#0099ff")
      .addField("Usuario", `${message.author.username}`)
      .addField(questionsPR[0], response[0])
      .addField(questionsPR[1], response[1])
      .addField(questionsPR[2], response[2])
      .addField(questionsPR[3], response[3])
      .addField(questionsPR[4], response[4])
      .addField("Creación", message.author.createdAt)
      .setFooter("Novasoft ", "https://i.imgur.com/wSTFkRM.png");

    const channel = client.channels.cache.get("id");
    client.channels.cache.get(process.env.GENERAL_CHANNEL).send(embed);
    console.log(channel);
  });
};

module.exports = { ping, dailyUpdate, server, react, reportPr };
