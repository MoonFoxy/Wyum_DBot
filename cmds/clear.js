//Завершено

const Discord = module.require(`discord.js`);

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.moderation.clear + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noPerm = alert.noPerm;

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        let wrong = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor(config.color.red)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            wrong.setDescription(noPerm);
            return message.channel.send(wrong);
        };

        if (!args[0]) {
            wrong.setDescription(msgs[1]);
            return message.channel.send(wrong);
        };

        if (!isNumeric(args[0])) {
            wrong.setDescription(msgs[1]);
            return message.channel.send(wrong);
        };

        Math.floor(args[0]);
        if (args[0] > 100) {
            wrong.setDescription(msgs[1]);
            return message.channel.send(wrong);
        };

        if (args[0] < 1) {
            wrong.setDescription(msgs[1]);
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

        let bembed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor(config.color.yellow)
            .setDescription(`${message.author} | ${args[0]} `)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        message.channel.bulkDelete(Math.floor(args[0])).then(() => {
            logschannel.send(bembed)
            message.channel.send(bembed).then(msg => msg.delete(15 * 1000));
        }).catch(err => {
            if (err.message == 'You can only bulk delete messages that are under 14 days old.') {
                wrong.setDescription(msgs[2]);
                message.channel.send(wrong)
            };
        });

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
    name: `clear`,
    aliases: [`чистка`]
};