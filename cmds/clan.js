//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.other.clan + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let noUser = lang.noUser;

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
        let clanname = args.slice(1).join(` `);
        let clan = client.profile.fetch(`clan_${message.author.id}`)
        let coins = client.profile.fetch(`coins_${message.author.id}`)
        let clancost = 250000;

        let clanemb = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`${msgs[0]}`)
            .setColor(config.color.cyan)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (!args[0]) {
            if (client.clan.fetch(`${clan}_money`) === null) {
                client.profile.delete(`clan_${message.author.id}`);
                client.clan.delete(`${clan}_bans_${message.author.id}`)
            }
            clan = await client.profile.fetch(`clan_${message.author.id}`)
            if (clan === null) {
                clanemb.setDescription(`${msgs[1]}`);
                return message.channel.send(clanemb);
            }
            let money;
            let members = client.clan.fetch(`${clan}_members`);
            let messages = client.clan.fetch(`${clan}_messages`)
            let owner = client.users.get(client.clan.fetch(`${clan}_admin`))
            for (let i = 0; i < members.length; i++) {
                let user = client.users.get(members[i].slice(0, -1));
                if (!user) continue;
                let userCoins = await client.profile.fetch(`coins_${user.id}`);
                if (userCoins === null) continue;
                money += userCoins;
            }

            clanemb.setTitle(`**${clan}**`);
            clanemb.addField(`${msgs[2]}`, members, true);
            clanemb.addField(`${msgs[3]}`, messages, true);
            clanemb.setFooter(`${msgs[4]}` + owner.tag);
            message.channel.send(clanemb)
        } else if (args[0].toLowerCase() == 'create') {

            if (coins < clancost) {
                clanemb.setDescription(`${msgs[5]} **${clancost.toLocaleString()}$**`);
                return message.channel.send(clanemb);
            }
            if (clan != null) {
                clanemb.setDescription(`${msgs[6]}`);
                return message.channel.send(clanemb);
            }
            if (!clanname) {
                clanemb.setDescription(`${msgs[7]}`);
                return message.channel.send(clanemb);
            }
            let created = client.clan.fetch(clanname);
            if (created === null) {
                clanemb.setDescription(`${msgs[8]} **${clanname}**'`)

                client.profile.subtract(`coins_${message.author.id}`, clancost)
                client.profile.set(`clan_${message.author.id}`, clanname)
                client.clan.set(`${clanname}_admin`, message.author.id);
                client.clan.set(`${clanname}_money`, coins);
                client.clan.set(`${clanname}_messages`, 1);
                client.clan.set(`${clanname}_members`, 1);

                message.channel.send(clanemb)
            } else {
                message.channel.send(`${msgs[9]}`);
            };
        } else if (args[0].toLowerCase() == 'go') {

            if (clan != null) {
                clanemb.setDescription(`${msgs[6]}`);
                return message.channel.send(clanemb);
            }
            if (!clanname) {
                clanemb.setDescription(`${msgs[10]}`);
                return message.channel.send(clanemb);
            }
            if (client.clan.fetch(`${clanname}_admin`) === null) {
                clanemb.setDescription(`${msgs[11]}`);
                return message.channel.send(clanemb);
            }
            let bans = client.clan.fetch(`${clanname}_bans_${message.author.id}`);
            if (bans != null) {
                clanemb.setDescription(`${msgs[12]}`);
                return message.channel.send(clanemb);
            }
            client.profile.set(`clan_${message.author.id}`, clanname)
            client.clan.add(`${clanname}_members`, 1);
            clanemb.setDescription(`${msgs[13]}`);
            return message.channel.send(clanemb);


        } else if (args[0].toLowerCase() == 'help') {
            clanemb.addField("**create**", `${msgs[14]} ${clancost.toLocaleString()}`)
            clanemb.addField("**help**", `${msgs[15]}`)
            clanemb.addField("**leave**", `${msgs[16]}`)
            clanemb.addField("**go**", `${msgs[17]}`)
            clanemb.addField("**kick**", `${msgs[18]}`);
            clanemb.addField("**ban**", `${msgs[19]}`)
            clanemb.addField("**unban**", `${msgs[20]}`)
            clanemb.addField("**delete**", `${msgs[21]}`)
            message.channel.send(clanemb)
        } else if (args[0].toLowerCase() == 'ban') {
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if (clan === null) {
                clanemb.setDescription(`${msgs[1]}`);
                return message.channel.send(clanemb);
            }
            if (!args[1]) {
                clanemb.setDescription(noUser);
                return message.channel.send(clanemb);
            }
            if (!rUser) {
                clanemb.setDescription(noUser);
                return message.channel.send(clanemb);
            }
            let cal = client.clan.fetch(`${clan}_admin`);
            if (cal != message.author.id) {
                clanemb.setDescription(`${msgs[22]}`);
                return message.channel.send(clanemb);
            }
            if (rUser.id == message.author.id) {
                clanemb.setDescription(`${msgs[23]}`);
                return message.channel.send(clanemb);
            }
            if (client.clan.fetch(`${clan}_bans_${rUser.id}`) != null) {
                clanemb.setDescription(`${msgs[24]}`);
                return message.channel.send(clanemb);
            }
            if (client.profile.fetch(`clan_${rUser.id}`) == clan) {
                client.profile.delete(`clan_${rUser.id}`)
                client.clan.set(`${clan}_bans_${rUser.id}`, 1)
                client.clan.subtract(`${clan}_members`, 1);
                clanemb.setDescription(`${msgs[25]}`);
                return message.channel.send(clanemb);

            } else {
                client.clan.set(`${clan}_bans_${rUser.id}`, 1)
                clanemb.setDescription(`${msgs[25]}`);
                return message.channel.send(clanemb);
            };
        } else if (args[0].toLowerCase() == 'unban') {
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if (clan === null) {
                clanemb.setDescription(`${msgs[1]}`);
                return message.channel.send(clanemb);
            }
            if (!args[1]) {
                clanemb.setDescription(noUser);
                return message.channel.send(clanemb);
            }
            if (!rUser) {
                clanemb.setDescription(noUser);
                return message.channel.send(clanemb);
            }
            let cal = client.clan.fetch(`${clan}_admin`);
            if (cal != message.author.id) {
                clanemb.setDescription(`${msgs[22]}`);
                return message.channel.send(clanemb);
            }
            let banned = client.clan.fetch(`${clan}_bans_${rUser.id}`);
            if (banned === null) {
                clanemb.setDescription(`${msgs[26]}`);
                return message.channel.send(clanemb);
            }
            client.clan.delete(`${clan}_bans_${rUser.id}`);
            clanemb.setDescription("Успешно/Succes!");
            return message.channel.send(clanemb);

        } else if (args[0].toLowerCase() == 'kick') {
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if (clan === null) {
                clanemb.setDescription(`${msgs[1]}`);
                return message.channel.send(clanemb);
            }
            if (!args[1]) {
                clanemb.setDescription(noUser);
                return message.channel.send(clanemb);
            }
            if (!rUser) {
                clanemb.setDescription(noUser);
                return message.channel.send(clanemb);
            }
            let cal = client.clan.fetch(`${clan}_admin`);
            if (cal != message.author.id) {
                clanemb.setDescription(`${msgs[22]}`);
                return message.channel.send(clanemb);
            }
            client.profile.delete(`clan_${rUser.id}`);
            clanemb.setDescription(`${msgs[27]}`);
            client.clan.subtract(`${clan}_members`, 1);
            return message.channel.send(clanemb);

        } else if (args[0].toLowerCase() == 'leave') {
            if (clan === null) {
                clanemb.setDescription(`${msgs[1]}`);
                return message.channel.send(clanemb);
            }
            let cal = client.clan.fetch(`${clan}_admin`);
            if (cal == message.author.id) {
                clanemb.setDescription(`${msgs[28]}`);
                return message.channel.send(clanemb);
            }
            client.clan.subtract(`${clan}_members`, 1);
            client.profile.delete(`clan_${message.author.id}`);
            clanemb.setDescription(`${msgs[29]}`);
            return message.channel.send(clanemb);

        } else if (args[0].toLowerCase() == 'delete') {
            if (clan === null) {
                clanemb.setDescription(`${msgs[1]}`);
                return message.channel.send(clanemb);
            }
            let cal = client.clan.fetch(`${clan}_admin`);
            if (cal != message.author.id) {
                clanemb.setDescription(`${msgs[22]}`);
                return message.channel.send(clanemb);
            }
            clanemb.setDescription(`${msgs[15]}`);
            client.profile.delete(`clan_${message.author.id}`)
            client.clan.delete(`${clanname}_admin`);
            client.clan.delete(`${clanname}_money`);
            client.clan.delete(`${clanname}_messages`);
            client.clan.delete(`${clanname}_members`);
            return message.channel.send(clanemb);

        } else if (args[0].toLowerCase() == 'info') {
            if (!args[1]) {
                clanemb.setDescription("Укажите название клана/Enter the name of the clan");
                return message.channel.send(clanemb);
            }
            if (client.clan.fetch(`${clanname}_money`) == null) {
                clanemb.setDescription(`${msgs[11]}`);
                return message.channel.send(clanemb);
            }
            clanemb.addField(`${msgs[2]}`, client.clan.fetch(`${clanname}_members`))
            clanemb.addField(`${msgs[3]}`, client.clan.fetch(`${clanname}_messages`))
            let ow = client.users.get(client.clan.fetch(`${clanname}_admin`))
            clanemb.addField(`${msgs[4]}`, ow.tag)

            message.channel.send(clanemb);
        };

    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin);
        let errEmb = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`${err[0]}`)
            .setColor(config.color.red)
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
            .setTimestamp();

        message.channel.send(errEmb);
        console.log(err.stack);
    };
};
module.exports.help = {
    name: "clan",
    aliases: ["клан"]
};