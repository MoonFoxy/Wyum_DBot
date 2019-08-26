//Завершено

const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.invite + '`');
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
        .setDescription(msgs[0])
        .setColor('#10e250')
        .addField(msgs[3],'**https://discordbots.org/bot/net*')
    client.send(emb)
}
exports.help = {
    name: 'vote',
    aliases: ["v", 'голосование']
}
