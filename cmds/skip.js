//Завершено

const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    try {

        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.skip + '`');
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
        let x = Math.floor(args[0] - 1);
        let embed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle("**Hello world**")
            .setColor('#e22216')
            .setFooter(ntf, client.user.avatarURL);
        let fetched = client.active.get(message.guild.id);

        if (!fetched) { embed.setDescription('**Треков не обнаружено** | **No songs**'); return message.channel.send(embed) }
        if (message.member.voiceChannel !== message.guild.me.voiceChannel) { embed.setDescription(msgs[0]); return message.channel.send(embed); }

        let userCount = message.member.voiceChannel.members.size;
        let required = Math.ceil(userCount / 2)

        if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
        if (fetched.queue[0].voteSkips.includes(message.member.id)) { embed.setDescription(`${msgs} ${fetched.queue[0].voteSkips.length}/${required}**`); return message.channel.send(embed); }

        fetched.queue[0].voteSkips.push(message.member.id);

        client.active.set(message.guild.id, fetched);

        if (fetched.queue[0].voteSkips.length >= required) {
            embed.setDescription(msgs[2]);
            message.channel.send(embed);

            return fetched.dispatcher.emit('end');
        }
        embed.setDescription(`${msgs[1]} ${fetched.queue[0].voteSkips.length}/${required}**`);
        return message.channel.send(embed);
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
    };

};
module.exports.help = {
    name: "skip",
    aliases: ["пропуск", 'скип', 'хуита', 'пропустить']
};