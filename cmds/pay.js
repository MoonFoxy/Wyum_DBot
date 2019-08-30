//Завершено

const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    try {

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        let acoins = client.lprofile.fetch(`coins_${message.author.id}_${message.guild.id}`);
        let res = args.slice(1).join(" ");
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let ntf = eval('`' + lang.ntf + '`');
        let noUser = lang.noUser;
        let embed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle(`**Pay**`)
            .setFooter(ntf, client.user.avatarURL)
            .setColor('#e22216');
        if (!rUser) { embed.setDescription(`${noUser}`); return message.channel.send(embed); }
        let evaled = eval('`' + lang.pay + '`');
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


        if (!args[0]) { embed.setDescription(`**${noUser}**\n${msgs[0]}`); return message.channel.send(embed); };
        if (!res) { embed.setDescription(`${msgs[0]}`); return message.channel.send(embed); };
        if (!isNumeric(Math.floor(parseInt(res)))) { embed.setDescription(`${msgs[0]}`); return message.channel.send(embed); };
        if (res <= 0) { embed.setDescription(`${msgs[1]}`); return message.channel.send(embed); };
        if (rUser.id == message.author.id) { embed.setDescription(`${msgs[2]}`); return message.channel.send(embed); };
        if (res > acoins) { embed.setDescription(`${msgs[3]}`); return message.channel.send(embed); };
        client.lprofile.subtract(`coins_${message.author.id}_${message.guild.id}`, Math.floor(parseInt(res)))
        client.lprofile.add(`coins_${rUser.id}_${message.guild.id}`, Math.floor(parseInt(res)));
        let coins = client.lprofile.fetch(`coins_${rUser.id}_${message.guild.id}`);
        if (coins === null) client.lprofile.set(`coins_${rUser.id}_${message.guild.id}`, 1 + Math.floor(parseInt(res)));

        let bembed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setDescription("**iPay**")
            .setColor('#10e250')
            .addField(`${msgs[4]}`, `${nowMoney} ${coins}`)
            .setFooter(ntf, client.user.avatarURL);

        message.channel.send(bembed);
    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
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
    name: "pay",
    aliases: ['передать']
};