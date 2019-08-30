const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.fun.casino + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noMoney = alert.noMoney;
        let toUse = alert.toUse;

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        let wrong = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor(config.color.red)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (client.guild.fetch(`casino_${message.guild.id}`) == false) {
            wrong.setDescription(msgs[6]);
            return message.channel.send(wrong);
        };

        if (!args[0]) {
            wrong.setDescription(`*${msgs[1]}*\n*${toUse}${config.prefix}casino l sum*`);
            return message.channel.send(wrong);
        };

        let gived;
        let clpr;

        switch (args[0].toLowerCase()) {
            case 'l':
            case 'л':
                gived = `coins_${message.author.id}_${message.guild.id}`;
                clpr = client.lprofile;
                break;
            case 'g':
            case 'г':
                gived = `coins_${message.author.id}`;
                clpr = client.profile;
                break;
            default:
                wrong.setDescription(`*${msgs[1]}*\n*${toUse}${config.prefix}casino l sum*`);
                return message.channel.send(wrong);
        };

        let coins = clpr.fetch(`${gived}`);

        let slot = ['🍒', '🍊', '🍋', '🍉', '🍌', '🍏'];
        let rand1 = Math.floor(Math.random() * (slot.length - 0) + 0);
        let rand2 = Math.floor(Math.random() * (slot.length - 0) + 0);
        let rand3 = Math.floor(Math.random() * (slot.length - 0) + 0);
        let result = slot[rand1] + slot[rand2] + slot[rand3];

        let uCoins = coins;
        let coef1 = 2;
        let coef2 = 3;

        if (!clpr) return;
        if (!gived) return;

        if (uCoins === null) return;
        if (!isNumeric(Math.floor(parseInt(args[1])))) {
            wrong.setDescription(msgs[3]);
            return message.channel.send(wrong);
        };

        if (!args[1]) {
            wrong.setDescription(msgs[3]);
            return message.channel.send(wrong);
        };

        if (uCoins < Math.floor(parseInt(args[1]))) {
            wrong.setDescription(`${noMoney} **${coins}**`);
            return message.channel.send(wrong);
        };

        if (Math.floor(parseInt(args[1])) < 10) {
            wrong.setDescription(`${msgs[2]} 10`);
            return message.channel.send(wrong);
        };

        let bembed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**${msgs[0]}**`)
            .setColor(config.color.purple)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (rand1 == rand2 || rand2 == rand3) {
            bembed.setDescription(`🎰**${msgs[0]}**🎰\n${result}\n🎰**${msgs[0]}**🎰\n ${msgs[4]} ${Math.floor(parseInt(args[1]) * coef1)}`);
            clpr.add(`${gived}`, Math.floor(parseInt(args[1])));
            message.channel.send(bembed);
        } else if (rand1 == rand2 && rand2 == rand3) {
            bembed.setDescription(`🎰**${msgs[0]}**🎰\n${result}\n🎰**${msgs[0]}**🎰\n ${msgs[4]} ${Math.floor(parseInt(args[1]) * coef2)}`);
            clpr.add(`${gived}`, Math.floor(parseInt(args[1]) * coef1));
            message.channel.send(bembed);
        } else {
            bembed.setDescription(`🎰**${msgs[0]}**🎰\n${result}\n🎰**${msgs[0]}**🎰\n ${msgs[5]} ${Math.floor(parseInt(args[1]))}`);
            clpr.subtract(`${gived}`, Math.floor(parseInt(args[1])));
            message.channel.send(bembed);
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
    name: "casino",
    aliases: ["c", "cs", "cas", "казино"]
};