const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let role = message.mentions.roles.first();
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.moderation.autorole + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let toUse = alert.toUse;
        let alert = lang.alert;
        let noPerm = alert.noPerm;
        let noArgs = alert.noArgs;
        let noRole = alert.noRole;

        let wrong = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor(config.color.red)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            wrong.setDescription(noPerm);
            return message.channel.send(wrong);
        };

        if (!args[0]) {
            wrong.setDescription(`**${noArgs}**\n*${toUse}${config.prefix}autorole @role*`);
            return message.channel.send(wrong);
        };
       
        if (!role) {
            wrong.setDescription(`**${noRole}**\n*${toUse}${config.prefix}autorole @role*`);
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

        client.guild.set(`autorole_${message.guild.id}`, role.id);

        let bembed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor(config.color.green)
            .setDescription(`**${msgs[1]}**`)
            .setFooter(ntf, client.user.avatarURL);
        logschannel.send(bembed);
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
    name: "autorole",
    aliases: ["ar", "автороль"]
};