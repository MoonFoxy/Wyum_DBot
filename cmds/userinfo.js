//Завершено

const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]);
        let roles = client.guild.fetch(`shop_${message.guild.id}`);
        let prices = client.guild.fetch(`prices_${message.guild.id}`);
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.userinfo + '`');
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
        let a = message.mentions.users.first() || message.author;

        let embed = new Discord.RichEmbed()
            .setDescription(msgs[0])
            .setColor('#10c7e2')
            .addField(msgs[1], a.username)
            .addField(msgs[2], a.tag)
            .addField(msgs[3], a.discriminator)
            .addField(msgs[4], a.createdAt)
            .addField(msgs[5], a.id)
            .addField(msgs[6], a.client)
            .setFooter(ntf)
            .setThumbnail(a.avatarURL);

        client.send(embed);
    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
            .setTitle(`${err[0]}`)
            .setColor('#ff2400')
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        client.send(errEmb);
        console.log(err.stack);
    }

};
module.exports.help = {
    name: "userinfo",
    aliases: ["юзеринфо"]
};