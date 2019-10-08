//Завершено

const Discord = module.require('discord.js');
let search = require('yt-search');

module.exports.run = async (client, message, args) => {

        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let errz = lang.err;
        let msg = args.join(' ')
        search(msg, function (err, res) {
            if (err) return;
            let videos = res.videos
            let firstResult = videos[0]
            let commandFile = require('./play.js');
            commandFile.run(client, message, [firstResult.url]);



        });


};
module.exports.help = {
    name: 'search',
    aliases: ['поиск', 'искать']
};