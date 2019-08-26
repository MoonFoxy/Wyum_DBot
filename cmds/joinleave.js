//Завершено

const Discord = module.require(`discord.js`);

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.yt_music.joinleave + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noPerm = alert.noPerm;

        let embed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}**`)
            .setColor('RANDOM')
        if (!message.member.hasPermission(`ADMINISTRATOR`)) { embed.setDescription(noPerm); return client.send(embed); }
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
        let joinname = 'join-leave'
        let joinchannel = message.guild.channels.get(client.guild.fetch(`joinleave_${message.guild.id}`));
        if (!joinchannel) {
            await message.guild.createChannel(joinname, { type: 'text' }).then(channel => {
                client.guild.set(`joinleave_${message.guild.id}`, channel.id);
            });
        }
        embed.setDescription(msgs[1])
        embed.setFooter(ntf, message.author.avatarURL)
        logschannel.send(embed);
        client.send(embed);
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
    name: `joinleave`,
    aliases: [`входвыход`, 'jl']
};