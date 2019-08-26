//Завершено

const Discord = module.require('discord.js');
const ms = require('parse-ms');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.economy.bonus + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');

        let time = client.profile.fetch(`bonustime_${message.author.id}`);
        let s = ms(((client.cd / 60) / 1000) - (Date.now() - time), { long: true });
        let wrong = new Discord.RichEmbed()
            .setColor('#ee281f')
            .setDescription(`**${message.author.tag}** ${msgs[0]} **${s.minutes} minutes ${s.seconds} seconds**`)
        if (time > Date.now()) return message.channel.send(wrong)

        let add = Date.now() + ((client.cd * 60) * 1000);
        let mh;
        let cd;

        if (client.cd > 60) { mh = ' hours'; cd = (client.cd / 60) } else { mh = ' minutes'; cd = client.cd };

        let embed = new Discord.RichEmbed()
            .setColor('#77dd77')
            .setDescription(`${msgs[1]}${cd}${mh}`);

        message.channel.send(embed);

        client.profile.add(`coins_${message.author.id}`, config.bonus);
        client.profile.set(`bonustime_${message.author.id}`, add);
        client.lprofile.add(`coins_${message.author.id}_${message.guild.id}`, config.bonus);
    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
            .setTitle(`${err[0]}`)
            .setColor('#ff2400')
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        message.channel.send(errEmb);
        console.log(err.stack);
    };
};

module.exports.help = {
    name: "bonus",
    aliases: ["b", "бонус", "$"]
};