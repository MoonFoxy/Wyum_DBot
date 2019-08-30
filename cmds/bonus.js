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
        let s = ms(((cooldown / 60) / 1000) - (Date.now() - time), {
            long: true
        });

        let cooldown = 60; //Кулдаун бонуса в минутах
        let bonus = Math.floor(Math.random() * (120 - 10)) + 10 + (lvl * 5); //Формуа выдачи бонуса с помощью лвла

        let wrong = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setColor(config.color.red)
            .setDescription(`**${message.author.tag}** ${msgs[0]} **${s.minutes} minutes ${s.seconds} seconds**`)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (time > Date.now()) return message.channel.send(wrong)

        let add = Date.now() + ((cooldown * 60) * 1000);
        let mh;
        let cd;

        //if (cooldown > 60) { mh = ' hours'; cd = (cooldown / 60) } else { mh = ' minutes'; cd = cooldown };

        client.profile.add(`coins_${message.author.id}`, bonus);
        client.profile.set(`bonustime_${message.author.id}`, add);
        client.lprofile.add(`coins_${message.author.id}_${message.guild.id}`, bonus);

        let bembed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setColor(config.color.green)
            .setDescription(`${msgs[1]}${cd}${mh}`)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        message.channel.send(bembed);

    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
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
    name: "bonus",
    aliases: ["b", "бонус", "$"]
};