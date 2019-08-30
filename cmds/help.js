//Завершено

const Discord = module.require(`discord.js`);

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.info.help + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');

        let emb = new Discord.RichEmbed()
            .setAuthor(used, message.author.avatarURL)
            .setDescription("Help")
            .setColor('#f646ff')
            .addField(`**:dollar: ${msgs[0]}**`, '``add`` ``bonus`` ``casino`` ``clan`` ``pay`` ``profile`` ``shop`` ``set`` ``marks`` ``work`` ``groll`` ``lroll``')
            .addField(`**:gun: ${msgs[1]}**`, '``ban`` ``clear`` ``kick`` ``say`` ``mute`` ``unmute`` ``warn`` ``unwarn`` ``report`` ``autorole`` ``welcomemessage`` ``createstats`` ``roomcreator`` ``cmdchannel`` ``sh`` ``voiceonline`` ``blockinvites`` ``joinleave`` ``bug`` ``ot``')
            .addField(`**:desktop: ${msgs[2]}**`, '``avatar`` ``help`` ``info`` ``ping`` ``invite`` ``userinfo`` ``serverinfo`` ``createstats`` ``botstats``')
            .addField(`**:tada: ${msgs[3]}**`, '``cat`` ``dog`` ``fox`` ``kiss`` ``slap`` ``roll`` ``ms`` ``marry`` ``like`` ``chat`` ``textfilp`` ``play``')
            .setFooter(`${msgs[4]}`)
            .setThumbnail('https://discordemoji.com/assets/emoji/6406_thonk_tree.gif');
        message.channel.send(emb)

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
    name: `help`,
    aliases: [`h`, `помощь`, 'хелп', 'хэлп', 'помогите', 'помогающий', 'помогатор', 'помогитехристаради', 'помощник', 'помогать', 'спасите', 'нупомогите']
};