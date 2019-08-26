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

        let embed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}**`)
            .setColor('#e22216')

        if (!message.member.hasPermission(`MANAGE_CHANNELS`)) { embed.setDescription(noPerm); return message.channel.send(embed); }

        if (!args[0]) { embed.setDescription(msgs[1]); return message.channel.send(embed); }

        if (!ch) { embed.setDescription(msgs[1]); return message.channel.send(embed); }
        client.guild.set(`cmdchannel_${message.guild.id}`, ch.id);
        let bembed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}**`)
            .setColor('#10e250')
            .setDescription(msgs[2])
            .setFooter(ntf, message.author.avatarURL);
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
        logschannel.send(bembed)
        message.channel.send(bembed);
    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
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
    name: `cmdchannel`,
    aliases: [`сmdch`, 'каналдлякомманд']
};