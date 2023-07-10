const ping = (message) => {
    message.channel.send("Pong.");
}
const daily = (message, MessageEmbed) => {
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
const server = (message, MessageEmbed) => {
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

module.exports = {ping, daily, server, react}
