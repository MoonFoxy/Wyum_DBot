//Завершено

const Discord = require("discord.js");
const shorten = require('isgd')

module.exports.run = async (client, message, args) => {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.sh + '`');
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
    let embed = new Discord.RichEmbed()
            .setTitle(msgs[0])
            .setFooter(ntf, message.author.avatarURL)
            .setColor('#e22216');
    if (!args[0]) { embed.setDescription(msgs[1]); return message.channel.send(embed); };
    if (!args[1]) {
        shorten.shorten(args[0], function (res) {
            if (res.startsWith('Ошибка:')) { embed.setDescription(msgs[1]); return message.channel.send(embed); };
            embed.setDescription(`*<${res}>*`);
            embed.setColor('#ff00cc');
            return message.channel.send(embed);
        })
    } else {
        shorten.custom(args[0], args[1], function (res) {
            if (res.startsWith('Ошибка')) { embed.setDescription(`${res}`); return message.channel.send(embed); };
            embed.setColor('#ff00cc');
            embed.setDescription(`*<${res}>*`); 
            return message.channel.send(embed);

        })
    }
}

module.exports.help = {
    name: "sh",
    aliases: ["сократитьссылку", 'вирус']
}