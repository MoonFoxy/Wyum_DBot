//Завершено

const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.info.invite + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        
    let emb = new Discord.RichEmbed()
        .setAuthor(used, message.author.avatarURL)
        .setDescription(msgs[0])
        .setColor('#10e250')
        .addField(msgs[1], 'https://discord.gg/Z9Tepy3')
        .addField(msgs[2], 'https://discordapp.com/oauth2/authorize?client_id=526513788611198987&permissions=8&scope=bot')
        .addField(msgs[3],'https://discordbots.org/bot/526513788611198987')
    message.channel.send(emb)
}
exports.help = {
    name: 'invite',
    aliases: ["in", 'пригласить', 'приглашение', 'приглашающий', 'приглашения']
}
