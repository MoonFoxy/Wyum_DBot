//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.report + '`');
        let ntf = eval('`' + lang.ntf + '`');
        let noUser = lang.noUser;
        let noNum = lang.noNum;
        let noPerm = lang.noPerm;
        let nowMoney = lang.nowMoney;
        let errz = lang.err;
        let err = errz.split('<>');
        let reaso = lang.reason;
        let reasonz = reaso.split('<>')
        let msgs = evaled.split('<>');
        let actions = lang.actions.split('<>')
        let noMoney = lang.noMoney;
    if (args) if (args[0] == 'help') return message.channel.send(`**report** - Система репортов на другого человека\n**Использование:** ${config.prefix}report @USER TEXT`);
    let reportname = 'reports'
    let reportchannel = message.guild.channels.get(client.guild.fetch(`reportsChannel_${message.guild.id}`));
    if(!reportchannel){
        await message.guild.createChannel(reportname, 'text').then(channel => {

            client.guild.set(`reportsChannel_${message.guild.id}`,channel.id);
            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: false,
            });
        });
    }
    let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor('#e22216')
    let rUser = message.guild.member(message.mentions.users.first());
    if (!rUser) rUser = reasonz[1];
    let reason = args.join(' ');
    if (!reason) { embed.setDescription(`${msgs[1]}`); return message.channel.send(embed); };
    let emb = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`${msgs[0]}`)
        .setColor('#702db6')
        .addField(msgs[3], message.author)
        .addField(msgs[4], rUser)
        .addField(msgs[5], message.channel)
        .addField(msgs[6], reason)
        .setTimestamp()
    message.delete();
    reportchannel.send(emb);
};
module.exports.help = {
    name: 'report',
    aliases: ['rp', 'репорт', 'пожаловаться', 'ябида', 'шестерка', 'мразь']
};