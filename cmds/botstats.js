//Завершено

const Discord = require('discord.js');
const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.info.clientstats + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');

        const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

        const bembed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(msgs[0])
            .setColor(config.color.cyan)
            .setThumbnail('https://discordemoji.com/assets/emoji/2278_PinkCatSpin.gif')
            .addField(`⭕ | ${msgs[1]}`, `${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} MB`, true)
            .addField(`🕑 | ${msgs[2]}`, `${duration}`, true)
            .addField(`👥 | ${msgs[3]}`, `${client.users.size.toLocaleString()}`, true)
            .addField(`🌐 | ${msgs[4]}`, `${client.guilds.size.toLocaleString()}`, true)
            .addField(`🗨 | ${msgs[5]}`, `${client.channels.size.toLocaleString()}`, true)
            .addField(`⚙ | ${msgs[6]}`, `${client.commands.size.toLocaleString()}`, true)
            .addField(`🕵 | ${msgs[7]}`, client.clientstats.fetch(`viewMessages`), true)
            .addField(`📩 | ${msgs[8]}`, client.clientstats.fetch(`sendMessages`), true)
            .addField(`💡 | ${msgs[9]}`, `v${version}`, true)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        message.channel.send(bembed);
        
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
    name: 'botstats',
    aliases: ['bs', 'статистикабота', 'бс']
}