//Завершено

const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.info.invite + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');

        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(msgs[0])
            .setColor('RANDOM')
            .addField(msgs[1], 'https://discord.gg/Q9C7phH')
            .addField(msgs[2], 'bot inv')
            .addField(msgs[3], 'discordbotz')
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();
        message.channel.send(embed)

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
exports.help = {
    name: 'invite',
    aliases: ['in', 'пригласить', 'приглашение', 'приглашающий', 'приглашения']
};