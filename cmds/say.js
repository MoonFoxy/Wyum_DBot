//Завершено

const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let otherlang = require(`../lang_${client.lang}.json`);
    let olang = otherlang.casino.split('<>');
    let evaled = eval('`' + lang.say + '`');
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
        .setColor('#e22216')
        .setThumbnail('https://discordemoji.com/assets/emoji/1414_FeelsAbdulMan.gif');
    let clientmessage = args.join(" ");
    if (!clientmessage) {return}
    message.delete().catch();
    message.channel.send(clientmessage);
};
module.exports.help = {
    name: "say",
    aliases: ["сказать", 'скажи', 'поговори', 'говори']
};