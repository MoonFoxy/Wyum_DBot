//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let otherlang = require(`../lang_${client.lang}.json`);
    let olang = otherlang.casino.split('<>');
    let evaled = eval('`' + lang.ping + '`');
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
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(msgs[0])
        .setColor('#ff8148')
        .addField(`Pffagarvvbw2q5td`, `**${client.ping}**`)
        .setFooter(ntf, client.user.avatarURL)
        .setThumbnail('https://discordemoji.com/assets/emoji/2366_Loading_Pixels.gif');
    message.channel.send(emb);
};
module.exports.help = {
    name: 'ping',
    aliases: ['пинг', 'лаги']
};