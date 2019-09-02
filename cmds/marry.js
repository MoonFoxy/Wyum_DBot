//Завершено

const Discord = module.require(`discord.js`);
module.exports.run = async (client, message, args) => {
    try {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
        let config = require('../config.json');
        let partner = client.users.get(client.profile.fetch(`partner_${message.author.id}`))
        let sender = client.profile.fetch(`sender_${message.author.id}`);
        let lang = require(`../lang_${client.lang}.json`);
        console.log(lang.marry.split('<>'))
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.marry + '`');
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
            .setColor('#c71585')
            .setFooter(ntf)
        if (!args[0]) {
            if (client.profile.fetch(`partner_${message.author.id}`) != null) {
                let partner = client.users.get(client.profile.fetch(`partner_${message.author.id}`))
                embed.setDescription(`${msgs[1]}`);
                return message.channel.send(embed);
            } else {
                let sender = client.profile.fetch(`sender_${message.author.id}`);
                if (sender == null) embed.setDescription(msgs[2]);
                else {
                    sender = client.users.get(`${client.profile.fetch(`sender_${message.author.id}`)}`);
                    sender = sender.tag;
                    embed.setDescription(msgs[3]);
                }
                return message.channel.send(embed);
            }
        }
        switch (args[0]) {
            case 'send':
                if (!args[1]) {
                    embed.setColor('#e22216');
                    embed.setDescription(noUser);
                    return message.channel.send(embed);
                }
                let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                if (!rUser) {
                    embed.setColor('#e22216');
                    embed.setDescription(noUser);
                    return message.channel.send(embed);
                }

                if (client.profile.fetch(`partner_${message.author.id}`) != null) {
                    embed.setColor('#e22216');
                    embed.setDescription(msgs[4]);
                    return message.channel.send(embed);
                }
                if (rUser.id == message.author.id) {
                    embed.setColor('#e22216');
                    embed.setDescription(msgs[5]);
                    return message.channel.send(embed);
                }
                if (client.profile.fetch(`partner_${rUser.id}`) != null) {
                    embed.setColor('#e22216');
                    embed.setDescription(msgs[6]);
                    return message.channel.send(embed);
                }
                if (client.profile.fetch(`sended_${rUser.id}`) != null || client.profile.fetch(`sender_${rUser.id}`) != null) {
                    embed.setColor('#e22216');
                    embed.setDescription(msgs[7]);
                    return message.channel.send(embed);
                }
                if (client.profile.fetch(`sended_${message.author.id}`) != null) {
                    embed.setColor('#e22216');
                    embed.setDescription(msgs[8]);
                    return message.channel.send(embed);
                }
                if (client.profile.fetch(`sender_${message.author.id}`) != null) {
                    embed.setColor('#e22216');
                    embed.setDescription(msgs[9]);
                    return message.channel.send(embed);
                }
                client.profile.set(`sended_${message.author.id}`, rUser.id)
                client.profile.set(`sender_${rUser.id}`, message.author.id)
                embed.setDescription(msgs[10]);
                message.channel.send(embed);
                break;

            case 'accept':
                if (client.profile.fetch(`sender_${message.author.id}`) == null || client.profile.fetch(`partner_${message.author.id}`) != null) {
                    embed.setColor('#e22216');
                    embed.setDescription(msgs[11]);
                    return message.channel.send(embed);
                }
                let sender = client.users.get(client.profile.fetch(`sender_${message.author.id}`))
                embed.setDescription(msgs[12]);
                client.profile.delete(`sender_${message.author.id}`);
                client.profile.set(`partner_${message.author.id}`, sender.id);
                client.profile.delete(`sended_${message.author.id}`);
                client.profile.delete(`sender_${sender.id}`);
                client.profile.set(`partner_${sender.id}`, message.author.id);
                client.profile.delete(`sended_${sender.id}`);
                message.channel.send(embed);
                break;
            case `divorce`:
                if (client.profile.fetch(`partner_${message.author.id}`) == null) {
                    embed.setColor('#e22216');
                    embed.setDescription(msgs[13]);
                    return message.channel.send(embed);
                }
                let partner = client.users.get(client.profile.fetch(`partner_${message.author.id}`))
                client.profile.delete(`partner_${message.author.id}`);
                client.profile.delete(`partner_${partner.id}`);
                embed.setDescription(`Вы развелись с: ${partner.tag} | You divorced: ${partner.tag} `);
                message.channel.send(embed);
                break;
            case 'cancel':
                if (client.profile.fetch(`sender_${message.author.id}`) == null && client.profile.fetch(`sended_${message.author.id}`) == null) {
                    embed.setColor('#e22216');
                    embed.setDescription(msgs[14]);
                    return message.channel.send(embed);
                }
                let senderz = client.users.get(client.profile.fetch(`sender_${message.author.id}`)) || client.users.get(client.profile.fetch(`sended_${message.author.id}`));
                await client.profile.delete(`sender_${senderz.id}`);
                await client.profile.delete(`sended_${senderz.id}`);
                await client.profile.delete(`sender_${message.author.id}`);
                await client.profile.delete(`sended_${message.author.id}`);
                embed.setDescription(msgs[15]);
                message.channel.send(embed);
                break;
            default:
                embed.setDescription(msgs[16]);
                message.channel.send(embed)
                break
        }
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
    name: `marry`,
    aliases: [`свадьба`, 'жениться', 'женица', 'пожениться', 'поженица', 'жену', 'найтижену', 'хочужену', 'мояжена', 'муж', 'моймуж', 'найтимужа', 'гейскиеотношения']
};