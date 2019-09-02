//Завершено

const Discord = module.require(`discord.js`);
const ms = require('ms');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let res = args[1];
        let reason = args.slice(2).join(` `);
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let bb = lang.mute.split('<>')
        let ntf = eval('`' + lang.ntf + '`');
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`**${bb[0]}**`)
            .setFooter(ntf, client.user.avatarURL)
            .setColor('#e22216')
            .setThumbnail('https://discordemoji.com/assets/emoji/1414_FeelsAbdulMan.gif');
        let noUser = lang.noUser;
        if (!rUser) { embed.setDescription(noUser); return message.channel.send(embed); }
        if (!res) { embed.setDescription(`${bb[2]}\n${bb[1]}`); return message.channel.send(embed); }
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.mute + '`');
        let noNum = lang.noNum;
        let noPerm = lang.noPerm;
        let nowMoney = lang.nowMoney;
        let errz = lang.err;
        let err = errz.split('<>');
        let reaso = lang.reason;
        let reasonz = reaso.split('<>')
        let msgs = evaled.split('<>');
        let actions = lang.actions.split('<>')
        let admin = lang.admin.split('<>')
        let noMoney = lang.noMoney;
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) { embed.setDescription(noPerm); return message.channel.send(embed); }
        if (!args[0]) { embed.setDescription(`**${noUser}**\n${msgs[1]}`); return message.channel.send(embed); }
        if (!rUser) { embed.setDescription(noUser); return message.channel.send(embed); }
        if (!res) { embed.setDescription(`${msgs[2]}\n${msgs[1]}`); return message.channel.send(embed); }
        if (!reason) { reason = reasonz[1] }
        if (!isNumeric(ms(res))) { embed.setDescription(`${msgs[2]}\n${msgs[1]}`); return message.channel.send(embed); }
        if (ms(res) < 1000) { embed.setDescription(`${msgs[2]}\n${msgs[1]}`); return message.channel.send(embed); }
        let role = message.guild.roles.find(r => r.name === config.muteRole);

        if (!role) {
            role = await message.guild.createRole({
                name: config.muteRole,
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        };

        if (rUser.roles.has(role.id)) { embed.setDescription(msgs[3]); return message.channel.send(embed); }

        client.mutes.set(`guild_${rUser.id}`, rUser.guild.id);
        client.mutes.set(`time_${rUser.id}`, Date.now() + ms(res));

        rUser.addRole(role);
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
        embed.setColor('#1bcf84'); embed.setDescription(msgs[4]); embed.addField(reasonz[0], reason); message.channel.send(embed); rUser.send(embed)
        logschannel.send(embed)
    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.dev)
        let errEmb = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
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
    name: `mute`,
    aliases: [`муте`, 'мут', 'мьют', 'затычка', 'закрытьрот', 'заткнуть', 'убитьчтобыслетеласосальня']
};