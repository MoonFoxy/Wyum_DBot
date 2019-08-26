const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        let config = require('../config.json');
        let lang = require(`../lang_${client.lang}.json`);
        let evaled = eval('`' + lang.economy.shop + '`');
        let ntf = eval('`' + lang.other.ntf + '`');
        let msgs = evaled.split('<>');
        let alert = lang.alert;
        let noNum = alert.noNum;
        let noPerm = alert.noPerm;
        let noMoney = alert.noMoney;

        let getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]);
        let roles = client.guild.fetch(`shop_${message.guild.id}`);
        let prices = client.guild.fetch(`prices_${message.guild.id}`);
        let x = Math.floor(args[0] - 1);
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        let embed = new Discord.RichEmbed()
            .setTitle(msgs[0])
            .setColor('#F9423A')

        switch (args[0].toLowerCase()) {
            case 'add':
                if (!message.member.hasPermission("MANAGE_ROLES")) { embed.setDescription(noPerm); return client.send(embed); }
                if (!args[1]) { embed.setDescription(msgs[2]); return client.send(embed); }
                if (!args[2]) { embed.setDescription(msgs[3]); return client.send(embed); }
                if (!isNumeric(args[2])) { embed.setDescription(msgs[3]); return client.send(embed); }
                if (!getRole) { embed.setDescription(msgs[2]); return client.send(embed); }
                client.guild.push(`shop_${message.guild.id}`, `${getRole.id}b`)
                client.guild.push(`prices_${message.guild.id}`, `${Math.floor(args[2])}b`)
                embed.setColor('#FFA420');
                embed.setDescription(msgs[4]);
                return client.send(embed);
            
            case 'clear':
                if (!message.member.hasPermission("ADMINISTRATOR")) { embed.setDescription(noPerm); return client.send(embed); }
                client.guild.delete(`shop_${message.guild.id}`)
                client.guild.delete(`prices_${message.guild.id}`)
                embed.setDescription(msgs[5]);
                return client.send(embed);
            
            case 'buy':
                if (isNumeric(args[1])) {
                    Math.floor(args[1])
                    if (args[1] > roles.length) { embed.setDescription(`Вы ввели слишком большое число | You > num ya hz inglish`); return client.send(embed); }
                    if (args[1] <= 0) { embed.setDescription(`Вы ввели слишком маленькое число | You < num ya hz inglish`); return client.send(embed); }
                    if (roles[x]) {
                        if (client.lprofile.fetch(`coins_${message.author.id}_${message.guild.id}`) < parseInt(prices[x])) { embed.setDescription(noMoney); return client.send(embed); }
                        let role = message.guild.roles.get(`${(roles[x].slice(0, -1))}`);
                        if (!role) { embed.setDescription(`Роль была удалена | Role deleted`); return client.send(embed); }
                        if (message.member.roles.has(role.id)) { embed.setDescription(`Вы уже купили эту роль | You arleady buy thus role`); return client.send(embed); }
                        client.lprofile.subtract(`coins_${message.author.id}_${message.guild.id}`, parseInt(prices[x].slice(0, -1)))
                        message.member.addRole(role);
                        embed.setColor('#FFA420');
                        embed.setDescription(`${msgs[9]} ${role}`);
                        return client.send(embed);
                    }
                } else {
                    embed.setDescription(`${noNum}`);
                    return message.channel.send()
                }

                default:
                embed.setColor('#FFA420');
                if (roles == null || roles[0] == '') { embed.setDescription(msgs[1]); return client.send(embed); }
                for (let i = 0; i < roles.length; i++) {
                    let role = message.guild.roles.get(`${(roles[i].slice(0, -1))}`);
                    if (!role) { role = 'deleted-role'; embed.addField(`**[${i + 1}]** ${role}`, `${parseInt(prices[i]).toLocaleString()}`) }
                    else embed.addField(`**[${i + 1}]** ${role.name}`, `${parseInt(prices[i]).toLocaleString()}`, true)
                }
                return client.send(embed)
            
        }

    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
            .setTitle(`${err[0]}`)
            .setColor('#F9423A')
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        client.send(errEmb);
        console.log(err.stack);
    }

};
module.exports.help = {
    name: "shop",
    aliases: ["магазин", 'шоп', 'жопа']
};