//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let rUser = message.guild.member(message.mentions.users.first()) || message.author;
    if (!rUser) return

        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.slap + '`');
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
    let emb = new Discord.RichEmbed()
        .setAuthor(used, message.author.avatarURL)
        .setDescription(`${message.author} ${msgs[0]} ${rUser}`)
        .setImage(`https://media1.tenor.com/images/0720ffb69ab479d3a00f2d4ac7e0510c/tenor.gif?itemid=10422113`)
        .setColor('#f646ff')
        .setFooter(ntf)
    message.channel.send(emb)
};
module.exports.help = {
    name: 'slap',
    aliases: ['ударить', 'шлепнуть', 'шлеп']
};