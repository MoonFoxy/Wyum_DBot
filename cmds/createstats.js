//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.moderation.createstats + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noPerm = alert.noPerm;

        let wrong = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}*`)
            .setColor(config.color.red)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            wrong.setDescription(noPerm);
            return message.channel.send(wrong);
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

        message.guild.createChannel(`${msgs[1]}`, {
            type: 'voice'
        }).then(channel => {
            client.guild.set(`totalUsers_${message.guild.id}`, channel.id)
            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: true,
                CONNECT: false,
            });
        });

        message.guild.createChannel(`${msgs[2]}`, {
            type: 'voice'
        }).then(channel => {
            client.guild.set(`totalBots_${message.guild.id}`, channel.id)
            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: true,
                CONNECT: false,
            });
        });

        let bembed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}*`)
            .setColor(config.color.cyan)
            .setDescription(`${msgs[3]}`)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();    
            logschannel.send(bembed)
            message.channel.send(bembed);

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
module.exports.help = {
    name: `createstats`,
    aliases: [`crs`, 'создатьстатистику']
};