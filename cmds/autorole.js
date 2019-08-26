//Завершено
const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let role = message.mentions.roles.first();
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.moderation.autorole + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noPerm = alert.noPerm;
        
        let embed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}**`)
            .setColor('#e22216')

        if (!message.member.hasPermission('ADMINISTRATOR')) { embed.setDescription(noPerm); return client.send(embed); }

        if (!args[0]) { embed.setDescription(`${config.prefix}autorole @role`); return client.send(embed); }
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
        if (!role) { embed.setDescription(`${config.prefix}autorole @role`); return client.send(embed); }
        let guildid = message.guild.id
        client.guild.set(`autorole_${guildid}`, role.id)
        let bembed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}**`)
            .setColor('#10e250')
            .setDescription(`**${msgs[1]}**`)
            .setFooter(ntf, message.author.avatarURL);
        logschannel.send(bembed)
        client.send(bembed);
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
    name: "autorole",
    aliases: ["ar", "автороль"]
};