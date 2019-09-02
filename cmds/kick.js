//Завершено

const Discord = module.require(`discord.js`);

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.moderation.kick + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noPerm = alert.noPerm;
        let noUser = alert.noUser;
        let mod = lang.moderation;
        let reason = mod.reason.split('<>');
        let actions = mod.actions.split('<>');
        let admin = mod.admin.split('<>');

        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`${msgs[0]}`)
            .setColor('#e22216')
        if (!message.member.hasPermission(`KICK_MEMBERS`)) { embed.setDescription(noPerm); return message.channel.send(embed); }

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        let why = args.slice(1).join(` `);
        if (!args[0]) { embed.setDescription(noUser); return message.channel.send(embed); }
        if (!rUser) { embed.setDescription(noUser); return message.channel.send(embed); }
        if (!why) { why = reason[1] }
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
        let bembed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(msgs[0])
            .setColor('#e22216')
            .addField(admin, message.author)
            .addField(actions[1], `${rUser}`)
            .addField(reason[0], why)
            .setFooter(ntf, client.user.avatarURL)
            .setThumbnail('https://discordemoji.com/assets/emoji/1651_BanOVE.gif');

        rUser.send(bembed);
        message.guild.member(rUser).kick(why);
        logschannel.send(bembed)
        message.channel.send(bembed)
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
    name: `kick`,
    aliases: ['кик']
};