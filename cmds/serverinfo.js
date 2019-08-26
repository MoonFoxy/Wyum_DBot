//Завершено

const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let otherlang = require(`../lang_${client.lang}.json`);
    let olang = otherlang.casino.split('<>');
    let evaled = eval('`' + lang.serverinfo + '`');
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
    try {
        let embed = new Discord.RichEmbed()
            .setDescription(msgs[0])
            .setColor('#10c7e2')
            .addField(msgs[1], message.guild.name)
            .addField(msgs[2], message.guild.id)
            .addField(msgs[3], message.guild.createdAt)
            .addField(msgs[4], message.guild.joinedAt)
            .addField(msgs[5], message.guild.memberCount)
            .addField(msgs[6], message.guild.region)
            .addField(msgs[7], message.guild.large)
            .addField(msgs[8], message.guild.mfaLevel)
            .addField(msgs[9], message.guild.verificationLevel)
            .setThumbnail(message.guild.iconURL)
            .setFooter(ntf, message.author.avatarURL);

        message.channel.send(embed);
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
    }

};
module.exports.help = {
    name: "serverinfo",
    aliases: ["sinfo", 'серверинфо', 'синфо']
};