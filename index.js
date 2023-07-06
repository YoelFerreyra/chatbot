require('dotenv').config()
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { prefix, token } = require('./config.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', message => {
	//Receivin the message
	console.log(message.author.username);
	if (message.content === `${prefix}ping`) {
		message.channel.send('Pong.');
	} else if (message.content === `${prefix}beep`) {
		message.channel.send('Boop.');
	} else if (message.content === `${prefix}server`) {
		const channel = client.channels.cache.get('1124726095099469926/1124726096328392737');
		console.log(channel)
        message.channel.send(channel);
		const user = client.users.cache.get('<id>');
		console.log(user);
        message.user.send(user);
		//message.channel.send('<@123456789012345678> <@987654321098765432>');
	} else if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.icon_url}`);
	} else if (message.content === `${prefix}react`) {
		message.channel.send("Message reacting to.").then(function (sentMessage) {
			sentMessage.react('👍').catch(() => console.error('emoji failed to react.'));
			const filter = (reaction, user) => {
				return reaction.emoji.name === '👍';
			};
			message.awaitReactions(filter, { max: 2 })
				.then(collected => console.log(collected.size))
		});
	}
	 else if (message.content === `${prefix}daily`) {
		const embed = new MessageEmbed()
			.setAuthor(message.author.username, 'https://static.wikia.nocookie.net/nicos-nextbots/images/3/38/RaconSource.png/revision/latest/scale-to-width-down/250?cb=20230305095143')
			.setDescription(`¡Hola ${message.author.username}! ¿Te parece bien si hacemos ahora nuestros reportes de check-in? 👍`)
			.setColor('#0099ff')
			.addField("Usuario", `${message.author.username}#${message.author.discriminator}`)
			.addField("ID", message.author.id)
			.addField("Creación", message.author.createdAt)
			.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

		message.channel.send(embed)
	}
})



client.login(process.env.TOKEN);

