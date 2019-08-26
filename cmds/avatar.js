//Завершено

const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let evaled = eval('`' + lang.other.avatar + '`');
    let ntf = eval('`' + lang.other.ntf + '`');
    let msgs = evaled.split('<>');
    let alert = lang.alert;
    let noUser = alert.noUser;
    
    let usr = message.mentions.users.first() ? message.mentions.users.first() : message.author;
    if (!usr) return client.send(noUser);
    let embed = new Discord.RichEmbed()
        .setColor('#db9834')
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setTitle(`${msgs[0]} ${usr.username}!`)
        .setImage(usr.avatarURL);
    client.send(embed);
  
}
module.exports.help = {
    name: "avatar",
    aliases: ["аватар"]
}
