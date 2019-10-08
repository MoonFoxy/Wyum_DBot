//Завершено

const Discord = module.require('discord.js');
const ytdl = require('ytdl-core');

module.exports.run = async (client, message, args) => {

        let data = client.active.get(message.guild.id) || {};
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.yt_music.play + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('**Hello World**')
            .setColor('#e22216')
            .setFooter(ntf, client.user.avatarURL);
        if (!message.member.voiceChannel) { embed.setDescription(msgs[0]); return message.channel.send(embed) }
        if (!args[0]) { embed.setDescription(msgs[1]); return message.channel.send(embed) }
        let validate = await ytdl.validateURL(args[0]);
        if (!validate) {
            let commandFile = require('./search.js');
            return commandFile.run(client, message, args);
        }


        if (!data.connection) data.connection = await message.member.voiceChannel.join();
        if (!data.queue) data.queue = [];
        data.guildID = message.guild.id;
        let info = await ytdl.getInfo(args[0]);
        data.queue.push({
            songTitle: info.title,
            requester: message.author.tag,
            url: args[0],
            channel: message.channel.id
        })
        if (!data.dispatcher) play(client, data);
        else {
            embed.setColor('fae7b5'); embed.setDescription(`${msgs[2]} ${data.queue[0].songTitle}** ${msgs[3]}`); return message.channel.send(embed);
        }
        client.active.set(message.guild.id, data);
        async function play(client, data) {
            embed.setColor('fae7b5');
            embed.setDescription(`${msgs[4]}  ${data.queue[0].songTitle}** ${msgs[5]} ***${data.queue[0].requester}***`);
            client.channels.get(data.queue[0].channel).send(embed);
            data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
            data.dispatcher.guildID = data.guildID;
            data.dispatcher.once('end', function () {
                finish(client, this)
            })
        }
        function finish(client, dispatcher) {
            let fetched = client.active.get(dispatcher.guildID);

            fetched.queue.shift();

            if (fetched.queue.length > 0) {
                client.active.set(dispatcher.guildID, fetched);
                play(client, fetched)
            } else {
                client.active.delete(dispatcher.guildID);

                let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
                if (vc) vc.leave();
            }
        }



};
module.exports.help = {
    name: 'play',
    aliases: ['музыка', 'плей', 'музло']
};