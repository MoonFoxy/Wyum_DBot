
const Discord = module.require("discord.js");
module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.ot + '`');
        let ntf = eval('`' + lang.ntf + '`');
        let noUser = lang.noUser;
        let noNum = lang.noNum;
        let noPerm = lang.noPerm;
        let nowMoney = lang.nowMoney;
        let errz = lang.err;
        let err = errz.split('<>');
        let reaso = lang.reason;
        let reason = reaso.split('<>')
        let msgs = evaled.split('<>');
        let actions = lang.actions.split('<>')
        let admin = lang.admin.split('<>')
        let noMoney = lang.noMoney;
        let rUser = message.guild.member(message.mentions.users.first() ||client.users.get(args[0]) || message.guild.members.get(args[0]));
        let embed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor('RANDOM');
        if (!message.member.hasPermission("KICK_MEMBERS")) { embed.setDescription(noPerm); return message.channel.send(embed); }
        if (!args[0]) { embed.setDescription(noUser); return message.channel.send(embed); }
        if (!rUser) { embed.setDescription(noUser); return message.channel.send(embed); }
        let ot = args.slice(1).join(" ");
        embed.setDescription(`**${ot}**`);
        rUser.send(embed);
        message.channel.send(embed);

    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`${err[0]}`)
            .setColor('#ff2400')
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        message.channel.send(errEmb);
        console.log(err.stack);
    }
};
module.exports.help = {
    name: "ot",
    aliases: ["от"]
};