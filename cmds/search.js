//Завершено

const Discord = module.require("discord.js");
let search = require('yt-search');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let errz = lang.err;
        let err = errz.split('<>');
        let msg = args.join(' ')
        search(msg, function (err, res) {
            if (err) return;
            let videos = res.videos
            let firstResult = videos[0]
            let commandFile = require('./play.js');
            commandFile.run(client, message, [firstResult.url]);



        });
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
    name: "search",
    aliases: ["поиск", 'искать']
};