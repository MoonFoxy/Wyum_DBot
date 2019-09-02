const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    try {
        message.channel.send(Discord)
    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.dev);
        let errEmb = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`${err[0]}`)
            .setColor(config.color.red)
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        message.channel.send(errEmb);
        console.log(err.stack);
    };
};
module.exports.help = {
    name: 'test',
    aliases: ['тест']
}