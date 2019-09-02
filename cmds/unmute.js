
//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]);
        let roles = client.guild.fetch(`shop_${message.guild.id}`);
        let prices = client.guild.fetch(`prices_${message.guild.id}`);
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.unmute + '`');
        let ntf = eval('`' + lang.ntf + '`');
        let noUser = lang.noUser;
        let noNum = lang.noNum;
        let noPerm = lang.noPerm;
        let nowMoney = lang.nowMoney;
        let errz = lang.err;
        let err = errz.split('<>');
        let reaso = lang.reason;
        let reason = reaso.split('<>')
        let msgs = evaled.split('<>');
        let actions = lang.actions.split('<>')
        let admin = lang.admin.split('<>')
        let noMoney = lang.noMoney;
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Unmute')
            .setColor('#d82d08')
            .setFooter(ntf, client.user.avatarURL)
            .setThumbnail('https://discordemoji.com/assets/emoji/1132_Ricardo.gif');
        if (!message.member.hasPermission('MANAGE_MESSAGES')) { embed.setDescription(noPerm); return message.channel.send(embed); };
        if (!args[0]) { embed.setDescription(noUser); return message.channel.send(embed); }
        if (!rUser) { embed.setDescription(noUser); return message.channel.send(embed); }
        let role = message.guild.roles.find(r => r.name === config.muteRole);
        if (!rUser.roles.has(role.id)) { embed.setDescription(msgs[0]); return message.channel.send(embed); };
        if (!role) {
            role = await message.guild.createRole({
                name: config.muterole,
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        };
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
        rUser.removeRole(role);
        client.mutes.delete(`time_${rUser.id}`);
        client.mutes.delete(`guild_${rUser.id}`);

        embed.addField(msgs[1], `${rUser}`); 
        logschannel.send(embed);
        return message.channel.send(embed).then(msg => msg.delete(60*1000));
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
    name: 'unmute',
    aliases: ['снятьмут']
};