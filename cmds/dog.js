const Discord = require('discord.js')
const sa = require('superagent')

exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.fun.images + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');

        let { body } = await sa.get('https://random.dog/woof.json');

        let dog = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(msgs[1])
            .setColor(config.color.image)
            .setImage(body.url)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        message.channel.send(dog);

    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.dev);
        let errEmb = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
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
    name: 'dog',
    aliases: ['собака', 'пес', 'щенок']
};