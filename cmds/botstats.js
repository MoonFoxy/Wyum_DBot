//Завершено

const Discord = require('discord.js');
const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let evaled = eval('`' + lang.info.clientstats + '`');
    let ntf = eval('`' + lang.other.ntf + '`');
    let msgs = evaled.split('<>');
    
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

    const embed = new Discord.RichEmbed()
        .setAuthor("Bot stats")
        .setColor('#a7f442')
        .setThumbnail("https://discordemoji.com/assets/emoji/2278_PinkCatSpin.gif")
        .setTimestamp()
        .addField(`⭕ | ${msgs[0]}`, `${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} MB`, true)
        .addField(`🕑 | Uptime`, `${duration}`, true)
        .addField(`👥 | ${msgs[1]}`, `${client.users.size.toLocaleString()}`, true)
        .addField(`🌐 | ${msgs[2]}`, `${client.guilds.size.toLocaleString()}`, true)
        .addField(`🗨 | ${msgs[3]}`, `${client.channels.size.toLocaleString()}`, true)
        .addField(`⚙ | ${msgs[4]}`, `${client.commands.size.toLocaleString()}`, true)
        .addField(`🕵 | ${msgs[5]}`, client.clientstats.fetch(`viewMessages`), true)
        .addField(`📩 | ${msgs[6]}`, client.clientstats.fetch(`sendMessages`), true)
        .addField(`💡 | Discord.js`, `v${version}`, true)
        .setFooter(ntf, message.author.avatarURL);

    message.channel.send(embed);
};

module.exports.help = {
    name: "botstats",
    aliases: ["bs", "статистикабота", "бс"]
}