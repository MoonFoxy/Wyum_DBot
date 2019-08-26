
const Discord = module.require('discord.js');
const ms = require('ms');
module.exports.run = async (client, message, args) => {
    try {
        let userid = message.author.id;
        let curwork = client.profile.fetch(`work_${userid}`);
        let cwork = client.worklist[curwork]
        let str = String(client.worklist[curwork].works - client.profile.fetch(`worked_${userid}`));
        let s = ms(((60 / 60) / 1000) - (Date.now() - client.profile.fetch(`workCooldown_${userid}`)),{long:true});
        let config = require('../config.json');
        let getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]);
        let roles = client.guild.fetch(`shop_${message.guild.id}`);
        let prices = client.guild.fetch(`prices_${message.guild.id}`);
        let lang = require(`../lang_${client.lang}.json`);
        let otherlang = require(`../lang_${client.lang}.json`);
        let olang = otherlang.casino.split('<>');
        let evaled = eval('`' + lang.work + '`');
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
          let raz ;
        let embed = new Discord.RichEmbed()
            .setTitle("**Работа | Job**")
            .setFooter(ntf, message.author.avatarURL)
            .setColor('RANDOM')
        if (client.profile.fetch(`workCooldown_${userid}`) > Date.now()) { embed.setDescription(msgs[0]);return message.channel.send(embed);}
        client.profile.add(`worked_${userid}`, 1);
        if(client.profile.fetch(`worked_${userid}`)>=(client.worklist[curwork].works-1)) client.profile.add(`work_${userid}`,1)
        if(str>=10)str.slice(str.length-1);
        raz = parseInt(str);
        if(raz == 1 || raz == 5 || raz == 6 || raz == 7 || raz == 8 || raz == 9 || raz == 0) raz = msgs[1];else raz = msgs[2]
        embed.setDescription(`${msgs[3]} ${raz}`)
        console.log(Math.floor(cwork.addCoins))
        console.log(client.profile.fetch(`coins_${userid}`))
        client.profile.add(`coins_${userid}`, Math.floor(cwork.addCoins));
        client.profile.set(`workCooldown_${userid}`, Date.now()+1000*60*60);
      
        message.channel.send(embed);

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
    }
};
module.exports.help = {
    name: "work",
    aliases: ["работа", "работать", "w"]
};