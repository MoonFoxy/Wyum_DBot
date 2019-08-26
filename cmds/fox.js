//Завершено

const Discord = require('discord.js')
const sa = require('superagent')

exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let evaled = eval('`' + lang.fun.fox + '`');
    let ntf = eval('`' + lang.other.ntf + '`');
    let msgs = evaled.split('<>');
    
    if (args) if (args[0] == 'help') return message.channel.send(`**fox** - Рандомная лисичка (Author: Offsis)\n**Использование:** ${config.prefix}fox`);
    var { body } = await sa.get(`https://randomfox.ca/floof/`)
    var fox = new Discord.RichEmbed()
        .setColor('#fadbc8')
        .setImage(body.image)
        .setFooter(ntf)
    message.channel.send(fox)
}
exports.help = {
    name: 'fox',
    aliases: ["лиса", "лис", "лисичка", 'лисенок', 'лисонька', 'лисы', 'лисеночки']
}
