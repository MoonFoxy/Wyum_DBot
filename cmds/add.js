const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.moderation.add + '`');
        let ntf = eval('`' + lang.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noUser = alert.noUser;
        let noNum = alert.noNum;
        let noPerm = alert.noPerm;
        let nowMoney = lang.economy.nowMoney;
        
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        let embed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}**`)
            .setFooter(ntf, message.author.avatarURL)
            .setColor('#e22216');
        if (!message.member.hasPermission('ADMINISTRATOR')) { embed.setDescription(noPerm); return client.send(embed); }

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let res = args.slice(1).join(" ");

        if (!args[0]) { embed.setColor('#d82d08');embed.setDescription(`**${noUser}**\n*${config.prefix}add @user 500*`); return client.send(embed); };
        if (!rUser) { embed.setColor('#d82d08');embed.setDescription(noUser); return client.send(embed); }
        if (!res) { embed.setColor('#d82d08');embed.setDescription(`**${noNum}**\n*${config.prefix}add @user 500*`); return client.send(embed); };
        if (!isNumeric(res)) { embed.setColor('#d82d08');embed.setDescription(`**${noNum}**\n*${config.prefix}add @user 500*`); return client.send(embed); };
        client.lprofile.add(`coins_${rUser.id}_${message.guild.id}`, Math.floor(parseInt(res)));
        let coins = client.lprofile.fetch(`coins_${rUser.id}_${message.guild.id}`);
        if (coins === null) client.lprofile.set(`coins_${rUser.id}_${message.guild.id}`, 1 + Math.floor(parseInt(res)));

        let bembed = new Discord.RichEmbed()
            .setDescription(`**${msgs[0]}**`)
            .setColor('#10e250')
            .addField(`${msgs[1]} ${rUser.user.tag} ${res} $`, `${nowMoney} ${coins}`)
            .setFooter(ntf, message.author.avatarURL);

        client.send(bembed);
    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
            .setTitle(`${err[0]}`)
            .setColor('#ff2400')
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        client.send(errEmb);
        console.log(err.stack);
    }

};
module.exports.help = {
    name: "add",
    aliases: ["добавить"]
};