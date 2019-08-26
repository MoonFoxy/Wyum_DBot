//Завершено

const Discord = require('discord.js')
const sa = require('superagent')

exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let evaled = eval('`' + lang.fun.cat + '`');
    let ntf = eval('`' + lang.other.ntf + '`');
    let msgs = evaled.split('<>');
    
    if (args) if (args[0] == 'help') return client.send(`**cat** - Рандомный котик)\n**Использование:** ${config.prefix}cat`);
    var { body } = await sa.get("http://aws.random.cat//meow")
    var cat = new Discord.RichEmbed()
        .setColor('#fadbc8')
        .setImage(body.file)
        .setFooter(ntf)
    client.send(cat)
}
exports.help = {
    name: "cat",
    aliases: ["кошка", "кот"]
}