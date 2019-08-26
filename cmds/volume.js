//Завершено

const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        let fetched = client.active.get(message.guild.id);
        let embed = new Discord.RichEmbed()
            .setTitle("**Музыка - this is russian**")
            .setColor('#e22216');
        if (!fetched) { embed.setDescription('**Треков не обнаружено | No music**'); return message.channel.send(embed); };
        let config = require('../config.json');
        let getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]);
        let roles = client.guild.fetch(`shop_${message.guild.id}`);
        let prices = client.guild.fetch(`prices_${message.guild.id}`);
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.volume + '`');
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


        if (message.member.voiceChannel !== message.guild.me.voiceChannel) { embed.setDescription('**Вы не можете управлять музыкой из другого канала**'); return message.channel.send(embed); };
        if (isNaN(args[0])) { embed.setDescription(noNum); return message.channel.send(embed); }

        fetched.dispatcher.setVolume(args[0] / 100);

        embed.setColor('fae7b5'); embed.setDescription(msgs[0]); return message.channel.send(embed);


    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
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
    name: "volume",
    aliases: ["громкость"]
};