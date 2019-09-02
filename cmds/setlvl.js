//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        let config = require('../config.json');
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('**Изменение уровня**')
            .setFooter('Пригласить бота на сервер: !invite', message.author.avatarURL)
            .setColor('#e22216');
        let uadmin = client.profile.fetch(`admin_${message.author.id}`);
        if (uadmin != 1) return;

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let res = args.slice(1).join(' ');

        if (!args[0]) { embed.setDescription(`**Укажите пользователя**\n*Пример ${config.prefix}setlvl @user 500*`); return message.channel.send(embed); };
        if (!rUser) { embed.setDescription('**Данный пользователь не найден**'); return message.channel.send(embed); }
        if (!res) { embed.setDescription(`**Укажите Число**\n*Пример ${config.prefix}setlvl @user 500*`); return message.channel.send(embed); };
        if (!isNumeric(res)) { ; embed.setDescription(`**Укажите число правильно**\n*Пример ${config.prefix}setlvl @user 500*`); return message.channel.send(embed); };
        client.profile.set(`lvl_${rUser.id}`, Math.floor(parseInt(res)));
        let lvl = client.profile.fetch(`lvl_${rUser.id}`);
        if (lvl === null) client.profile.set(`lvl_${rUser.id}`, 1 + Math.floor(parseInt(res)));

        let bembed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('**Изменение уровня**')
            .setColor('#10e250')
            .setDescription(`Вы установили ${rUser.user.tag} ${args[1]} лвлов!`)
            .setFooter('Пригласить бота на сервер: !invite', message.author.avatarURL);

        message.channel.send(bembed);
        
    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.dev)
        let errEmb = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Ошибка')
            .setColor('#ff2400')
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`Если ошибка не пропадает обратитесь к ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        message.channel.send(errEmb);
        console.log(err.stack);
    }

};
module.exports.help = {
    name: 'setlvl',
    aliases: ['установитьуровень']
};