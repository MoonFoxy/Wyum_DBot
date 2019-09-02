//Завершено

const Discord = module.require(`discord.js`);

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.moderation.cmdchannel + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noPerm = alert.noPerm;

        let ch = message.mentions.channels.first();

        let wrong = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor(config.color.red)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            wrong.setDescription(noPerm);
            return message.channel.send(wrong);
        };

        if (!args[0]) {
            wrong.setDescription(msgs[1]);
            return message.channel.send(wrong);
        };

        if (!ch) {
            wrong.setDescription(msgs[1]);
            return message.channel.send(wrong);
        };

        client.guild.set(`cmdchannel_${message.guild.id}`, ch.id);

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
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`**${msgs[0]}**`)
        .setColor(config.color.green)
        .setDescription(msgs[2])
        .setFooter(ntf, client.user.avatarURL)
        .setTimestamp();
        logschannel.send(bembed)
        message.channel.send(bembed);

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
    }

};
module.exports.help = {
    name: `cmdchannel`,
    aliases: [`сmdch`, 'каналдлякомманд']
};