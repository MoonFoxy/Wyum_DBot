//Завершено

const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let evaled = eval('`' + lang.roleplay.kiss + '`');
    let ntf = eval('`' + lang.other.ntf + '`');
    let msgs = evaled.split('<>');

    let rUser = message.guild.member(message.mentions.users.first()) || message.author;
    let emb = new Discord.RichEmbed()
        .setDescription(`${message.author} ${msgs[0]} ${rUser}`)
        .setColor('#f646ff')
        .setImage(`https://media1.tenor.com/images/45e529c116a1758fd09bdb27e2172eca/tenor.gif?itemid=11674749`)
        .setFooter(ntf)
    client.send(emb)
};
module.exports.help = {
    name: "kiss",
    aliases: ["поцеловать", 'расцеловать', 'уцеловать', 'целовать']
};