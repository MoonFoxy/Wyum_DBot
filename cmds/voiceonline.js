//Завершено

const Discord = module.require(`discord.js`);
module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]);
        let roles = client.guild.fetch(`shop_${message.guild.id}`);
        let prices = client.guild.fetch(`prices_${message.guild.id}`);
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.voiceonline + '`');
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
            .setTitle(`**${msgs[0]}**`)
            .setColor('#e22216')
        if (!message.member.hasPermission(`MANAGE_CHANNELS`)) { embed.setDescription(noPerm); return message.channel.send(embed); }
        let voicename = args.join(` `);
        if (!voicename) voicename = 'Voice-Online:'
        message.guild.createChannel(`${voicename} ${message.guild.members.filter(m => m.voiceChannel).size}`, { type: 'voice' }).then(channel => {

            client.guild.set(`voiceOnline_${message.guild.id}`, channel.id);
            client.guild.set(`voiceOnlineText_${message.guild.id}`, voicename);

            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: true,
                CONNECT: false,
            })
        });
        let embeds = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(msgs[0])
            .setColor('#004953')
            .addField(msgs[1], `${voicename} ${message.guild.members.filter(m => m.voiceChannel).size}`)
            .setFooter(ntf, client.user.avatarURL);
        let logsname = 'logs'
        let logschannel = message.guild.channels.get(client.guild.fetch(`logsChannel_${message.guild.id}`));
        if (!logschannel) {
            await message.guild.createChannel(logsname, 'text').then(channel => {

                client.guild.set(`logsChannel_${message.guild.id}`, channel.id);
                channel.overwritePermissions(message.guild.defaultRole, {
                    VIEW_CHANNEL: false,
                });
            });
        }
        logschannel.send(embeds)
        message.channel.send(embeds);
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
    name: `voiceonline`,
    aliases: [`vonline`, 'голосовойонлайн']
};