//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.moderation.ban + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let mod = lang.moderation;
        let reason = mod.reason.split('<>');
        let actions = mod.actions.split('<>');
        let admin = mod.admin.split('<>');
        let alert = lang.alert;
        let noUser = alert.noUser;
        let noPerm = alert.noPerm;
        
        let embed = new Discord.RichEmbed()
            .setTitle(`${msgs[0]}`)
            .setColor('#e22216')
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
        if (!message.member.hasPermission('BAN_MEMBERS')) { embed.setDescription(noPerm); return client.send(embed); }

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        let reason = args.slice(1).join(" ");
        if (!args[0]) { embed.setDescription(noUser); return client.send(embed); }
        if (!rUser) { embed.setDescription(noUser); return client.send(embed); }
        if (!reason) { reason = reasonz[1] }

        let bembed = new Discord.RichEmbed()
            .setDescription(msgs[0])
            .setColor('#e22216')
            .addField(admin, message.author)
            .addField(actions[0], `${rUser}`)
            .addField(reasonz[0], reason)
            .setFooter(ntf, message.author.avatarURL)
            .setThumbnail("https://discordemoji.com/assets/emoji/1651_BanOVE.gif");

        rUser.send(bembed);
        message.guild.member(rUser).ban(reason);
        client.send(bembed)
        logschannel.send(bembed)
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
    name: "ban",
    aliases: ["бан"]
};