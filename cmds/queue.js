//Завершено

const Discord = module.require('discord.js');
const ytdl = require('ytdl-core');

module.exports.run = async (client, message, args) => {
    try {

        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let ntf = eval('`' + lang.ntf + '`');
        let embed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle('Hi everyone')
            .setColor('#e22216')
            .setFooter(ntf, client.user.avatarURL);
        let fetched = client.active.get(message.guild.id);

        if (!fetched) { embed.setDescription('**No tracks found** | **Треков не обнаружено**'); return message.channel.send(embed) }

        let queue = fetched.queue;
        let nowPlaying = queue[0];
        let validate = await ytdl.validateURL(args[0]);
        let data = client.active.get(message.guild.id) || {};
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.play + '`');
        let noUser = lang.noUser;
        let noNum = lang.noNum;
        let noPerm = lang.noPerm;
        let nowMoney = lang.nowMoney;
        let err = lang.err.split('<>');
        let reaso = lang.reason;
        let reason = reaso.split('<>')
        let msgs = evaled.split('<>');
        let actions = lang.actions.split('<>')
        let admin = lang.admin.split('<>')
        let noMoney = lang.noMoney;
        let resp = `${msgs[1]}`

        for (var i = 1; i < queue.length; i++) {
            resp += `${msgs[2]}`
        }
        const bembed = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setTitle('**I\'m love you**')
            .setColor('#6767e0')
            .addField('**Очередь** | **Queue**', resp)
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
    };

};
module.exports.help = {
    name: 'queue',
    aliases: ['очередь', 'играет', 'чтоиграет']
};