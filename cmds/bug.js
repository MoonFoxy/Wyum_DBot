//Завершено && Требует дополнения

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.other.bug + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let mod = lang.moderation;
        let admin = mod.admin.split('<>');

        let uadmin = client.profile.fetch(`admin_${message.author.id}`);

        let embed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setColor(config.color.red)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (uadmin != 1) return;
        let ops = args.join(' ')
        if (!ops) return;

        let admin = client.users.get(config.admin);
        admin.send(`**${message.author.tag} | ${message.author.id}**\n\n**${message.guild.name} | ${message.guild.id}**\n\n${ops}`);
        embed.setColor(config.color.yellow)
        embed.addField(`${message.author.tag}`, `**${msgs[0]}**`)
        embed.setTimestamp();

        message.channel.send(embed);

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
    name: "bug",
    aliases: ["баг"]
};