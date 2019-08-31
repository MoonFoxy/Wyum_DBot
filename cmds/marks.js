//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.info.marks + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');

        if (args) if (args[0] == 'help') return message.channel.send(`**marks** - Значки\n**Использование:** ${config.prefix}marks`);
        let embed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setDescription(msgs[0])
            .setColor(`#641349`)
            .setTitle(`**${message.author.tag}**`)
            .addField(`**Crook** :horse: `, msgs[1])
            .addField(`**Boss** :unicorn:`, msgs[2])
            .addField(`**Deniska** :hear_no_evil:`, msgs[3])
            .addField(`**${msgs[13]}** :newspaper2:`, msgs[4])
            .addField(`**${msgs[14]}** :incoming_envelope:`,msgs[5])
            .addField(`**${msgs[15]}** :dollar:`, msgs[6])
            .addField(`**${msgs[16]}** :yen:`, msgs[7])
            .addField(`**${msgs[17]}** :moneybag:`, msgs[8])
            .addField(`**${msgs[18]}** :credit_card:`, msgs[9])
            .addField(`**${msgs[19]}** :gem:`, msgs[10])
            .addField(`**${msgs[20]}** :wedding:`, msgs[11])
            .addField(`**${msgs[21]}** :gay_pride_flag:`, msgs[12])
            .addField(`**${msgs[22]}** :boom:`, msgs[12])
            .addField(`**Hacker** :spy:`, `${msgs[23]} <@526513788611198987>`)
            .setFooter(ntf);
        message.channel.send(embed)
    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`${err[0]}`)
            .setColor('#ff2400')
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        message.channel.send(errEmb);
        console.log(err.stack);
    };

};
module.exports.help = {
    name: 'marks',
    aliases: ['mks', 'значки', 'зночки', 'марки']
};