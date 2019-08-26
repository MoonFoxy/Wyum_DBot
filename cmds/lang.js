const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json')
        let prefix = config.prefix;

        let emb = new Discord.RichEmbed()
            .setColor('#ff0033')
            .setDescription(`:flag_ru: Используйте: ${prefix}lang ru\n:flag_gb: Use ${prefix}lang en`)
            if(!message.member.hasPermission('ADMINISTRATOR')){emb.setDescription('Вам нужны права администратора\nYou need administrator rights');return client.send(emb)};
        if (!args[0]) client.send(emb)
        if (args[0].toLowerCase() == 'ru') {
            client.guild.set(`lang_${message.guild.id}`, 'ru');
            emb.setDescription('Теперь бот будет работать на **Русском** языке')
            return client.send(emb);
        } else if (args[0].toLowerCase() == 'en') {
            client.guild.set(`lang_${message.guild.id}`, 'en');
            emb.setDescription('Now the bot will work in **English** language')
            return client.send(emb);
        } else {
            client.send(emb)
        }



    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
            .setTitle(`${err[0]}`)
            .setColor('#ff2400')
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        client.send(errEmb);
        console.log(err.stack);
    }
};
module.exports.help = {
    name: "lang",
    aliases: ["langue", 'яз', 'язык']
};