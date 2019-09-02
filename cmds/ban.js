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

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let why = args.slice(1).join(' ');

        let wrong = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`${msgs[0]}`)
            .setColor(config.color.red)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            wrong.setDescription(noPerm);
            return message.channel.send(wrong);
        };

        if (!args[0]) {
            wrong.setDescription(noUser);
            return message.channel.send(wrong);
        };

        if (!rUser) {
            wrong.setDescription(noUser);
            return message.channel.send(wrong);
        };

        if (!why) {
            why = reason[1];
        };

        let logschannel = message.guild.channels.get(client.guild.fetch(`logsChannel_${message.guild.id}`));
        if (!logschannel) {
            await message.guild.createChannel('logs', {
                type: 'text'
            }).then(channel => {

                client.guild.set(`logsChannel_${message.guild.id}`, channel.id);
                channel.overwritePermissions(message.guild.defaultRole, {
                    VIEW_CHANNEL: false,
                });
            });
        };
        
        message.guild.member(rUser).ban(reason);

        let bembed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(msgs[0])
            .setColor(config.color.red)
            .setThumbnail('https://discordemoji.com/assets/emoji/1651_BanOVE.gif')
            .addField(admin, message.author)
            .addField(actions[0], `${rUser}`)
            .addField(why[0], reason)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        rUser.send(bembed);
        message.channel.send(bembed);
        logschannel.send(bembed);

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
module.exports.help = {
    name: 'ban',
    aliases: ['бан']
};