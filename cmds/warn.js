//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.warn + '`');
        let ntf = eval('`' + lang.ntf + '`');
        let msgs = evaled.split('<>');
        let admin = lang.admin.split('<>')
        let noUser = lang.noUser;
        let noPerm = lang.noPerm;

        let embed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle('**Варн**')
            .setColor('#e22216');
        if (!message.member.hasPermission('BAN_MEMBERS')) { embed.setDescription(noPerm); return message.channel.send(embed); }

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!args[0]) { embed.setDescription(noUser); return message.channel.send(embed); }
        if (!rUser) { embed.setDescription(noUser); return message.channel.send(embed); }
        let warns = client.lprofile.fetch(`warns_${rUser.id}_${rUser.guild.id}`);
        client.lprofile.add(`warns_${rUser.id}_${rUser.guild.id}`, 1);
        let embeds = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setDescription('Warn')
            .setColor('#e22216')
            .addField(admin, message.author)
            .addField(msgs[0], `${rUser}`)
            .setFooter(ntf)
            .addField(msgs[1], `${warns}/3`);
        let logsname = 'logs'
        let logschannel = message.guild.channels.get(client.guild.fetch(`logsChannel_${message.guild.id}`));
        if (!logschannel) {
            await message.guild.createChannel(logsname, { type: 'text' }).then(channel => {

                client.guild.set(`logsChannel_${message.guild.id}`, channel.id);
                channel.overwritePermissions(message.guild.defaultRole, {
                    VIEW_CHANNEL: false,
                });
            });
        }
        logschannel.send(embeds)
        message.channel.send(embeds);
        if (warns >= 3) {
            client.lprofile.set(`warns_${rUser.id}`, 0);
            message.guild.member(rUser).ban('3/3 Предупреждений | Warns');
        };
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
    name: 'warn',
    aliases: ['варн', 'предупреждение', 'прикол']
};