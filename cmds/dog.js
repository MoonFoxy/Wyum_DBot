//Завершено

const Discord = require('discord.js')
const sa = require('superagent')

exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let evaled = eval('`' + lang.fun.dog + '`');
    let ntf = eval('`' + lang.other.ntf + '`');
    let msgs = evaled.split('<>');
    
    if (args) if (args[0] == 'help') return message.channel.send(`**dog** - Рандомный песик (Author: Offsis)\n**Использование:** ${config.prefix}dog`);
    var { body } = await sa.get(`https://random.dog/woof.json`)
    var dog = new Discord.RichEmbed()
        .setColor('#fadbc8')
        .setImage(body.url)
        .setFooter(ntf)
    message.channel.send(dog)
}
exports.help = {
    name: 'dog',
    aliases: ["собака", 'пес', 'щенок']
}