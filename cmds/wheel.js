const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let rand = Math.floor(Math.random() * (100 - 0) + 0);
        let rand2 = Math.floor(Math.random() * (100 - 10) + 10);
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.fun.wheel + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noMoney = alert.noMoney;
        let noUser = alert.noUser;
        let noNum = alert.noNum;
        let noArgs = alert.noArgs;
        let toUse = alert.toUse;

        let res = args.slice(1).join(' ');
        let bet = Math.floor(parseInt(res));
        let betadd = Math.floor(parseInt(res) * 1.5);

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };


        let wrong = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setField(msgs[0])
            .setColor(config.color.red)
            .setFooter(ntf, client.user.avatarURL)
            .setTimestamp();

        if (!args[0]) {
            wrong.setDescription(`**${noUser}**\n*${toUse}${config.prefix}wheel **l** sum*`);
            return message.channel.send(wrong);
        };

        if (!res || !isNumeric(bet)) {
            wrong.setDescription(`**${noNum}**\n*${toUse}${config.prefix}wheel **l** sum*`);
            return message.channel.send(wrong);
        };

        if (bet <= 10) {
            wrong.setDescription(`${msgs[2]} 10`);
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
                wrong.setDescription(`**${noArgs}**\n*${toUse}${config.prefix}wheel **l** sum*`);
                return message.channel.send(wrong);
        };

        let coins = clpr.fetch(`${gived}`);

        if (coins <= bet) {
            wrong.setDescription(`${noMoney} **${coins}**`);
            return message.channel.send(wrong);
        };

        let bembed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setField(msgs[0])
        .setFooter(ntf, client.user.avatarURL)
        .setTimestamp();

        rand2 + 13;
        if (rand2 > 100) rand2 = 100;
        if (rand <= rand2) {
            bembed.setColor(config.color.red);
            bembed.setDescription(msgs[3]);
            clpr.subtract(`${gived}`, bet);
            message.channel.send(bembed);
        };
        if (rand > rand2) {
            bembed.setColor(config.color.green);
            bembed.setDescription(msgs[4]);
            clpr.add(`${gived}`, betadd - bet);            
            message.channel.send(bembed);
        };

    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.dev);
        let errEmb = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
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
    name: 'wheel',
    aliases: ['колеса', 'таблетки', 'якубович']
};