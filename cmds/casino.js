//Завершено

const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {

        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.fun.casino + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noPerm = alert.noPerm;
        let noMoney = alert.noMoney;
        
        let guildid = message.guild.id
        let embed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}**`)
            .setColor('#e22216')
        if (client.guild.fetch(`casino_${guildid}`) == false) { embed.setDescription(noPerm); return client.send(embed); }

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        let userid = message.author.id
        let slot = ["🍒", "🍊", "🍋", "🍉", "🍌", "🍏"];

        let rand1 = Math.floor(Math.random() * (slot.length - 0) + 0);
        let rand2 = Math.floor(Math.random() * (slot.length - 0) + 0);
        let rand3 = Math.floor(Math.random() * (slot.length - 0) + 0);

        let result = slot[rand1] + slot[rand2] + slot[rand3];
        if (!args[0]) { embed.setDescription(`${msgs[1]}\n**${config.prefix}casino l 1000**`); return client.send(embed); }
        let bal;
        let adal;
        let cur;
        switch (args[0].toLowerCase()) {
            case 'l':
            case 'л':
                bal = client.lprofile.fetch(`coins_${userid}_${message.guild.id}`);
                adal = `coins_${userid}_${message.guild.id}`
                cur = client.lprofile;
                break;
            case 'g':
            case 'г':
                bal = client.profile.fetch(`coins_${userid}`);
                adal = `coins_${userid}`
                cur = client.profile;
                break;
            default:
                embed.setDescription(`${msgs[1]}\n**${config.prefix}casino l 1000**`);
                return client.send(embed);
        }
        let uCoins = bal
        let coef1 = 2;
        let coef2 = 3;
        console.log(cur.fetch(`${adal}`));
        if (!cur) return;
        if (!adal) return;
        if (uCoins === null) return;
        if (!isNumeric(Math.floor(parseInt(args[1])))) { embed.setDescription(msgs[3]); return client.send(embed); }
        if (!args[1]) { embed.setDescription(msgs[3]); return client.send(embed); }
        if (uCoins < Math.floor(parseInt(args[1]))) { embed.setDescription(`${noMoney} **${bal}**`); return client.send(embed); }
        if (Math.floor(parseInt(args[1])) < 10) { embed.setDescription(`${msgs[2]} 10`); return client.send(embed); }
        const bembed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}**`)
            .setColor('#6600ff')
            .setFooter(ntf, message.author.avatarURL);
        if (rand1 == rand2 || rand2 == rand3) {
            bembed.setDescription(`🎰**${msgs[0]}**🎰\n${result}\n🎰**${msgs[0]}**🎰\n ${msgs[4]} ${Math.floor(parseInt(args[1]) * coef1)}`);
            client.send(bembed);
            cur.add(`${adal}`, Math.floor(parseInt(args[1])));


        } else if (rand1 == rand2 && rand2 == rand3) {

            bembed.setDescription(`🎰**${msgs[0]}**🎰\n${result}\n🎰**${msgs[0]}**🎰\n ${msgs[4]} ${Math.floor(parseInt(args[1]) * coef2)}`);
            client.send(bembed);
            cur.add(`${adal}`, Math.floor(parseInt(args[1]) * coef1))

        } else {
            bembed.setDescription(`🎰**${msgs[0]}**🎰\n${result}\n🎰**${msgs[0]}**🎰\n ${msgs[5]} ${Math.floor(parseInt(args[1]))}`);
            client.send(bembed);
            cur.subtract(`${adal}`, Math.floor(parseInt(args[1])))


        }
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
    name: "casino",
    aliases: ["c", "cs", "cas", "казино"]
};