//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let evaled = eval('`' + lang.moderation.blockInvites + '`');
    let ntf = eval('`' + lang.other.ntf + '`');
    let msgs = evaled.split('<>');
    let alert = lang.alert;
    let noPerm = alert.noPerm;

    let logsname = 'logs'
    let embed = new Discord.RichEmbed()
        .setTitle(`**${msgs[0]}**`)
        .setColor('#10e250')
    if (!message.member.hasPermission('ADMINISTRATOR')) { embed.setDescription(noPerm); return client.send(embed); }
    let logschannel = message.guild.channels.get(client.guild.fetch(`logsChannel_${message.guild.id}`));
    if (!logschannel) {
        await message.guild.createChannel(logsname, { type: 'text' }).then(channel => {

            client.guild.set(`logsChannel_${message.guild.id}`, channel.id);
            client.guild.set(`blockInvites_${message.guild.id}`, true);
            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: false,
            });
        });
    }
    let bembed = new Discord.RichEmbed()
        .setTitle(`**${msgs[0]}**`)
        .setColor('#10e250')
        .setDescription(`**${msgs[1]}**`)
        .setFooter(ntf, message.author.avatarURL);
    logschannel.send(bembed)
    client.send(bembed);
};
module.exports.help = {
    name: "blockinvites",
    aliases: ["bi", "антиреклама"]
};