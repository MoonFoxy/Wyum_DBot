//Завершено

const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.stop + '`');
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
            .setAuthor(used, message.author.avatarURL)
            .setTitle("**sus**")
            .setColor('#e22216')
            .setFooter(ntf, client.user.avatarURL);
        if (!message.member.voiceChannel) { embed.setDescription(msgs[0]); return message.channel.send(embed); }
        if (!message.guild.me.voiceChannel) { embed.setDescription(msgs[1]); return message.channel.send(embed); }
        if (message.member.voiceChannel !== message.guild.me.voiceChannel) { embed.setDescription('**Вы не можете управлять музыкой из другого канала** | **Go to music channel** ya hz'); return message.channel.send(embed); }

        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        embed.setColor('fae7b5'); embed.setDescription(msgs[2]); return message.channel.send(embed);
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
    };

};
module.exports.help = {
    name: "stop",
    aliases: ["астанавитесь", 'стоп']
};