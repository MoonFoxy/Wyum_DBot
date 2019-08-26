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
        
        let embed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}**`)
            .setColor('#e22216')
        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) { embed.setDescription(noPerm); return client.send(embed); }
        if (!args[0]) { embed.setDescription(msgs[1]); return client.send(embed); }
        function isNumeric(n) {

            return !isNaN(parseFloat(n)) && isFinite(n);

        }
        if (!isNumeric(args[0])) { embed.setDescription(msgs[1]); return client.send(embed); }



        Math.floor(args[0]);
        if (args[0] > 100) { embed.setDescription(msgs[1]); return client.send(embed); }

        if (args[0] < 1) { embed.setDescription(msgs[1]); return client.send(embed); }
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
        message.channel.bulkDelete(Math.floor(args[0])).then(() => {
            embed.setColor('#ffd8bd')
            embed.setDescription(`${message.author} | ${args[0]} `)
            logschannel.send(embed)
            client.send(embed).then(msg => msg.delete(15 * 1000));

        }).catch(err => {
            if (err.message == 'You can only bulk delete messages that are under 14 days old.') {
                embed.setColor('#e22216');
                embed.setDescription(msgs[2]);
                client.send(embed)
            }
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
    name: `clear`,
    aliases: [`чистка`]
};