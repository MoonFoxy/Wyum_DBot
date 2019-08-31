const Discord = module.require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.economy.work + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');

        let userid = message.author.id;
        let curwork = client.profile.fetch(`work_${userid}`);
        let cwork = client.worklist[curwork]
        let str = String(client.worklist[curwork].works - client.profile.fetch(`worked_${userid}`));
        let s = ms(((60 / 60) / 1000) - (Date.now() - client.profile.fetch(`workCooldown_${userid}`)), {
            long: true
        });

        let embed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle('**Работа | Job**')
            .setFooter(ntf, client.user.avatarURL)
            .setColor('RANDOM')

        if (client.profile.fetch(`workCooldown_${userid}`) > Date.now()) {
            embed.setDescription(msgs[0]);
            return message.channel.send(embed);
        }
        client.profile.add(`worked_${userid}`, 1);
        if (client.profile.fetch(`worked_${userid}`) >= (client.worklist[curwork].works - 1)) client.profile.add(`work_${userid}`, 1)
        if (str >= 10) str.slice(str.length - 1);
        let raz = parseInt(str);
        if (raz == 1 || raz == 5 || raz == 6 || raz == 7 || raz == 8 || raz == 9 || raz == 0) raz = msgs[1];
        else raz = msgs[2];
        embed.setDescription(`${msgs[3]} ${raz}`);
        console.log(Math.floor(cwork.addCoins));
        console.log(client.profile.fetch(`coins_${userid}`));
        client.profile.add(`coins_${userid}`, Math.floor(cwork.addCoins));
        client.profile.set(`workCooldown_${userid}`, Date.now() + 1000 * 60 * 60);

        message.channel.send(embed);

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
    name: 'work',
    aliases: ['работа', 'работать', 'w']
};