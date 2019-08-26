
const Discord = module.require("discord.js");
module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let uadmin = client.profile.fetch(`admin_${message.author.id}`);
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let embed = new Discord.RichEmbed()
            .setTitle('**Работа**')
            .setFooter('Пригласить бота на сервер: !invite', message.author.avatarURL)
            .setColor('RANDOM');
        if (uadmin != 1) return;
        if (!args[0]) { embed.setDescription('Вы не указали пользователя'); return client.send(embed); }
        if (!rUser) { embed.setDescription('Пользователь не найден'); return client.send(embed); }
        let userid = rUser.id;
        client.profile.set(`work_${userid}`,Math.floor(parseInt(args[1]))-1);
        client.profile.set(`workCooldown_${userid}`,0);
        embed.setDescription(`Вы установили ${rUser} уровень работы **${Math.floor(parseInt(args[1]))}**`);
        client.send(embed);

    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
            .setTitle('Ошибка')
            .setColor('#ff2400')
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`Если ошибка не пропадает обратитесь к ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        client.send(errEmb);
        console.log(err.stack);
    }
};
module.exports.help = {
    name: "setwork",
    aliases: ["sw"]
};