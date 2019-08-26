//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]);
        let roles = client.guild.fetch(`shop_${message.guild.id}`);
        let prices = client.guild.fetch(`prices_${message.guild.id}`);
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.welcomemessage + '`');
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
            .setTitle(`**${msgs[2]}**`)
            .setColor('#e22216')
        if (!message.member.hasPermission(`MANAGE_ROLES`)) { embed.setDescription(noPerm); return message.channel.send(embed); }
        if (!args[0]) { embed.setDescription(msgs[0]); return message.channel.send(embed); }
        let msg = args.join(` `);
        if (!msg) { embed.setDescription(msgs[0]); return message.channel.send(embed); }
        client.guild.set(`welcomemessage_${message.guild.id}`, msg);

        embed.setColor('#10e250')
        embed.setDescription(msgs[1])
        embed.setFooter(ntf, message.author.avatarURL)
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
        logschannel.send(embed);
        message.channel.send(embed);
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
    name: "welcomemessage",
    aliases: ["стартовоесообщение", "приветствие", "wm"]
};