const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.economy.add + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noUser = alert.noUser;
        let noNum = alert.noNum;
        let noPerm = alert.noPerm;
        let toUse = alert.toUse;
        let nowMoney = lang.economy.nowMoney;

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
        let res = args.slice(2).join(' ');

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        let wrong = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor(config.color.red)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (!args[0]) {
            wrong.setDescription(`**${noUser}**\n*${toUse}${config.prefix}add @user sum*`);
            return message.channel.send(wrong);
        };

        if (!rUser) {
            wrong.setDescription(`**${noUser}**\n*${toUse}${config.prefix}add @user sum*`);
            return message.channel.send(wrong);
        };

        if (!res || !isNumeric(Math.floor(parseInt(res)))) {
            wrong.setDescription(`**${noNum}**\n*${toUse}${config.prefix}add @user sum*`);
            return message.channel.send(wrong);
        };

        switch (args[0].toLowerCase()) {
            case 'g':
            case 'г':
                let uadmin = client.profile.fetch(`admin_${message.author.id}`);
                if (uadmin != 1) return;

                client.profile.add(`coins_${rUser.id}`, Math.floor(parseInt(res)));
                let coins = client.profile.fetch(`coins_${rUser.id}`);
                if (coins === null) client.profile.set(`coins_${rUser.id}`, 1 + Math.floor(parseInt(res)));
                break;
            case 'l':
            case 'л':
            default:
                if (!message.member.hasPermission('ADMINISTRATOR')) {
                    wrong.setDescription(noPerm);
                    return message.channel.send(wrong);
                };

                client.lprofile.add(`coins_${rUser.id}_${message.guild.id}`, Math.floor(parseInt(res)));
                let coins = client.lprofile.fetch(`coins_${rUser.id}_${message.guild.id}`);
                if (coins === null) client.lprofile.set(`coins_${rUser.id}_${message.guild.id}`, 1 + Math.floor(parseInt(res)));
                break;
        };

        let bembed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setDescription(`**${msgs[0]}**`)
            .setColor(config.color.green)
            .addField(`${msgs[1]} ${rUser.user.tag} ${res} $`, `${nowMoney} ${coins}`)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();
        message.channel.send(bembed);

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
    name: "add",
    aliases: ["добавить"]
};