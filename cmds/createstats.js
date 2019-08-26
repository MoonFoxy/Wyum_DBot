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
        
        let embed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}*`)
            .setColor('#e22216')
        if (!message.member.hasPermission(`MANAGE_CHANNELS`)) { embed.setDescription(noPerm); return client.send(embed); };
        message.guild.createChannel(`${msgs[1]}`, { type: 'voice' }).then(channel => {

            client.guild.set(`totalUsers_${message.guild.id}`, channel.id)

            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: true,
                CONNECT: false,
            })
        });
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
        message.guild.createChannel(`${msgs[2]}`, { type: 'voice' }).then(channel => {

            client.guild.set(`totalBots_${message.guild.id}`, channel.id)

            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: true,
                CONNECT: false,
            });
            embed.setColor('#31b8c4');
            embed.setDescription(`${msgs[3]}`);
            logschannel.send(embed)
            return client.send(embed);
        });
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
    name: `createstats`,
    aliases: [`crs`, 'создатьстатистику']
};