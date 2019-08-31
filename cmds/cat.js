const Discord = require('discord.js')
const sa = require('superagent')

exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.fun.images + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');

        let { body } = await sa.get('http://aws.random.cat//meow');

        let cat = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(msgs[0])
            .setColor(config.color.image)
            .setImage(body.file)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        message.channel.send(cat);

    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin);
        let errEmb = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`${err[0]}`)
            .setColor(config.color.red)
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        message.channel.send(errEmb);
        console.log(err.stack);
    };
};
exports.help = {
    name: 'cat',
    aliases: ['кошка', 'кот']
}