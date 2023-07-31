const {MessageEmbed, MessageCollector} = require('discord.js');
const questions = require('./questions/questionsDaily.json');

const ping = (message) => {
    message.channel.send("Pong.");
}
const daily = (message) => {
    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(
          `¡Hola ${message.author.username}! ¿Te parece bien si hacemos ahora nuestros reportes de check-in? 👍`
        )
        .setColor("#0099ff")
        .addField(
          "Usuario",
          `${message.author.username}#${message.author.discriminator}`
        )
        .addField("ID", message.author.id)
        .addField("Creación", message.author.createdAt)
        .setFooter("Some footer text here", "https://i.imgur.com/wSTFkRM.png");

      message.channel.send(embed);
}
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
}
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
}

const collector = (message) => {

  let counter = 0;

  const filter = m => m.author.id === message.author.id;

  const collector = new MessageCollector(message.channel, filter,  {
    max: questions.length,
    time: 1000 * 30 //15s for response the question
  });

  message.channel.send(questions[counter++]);
  collector.on('collect', m  => {
    if (counter < questions.length) {
      m.channel.send(questions[counter++])
    }
  });

  collector.on('end', collected  => {
    console.log(`Collected ${collected.size} messages`);

    let counter = 0;
    let response = [];
    collected.forEach((value) => {
      response.push(value.content);
    });
    
    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(
          `¡Hola ${message.author.username}! ¿Te parece bien si hacemos ahora nuestros reportes de check-in? 👍`
        )
        .setColor("#0099ff")
        .addField(
          "Usuario",
          `${message.author.username}#${message.author.discriminator}`
        )
        .addField(questions[0], response[0])
        .addField(questions[1], response[1])
        .addField(questions[2], response[2])
        .addField("Creación", message.author.createdAt)
        .setFooter("Some footer text here", "https://i.imgur.com/wSTFkRM.png");

      message.channel.send(embed);
  });
}

/*
const collector = (message) => {
  // Filters define what kinds of messages should be collected
  let filter = (message) => !message.author.bot;
  // Options define how long the collector should remain open
  //    or the max number of messages it will collect
  let options = {
    max: 2,
    time: 15000
  };
  let collector = message.channel.createMessageCollector(filter, options);

  // The 'collect' event will fire whenever the collector receives input
  collector.on('collect', (m) => {
    console.log(`Collected ${m.content}`);
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(
        `¡Hola ${message.author.username}! ¿Te parece bien si hacemos ahora nuestros reportes de check-in? 👍`
      )
      .setColor("#0099ff")
      .addField(
        "Usuario",
        `${message.author.username}#${message.author.discriminator}`
      )
      .addField("Tu color favorito es", m.content)
      .addField("Creación", message.author.createdAt)
      .setFooter("Some footer text here", "https://i.imgur.com/wSTFkRM.png");

    message.channel.send(embed);
  });

  // The 'end' event will fire when the collector is finished.
  collector.on('end', (collected) => {
    console.log(`Collected ${collected.size} items`);
  });

  message.reply('What is your favorite color?');
}
*/

module.exports = {ping, daily, server, react, collector}
