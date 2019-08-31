const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.other.avatar + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noUser = alert.noUser;

        let usr = message.mentions.users.first() ? message.mentions.users.first() : message.author;

        let wrong = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor(config.color.red)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (!usr) {
            wrong.setDescription(noUser);
            return message.channel.send(wrong);
        };

        let bembed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setColor(config.color.yellow)
            .setTitle(`${msgs[0]} ${usr.username}!`)
            .setImage(usr.avatarURL)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();
        message.channel.send(bembed);

    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin);
        let errEmb = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
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
    name: 'avatar',
    aliases: ['аватар']
};