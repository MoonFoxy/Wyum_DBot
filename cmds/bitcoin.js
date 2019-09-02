const Discord = module.require('discord.js');
const Exchange = module.require('oip-exchange-rate');
const exchange = new Exchange();

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.fun.bitcoin + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');

        exchange.getExchangeRate('bitcoin', 'usd').then((rate) => {
            let bembed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTitle(msgs[0])
                .setColor('RANDOM')
                .setDescription(`${msgs[0]}: **${rate}$**`)
                .setFooter(ntf, client.user.avatarURL)
                .setTimestamp();
            message.channel.send(bembed);
        });

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
    name: 'bitcoin',
    aliases: ['bitcoen']
};