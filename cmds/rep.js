//Завершено

const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    try {

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        let config = require('../config.json');
        if (args) if (args[0] == 'help') return message.channel.send(`**rep** - Репутация в боте (Выдается создателем бота)\n**Использование:** ${config.prefix}rep @USER SUM`);
        let uadmin = client.profile.fetch(`admin_${message.author.id}`);
        if (uadmin != 1) return;
        let embed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle('**Репутация**')
            .setFooter('Пригласить бота на сервер: !invite', message.author.avatarURL)
            .setColor('#e22216');

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let res = args.slice(1).join(" ");

        if (!args[0]) { embed.setDescription(`**Укажите пользователя**\n*Пример ${config.prefix}rep @user 2*`); return message.channel.send(embed); };
        if (!rUser) { embed.setDescription('**Данный пользователь не найден**'); return message.channel.send(embed); }
        if (!res) { embed.setDescription(`**Укажите Число**\n*Пример ${config.prefix}rep @user 2**`); return message.channel.send(embed); };
        if (!isNumeric(res)) { embed.setDescription(`**Укажите число правильно**\n*Пример ${config.prefix}rep @user 2*`); return message.channel.send(embed); };
        client.profile.add(`rep_${rUser.id}`, Math.floor(parseInt(res)));
        let rep = client.profile.fetch(`rep_${rUser.id}`);
        if (rep === null) client.profile.set(`rep_${rUser.id}`, Math.floor(parseInt(res)));

        let bembed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle("**Репутация**")
            .setColor('#10e250')
            .setDescription(`${rUser} Вы заслужили уважение от создателя бота!\nВсего репутации: **${rep}**`)
            .setFooter('Пригласить бота на сервер: !invite', message.author.avatarURL);

        message.channel.send(bembed);
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
    }

};
module.exports.help = {
    name: "rep",
    aliases: ["реп"]
};