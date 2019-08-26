//Завершено

const Discord = module.require("discord.js");


module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.profile + '`');
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
        let noMoney = lang.noMoney;

        let us = message.mentions.users.first() || message.author;
        let coins = client.profile.fetch(`coins_${us.id}`);
        let warns = client.lprofile.fetch(`warns_${us.id}_${message.guild.id}`);
        let lvl = client.profile.fetch(`lvl_${us.id}`);
        let xp = client.profile.fetch(`xp_${us.id}`);
        let rep = client.profile.fetch(`rep_${us.id}`);
        let messages = client.profile.fetch(`messages_${us.id}`);
        let admin = client.profile.fetch(`admin_${us.id}`);
        let lcoins = client.lprofile.fetch(`coins_${us.id}_${message.guild.id}`);
        let likes = client.profile.fetch(`likes_${us.id}`);
        let clan = client.profile.fetch(`clan_${us.id}`);
        let partner = client.profile.fetch(`partner_${us.id}`);
        let marks = client.profile.fetch(`marks_${us.id}`);
        let work = client.profile.fetch(`work_${us.id}`);
        let votes = client.profile.fetch(`votes_${us.id}`);

        if (coins === null) await client.profile.set(`coins_${us.id}`, 0);
        if (lvl === null) await client.profile.set(`lvl_${us.id}`, 1);
        if (xp === null) await client.profile.set(`xp_${us.id}`, 0);
        if (rep === null) await client.profile.set(`rep_${us.id}`, 0);
        if (messages === null) await client.profile.set(`messages_${us.id}`, 0);
        if (admin === null) await client.profile.set(`admin_${us.id}`, 0);
        if (lcoins === null) await client.lprofile.set(`coins_${us.id}_${message.guild.id}`, 0);
        if (warns === null) await client.lprofile.set(`warns_${us.id}_${message.guild.id}`, 0);
        if (likes === null) await client.profile.set(`likes_${us.id}`, 0);
        if (marks === null) await client.profile.set(`marks_${us.id}`, '🐴 ');
        if (work === null) await client.profile.set(`work_${us.id}`,0);
        if (votes = null)await client.profile.set(`votes_${us.id}`,0);
        if (clan === null) clan = msgs[0];
        if (partner != null) {partner = client.users.get(partner); partner = partner.tag};
        if (partner === null) partner = msgs[0];
        coins = client.profile.fetch(`coins_${us.id}`);
        warns = client.lprofile.fetch(`warns_${us.id}_${message.guild.id}`);
        lvl = client.profile.fetch(`lvl_${us.id}`);
        xp = client.profile.fetch(`xp_${us.id}`);
        rep = client.profile.fetch(`rep_${us.id}`);
        messages = client.profile.fetch(`messages_${us.id}`);
        admin = client.profile.fetch(`admin_${us.id}`);
        lcoins = client.lprofile.fetch(`coins_${us.id}_${message.guild.id}`);
        likes = client.profile.fetch(`likes_${us.id}`);
        marks = client.profile.fetch(`marks_${us.id}`);
        work = client.profile.fetch(`work_${us.id}`);
        votes = client.profile.fetch(`votes_${us.id}`);

        let embed = new Discord.RichEmbed()
            .setTitle(`**${us.tag}**`)
            .setThumbnail('https://discordemoji.com/assets/emoji/1438_aSpookyDance.gif')
            .setColor(`#63145a`)
            .addField(`:moneybag: ${msgs[1]}`, coins, true)
            .addField(`:money_with_wings: ${msgs[2]}`, lcoins, true)
            .addField(`:triangular_flag_on_post: ${msgs[3]}`, warns)
            .addField(`:bar_chart: ${msgs[4]}`, lvl, true)
            .addField(`:spy: ${msgs[5]}`, `${xp}/${lvl * 5}`, true)
            .addField(`:boom: ${msgs[6]}`, `${rep}`)
            .addField(`:japanese_ogre: ${msgs[7]}`, clan, true)
            .addField(`:couple_with_heart: ${msgs[8]}`, partner, true)
            .addField(`:e_mail: ${msgs[9]}`, messages)
            .addField(`:heart: ${msgs[10]}`, likes, true)
            .addField(`:military_medal: ${msgs[11]}`, marks, true)
            .addField(`⛏ ${msgs[12]}`,client.worklist[work].name)
            .addField(`:military_medal: ${msgs[13]}`,votes)
            .setFooter(ntf, message.author.avatarURL);
        if (admin == 1) embed.addField(`:spy: Вы администратор бота`, `А другие нет)`, true)
        client.send(embed);
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
    };

};
module.exports.help = {
    name: "profile",
    aliases: ["p", 'профиль', 'я', 'моястата', 'моястатистика']
};