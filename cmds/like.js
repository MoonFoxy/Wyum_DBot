//Завершено

const Discord = module.require(`discord.js`);

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.roleplay.like + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noUser = alert.noUser;

        let embed = new Discord.RichEmbed()
            .setTitle(`**${msgs[0]}**`)
            .setColor('#e22216')

        if (!args[0]) { embed.setDescription(noUser); return client.send(embed); }
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!rUser) { embed.setDescription(noUser); return client.send(embed); }
        let liked = client.profile.fetch(`liked_${message.author.id}`);
        let likes = client.profile.fetch(`likes_${rUser.id}`);
        if (rUser.id == message.author.id) { embed.setDescription(msgs[1]); return client.send(embed); };
        if (client.profile.fetch(`lvl_${message.author.id}`) < 10) { embed.setDescription(msgs[2]); return client.send(embed); }
        for (let i = 0; i < liked.length; await i++) {
            if (liked[i] == rUser.id) { embed.setDescription(msgs[3]); return client.send(embed); }
        }
        if (likes === null) await client.profile.set(`likes_${rUser.id}`, 1);
        else { client.profile.add(`likes_${rUser.id}`, 1) }
        client.profile.push(`liked_${message.author.id}`, `${rUser.id}`);
        likes = client.profile.fetch(`likes_${rUser.id}`);
        let bembed = new Discord.RichEmbed()
            .setTitle(`:heart: :heart: :heart: `)
            .setColor('#10e250')
            .setDescription(`${rUser} ${msgs[4]} ${likes}**`)
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
    name: `like`,
    aliases: [`лайк`, 'луйк', 'лыйк', 'луки', 'лаку', 'кула', 'лика', 'лаик', 'лаек', 'луку']
};