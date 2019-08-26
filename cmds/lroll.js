//Завершено
//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {

        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.fun.wheel + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let casino = lang.fun.casino.split('<>');
        let alert = lang.alert;
        let noMoney = alert.noMoney;
    
        let rand = Math.floor(Math.random() * (100 - 0) + 0)
        let rand2 = Math.floor(Math.random() * (100 - 10) + 10)
        let coins = client.lprofile.fetch(`coins_${message.author.id}_${message.guild.id}`)
        let embed = new Discord.RichEmbed()
            .setDescription(msgs[0])
            .setColor('#e22216')
            .setFooter(ntf, message.author.avatarURL)
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        if (!args[0] || !isNumeric(Math.floor(parseInt(args[0])))) { embed.setDescription(casino[3]); return client.send(embed); }
        if (coins <= Math.floor(parseInt(args[0]))) { embed.setDescription(`${noMoney} **${coins}**`); return client.send(embed); }
        if (Math.floor(parseInt(args[0])) <= 10) { embed.setDescription(`${casino[2]} 10`); return client.send(embed); }
        rand2 + 13;
        if (rand2 > 100) rand2 = 100;
        if (rand <= rand2) { embed.setDescription(msgs[2]); client.lprofile.subtract(`coins_${message.author.id}_${message.guild.id}`, Math.floor(parseInt(args[0]))); return client.send(embed); }
        if (rand > rand2) { embed.setColor('#10e250'); embed.setDescription(msgs[3]); client.send(embed); }
        client.lprofile.add(`coins_${message.author.id}_${message.guild.id}`, Math.floor(parseInt(args[0]) * 1.5) - Math.floor(parseInt(args[0])));

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
    name: "lroll",
    aliases: ["лролл", 'лроль', 'лрулетка']
};