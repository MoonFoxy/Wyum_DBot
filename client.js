//Переменные
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
//const DBL = require('dblapi.js');
//const dbl = new DBL(process.env.DBLTOKEN);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
let config = require('./config.json');
let prefix = config.prefix;
client.prefix = prefix;
const active = new Map();
client.active = active;
//--Переменные

//Таблицы
let mutes = new db.table('mutes');
client.mutes = mutes;

let profile = new db.table('profile');
client.profile = profile;

let lprofile = new db.table('lprofile');
client.lprofile = lprofile;

let clientstats = new db.table('clientstats');
client.clientstats = clientstats;

let guild_$ = new db.table('guild');
client.guild = guild_$;

let allclans = new db.table('clan');
client.clan = allclans;
//--Таблицы

//Загрузка команд
fs.readdir('./cmds/', (err, files) => {
    if (err) console.log(err);
    let jsfiles = files.filter(files => files.endsWith('.js'));
    if (jsfiles.length <= 0) console.log('Нет команд для загрузки!');
    console.log(`Загружено ${jsfiles.length} команд`);
    jsfiles.forEach((files, i) => {
        let props = require(`./cmds/${files}`);
        console.log(`${i + 1}.${files} Загружен!`);
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
//--Загрузка команд

//Бот запущен
client.on('ready', () => {
    console.log(`Запустился бот ${client.user.username}`);

    client.generateInvite(['ADMINISTRATOR']).then(link => {
        console.log(link);
    });

    let statuses = [`${prefix}help`, `${client.guilds.size} servers`, `${client.users.size} users`, `Bot by MoonFoxy`];
    let activestatus = statuses[Math.floor(Math.random() * statuses.length)];
    setInterval(function () {
        client.user.setPresence({
            game: {
                name: activestatus,
                status: 'online',
                type: 'STREAMING',
                url: 'https://www.twitch.tv/m0onf0xy'
            }
        });
        client.user.setPresence({
            activity: {
                name: activestatus
            },
            status: 'online'
        });
        //dbl.postStats(client.guilds.size);
    }, 15000);

    client.setInterval(() => {
        let all = mutes.all();
        for (let i = 0; i < all.length; i++) {
            try {
                let userid = (all[i].ID).replace(/\D/g, '');
                if (!userid) continue;
                let time = mutes.fetch(`time_${userid}`);
                let guildid = mutes.fetch(`guild_${userid}`);
                let guild = client.guilds.get(guildid);
                let member;
                if (guild) {
                    member = guild.members.get(userid);
                }
                if (!member) continue;
                let muteRole = member.guild.roles.find(r => r.name === config.muteRole);
                if (!muteRole) continue;

                async function remove() {
                    await member.removeRole(muteRole);
                    mutes.delete(`time_${userid}`);
                    mutes.delete(`guild_${userid}`);
                };
                if (time <= Date.now()) {
                    remove();
                };
            } catch (e) {

            }
        };
    }, 5000);

});
//--Бот запущен

//Реакция на сообщения
client.on('message', async message => {

    if (message.author.id == config.banid) return;
    if (!message.guild.me.hasPermission('SEND_MESSAGES')) return;
    if (message.guild.name != 'Discord Bot List') console.log(`${message.author.id} || ${message.guild.id} ||${message.guild.name} | ${message.channel.id} | ${message.channel.name} | [${message.author.tag}] | ${message.content}`);
    let clientvmsgs = clientstats.fetch('viewMessages');
    if (clientvmsgs === null) clientstats.set('viewMessages', 0);
    clientvmsgs = null;
    let clientsmsgs = clientstats.fetch('viewMessages');
    if (clientsmsgs === null) clientstats.set('sendMessages', 0);
    clientsmsgs = null;
    if (message.author.id == client.user.id) clientstats.add('sendMessages', 1);
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    //--Реакция на сообщения

    //Профиль
    client.sendcur = async function (usr, msg) {
        let usrz = await client.users.get(`${usr}`);
        if (usrz) await usrz.send(msg);
        usrz = null;
    };

    let userid = message.author.id;
    let guildid = message.guild.id;

    let coins = profile.fetch(`coins_${userid}`);
    if (coins === null) profile.set(`coins_${userid}`, 0);

    let lvl = profile.fetch(`lvl_${userid}`);
    if (lvl === null) profile.set(`lvl_${userid}`, 1);

    let xp = profile.fetch(`xp_${userid}`);
    if (xp === null) profile.set(`xp_${userid}`, 0);

    let bonustime = profile.fetch(`bonustime_${userid}`);
    if (bonustime === null) profile.set(`bonustime_${userid}`, 0);
    bonustime = null;

    let rep = profile.fetch(`rep_${userid}`);
    if (rep === null) profile.set(`rep_${userid}`, 0);
    rep = null;

    let messages = profile.fetch(`messages_${userid}`);
    if (messages === null) profile.set(`messages_${userid}`, 0);

    let admin = profile.fetch(`admin_${userid}`);
    if (admin === null) profile.set(`admin_${userid}`, 0);
    admin = null;

    let likes = profile.fetch(`likes_${userid}`);
    if (likes === null) profile.set(`likes_${userid}`, 0);
    likes = null;

    let liked = profile.fetch(`liked_${userid}`);
    if (liked === null) profile.set(`liked_${userid}`, ['']);
    liked = null;

    let marks = profile.fetch(`marks_${userid}`);
    if (marks === null) profile.set(`marks_${userid}`, '🐴');

    let clan = profile.fetch(`clan_${userid}`);
    let partner = profile.fetch(`partner_${userid}`);
    if (userid == config.dev) profile.set(`admin_${userid}`, 1);

    let work = profile.fetch(`work_${userid}`);
    if (work === null) profile.set(`work_${userid}`, 0);
    work = null;

    let workCooldown = profile.fetch(`workCooldown_${userid}`);
    if (workCooldown === null) profile.set(`workCooldown_${userid}`, 0);
    workCooldown = null;

    let worked = profile.fetch(`worked_${userid}`);
    if (worked === null) profile.set(`worked_${userid}`, 0);
    let voted = profile.fetch(`voted_${userid}`);
    if (voted === null) profile.set(`voted_${userid}`, 0);
    let votes = profile.fetch(`votes_${userid}`);
    if (votes === null) profile.set(`votes_${userid}`, 0);
    worked = null;


    //--Профиль

    //Локальный профиль
    let lcoins = lprofile.fetch(`coins_${userid}_${guildid}`);
    if (lcoins === null) lprofile.set(`coins_${userid}_${guildid}`, 1);
    lcoins = null;

    let lwarns = lprofile.fetch(`warns_${userid}_${guildid}`);
    if (lwarns === null) lprofile.set(`warns_${userid}_${guildid}`, 0);
    lwarns = null;

    client.profile.add(`coins_${userid}`, 1);
    client.lprofile.add(`coins_${userid}_${guildid}`, 1);
    client.profile.add(`xp_${userid}`, 1);
    client.profile.add(`messages_${userid}`, 1);
    client.clientstats.add('viewMessages', 1);
    if (clan != null) client.clan.add(`${clan}_messages`, 1);
    clan = null;
    if (xp > (Math.floor(lvl * 3.4))) {
        profile.set(`xp_${userid}`, 0);
        profile.add(`lvl_${userid}`, 1);
    }
    xp = null;

    let cmdchannel = guild_$.fetch(`cmdchannel_${guildid}`);
    let blockInvites = guild_$.fetch(`blockInvites_${guildid}`);
    let lang = guild_$.fetch(`lang_${guildid}`);
    if (lang === null) guild_$.set(`lang_${guildid}`, 'en');
    client.lang = lang;
    //--Локальный профиль

    //Список работ
    worklist = eval('`' + require(`./lang_${lang}.json`).economy.worklist + '`').split('<>');
    client.worklist = [{
            name: worklist[0],
            addCoins: 100,
            works: 5
        },
        {
            name: worklist[1],
            addCoins: 500,
            works: 15
        },
        {
            name: worklist[2],
            addCoins: 3000,
            works: 30
        },
        {
            name: worklist[3],
            addCoins: 5000,
            works: 55
        },
        {
            name: worklist[4],
            addCoins: 8500,
            works: 80
        },
        {
            name: worklist[5],
            addCoins: 15000,
            works: 110
        },
        {
            name: worklist[6],
            addCoins: 30000,
            works: 150
        },
        {
            name: worklist[7],
            addCoins: 50000,
            works: 200
        },
        {
            name: worklist[8],
            addCoins: 120000,
            works: 290
        },
        {
            name: worklist[9],
            addCoins: 300000,
            works: 400
        },
        {
            name: worklist[10],
            addCoins: 500000,
            works: 600
        },
        {
            name: worklist[11],
            addCoins: 750000,
            works: 1000
        }
    ];
    //--Список работ

    //Проголосовал
    /*
    let atag = message.author.tag;
    dbl.hasVoted(`${message.author.id}`).then(async voteds => {
        if (voteds) {
            if (voted <= Date.now()) {
                console.log(`${atag} проголосовал`);
                let msg = `${require('./lang_${lang}.json').other.thxvote}`;
                client.profile.add(`rep_${userid}`, 1);
                client.profile.add(`votes_${userid}`, 1);
                client.profile.set(`voted_${userid}`, Date.now() + 1000 * 60 * 60 * 12);
                client.sendcur(`${userid}`, msg);
            };
        };
    });
    */
    //--Проголосовал

    //Значки
    if (marks) {
        function addMark(mark) {
            client.profile.set(`marks_${message.author.id}`, `${marks} ${mark}`);
            msgs = eval('`' + require(`./lang_${lang}.json`).info.marks + '`').split('<>');
            let ntf = eval('`' + require(`./lang_${lang}.json`).other.ntf + '`');
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTitle(`**${msgs[0]}**`)
                .setColor('RANDOM')
                .setDescription(`${message.author} ${msgs[24]} ${mark}`)
                .setFooter(ntf, client.user.avatarURL)
                .setTimestamp();
            message.channel.send(embed);
        }
        if (!marks.includes('🦄') && lvl >= 100) await addMark('🦄');
        if (!marks.includes('🙉') && lvl >= 999) await addMark('🙉');
        if (!marks.includes('🗞') && messages >= 1000) await addMark('🗞');
        if (!marks.includes('📨') && messages >= 25000) await addMark('📨');
        if (!marks.includes('💵') && coins >= 25000) await addMark('💵');
        if (!marks.includes('💴') && coins >= 100000) await addMark('💴');
        if (!marks.includes('💰') && coins >= 25000000) await addMark('💰');
        if (!marks.includes('💳') && coins >= 1000000000) await addMark('💳');
        if (!marks.includes('💎') && coins < 0) addMark('💎');
        if (!marks.includes('💒') && partner) addMark('💒');
        if (!marks.includes('🏳️‍🌈') && (message.content.toLowerCase() == 'я гей' || message.content.toLowerCase() == 'i gay')) addMark('🏳️‍🌈');
        if (!marks.includes('💥') && (message.content.toLowerCase() == 'я люблю лисичек' || message.content.toLowerCase() == 'i love chanterelles')) addMark('💥');
        if (marks.indexOf('undefined') != -1) {
            client.profile.delete(`marks_${message.author.id}`);
        };
        embed = null;
        ntf = null;
        msgs = null;
    };
    marks = null;
    coins = null;
    lvl = null;
    messages = null;
    partner = null;
    //--Значки

    //Блокировка приглашений
    if (blockInvites == true) {
        let logschannel = message.guild.channels.get(client.guild.fetch(`logsChannel_${message.guild.id}`));
        if (!logschannel) {
            await message.guild.createChannel('logs', 'text').then(channel => {
                client.guild.set(`logsChannel_${message.guild.id}`, channel.id);
                channel.overwritePermissions(message.guild.defaultRole, {
                    VIEW_CHANNEL: false,
                });
            });
        };
        let role = message.guild.roles.find(r => r.name === config.muteRole);

        if (!role) {
            role = await message.guild.createRole({
                name: config.muteRole,
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        };

        if (message.content.indexOf('discord.gg') != -1 || message.content.indexOf('discordapp.com/invite') != -1) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) {
                message.delete().then(() => {
                    let msgs = eval('`' + require(`./lang_${lang}.json`).moderation.blockInvites + '`').split('<>');
                    let ntf = eval('`' + require(`./lang_${lang}.json`).other.ntf + '`');
                    let embed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle(`**${msgs[0]}**`)
                        .setDescription(`${message.author}\n${message.content}`)
                        .setFooter(`${message.author.tag} ${msgs[2]} 18 ${msgs[3]}`)
                        .setFooter(ntf, client.user.avatarURL)
                        .setTimestamp();
                    client.mutes.set(`guild_${message.author.id}`, message.guild.id);
                    client.mutes.set(`time_${message.author.id}`, Date.now() + 1000 * 60 * 60 * 18);
                    message.member.addRole(role);
                    role = null;
                    logschannel.send(embed)
                    logschannel = null;
                    embed = null;
                    msgs = null;
                    ntf = null;
                });
            };
        };
    };
    blockInvites = null;
    //--Блокировка приглашений

    //Канал для команд
    let messageArray = message.content.split(' ');
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;
    if (client.channels.get(cmdchannel)) {
        if (message.member) {
            if (!message.member.hasPermission('MANAGE_MESSAGES')) {
                let msgs = eval('`' + require(`./lang_${lang}.json`).moderation.blockInvites + '`').split('<>');
                let ntf = eval('`' + require(`./lang_${lang}.json`).other.ntf + '`');
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setColor(config.color.red)
                    .setFooter(ntf, client.user.avatarURL)
                    .setTimestamp();
                if (message.channel != client.channels.get(cmdchannel)) {
                    message.delete(5 * 1000);
                    embed.setDescription(`${msgs[4]} <#${cmdchannel}>`);
                    return message.channel.send(embed).then(msg => msg.delete(5 * 1000));;
                }
                msgs = null;
                ntf = null;
                embed = null;
            };
        };
    };
    //--Канал для команд

    cmdch = null;
    userid = null;
    clientvmsgs = null;
    clientsmsgs = null;
    guildid = null;
    let cmd = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));
    if (cmd) cmd.run(client, message, args).catch(err => {
        if (err) {
            message.channel.send(err[0]);
        };
    });
});

client.on('presenceUpdate', async (oldMember, newMember) => {
    try {
        if (!newMember.guild.me.hasPermission('MANAGE_ROLES')) return;
        if (newMember.user.bot) return;
        if (false) return;
        async function ifGame(name, roleName, color) {
            if (newMember.presence.game) {
                if (newMember.presence.game.name.toLowerCase().indexOf(name.toLowerCase()) != -1) {
                    let role = newMember.guild.roles.find(r => r.name === roleName)
                    if (role) {
                        if (!newMember.roles.has(role)) {
                            await newMember.addRole(role);
                        }
                    } else {
                        role = await newMember.guild.createRole({
                            name: roleName,
                            color: color,
                            mentionable: true,
                            permissions: []
                        });
                        if (!newMember.roles.has(role)) {
                            await newMember.addRole(role);
                        };
                    };
                };
            };
        };

        ifGame('dota 2', 'Dota 2', '#A52A2A');
        ifGame('PLAYERUNKNOWN\'S BATTLEGROUNDS', 'PUBG', '#E7A200');
        ifGame('minecraft', 'Minecraft', '#90EE90');
        ifGame('payday', 'Pay Day 2', '#339DF8');
        ifGame('fortnite', 'Fortnite', '#DA7FEB');
        ifGame('osu', 'Osu!', '#F38AEC');
        ifGame('rocket league', 'Rocket League', '#3399CC');
        ifGame('Grand Theft Auto', 'Grand Theft Auto', '#FEBE5B');
        ifGame('terraria', 'Terraria', '#90EE90');
        ifGame('Counter-Strike: Global Offensive', 'CS:GO', '#FDAC24');
        ifGame('League of legend', 'League Of Legends', '#FCE252');
        ifGame('Garry\'s Mod', 'Garry\'s mod', '#1294F1');
        ifGame('overwatch', 'Overwatch', '#FA9C21');
        ifGame('portal 2', 'Portal 2', '#00ACE6');
        ifGame('don\'t starve', 'Don\'t Starve', '#983A17');
        ifGame('sublime text', 'Code', '#35A6F0');
        ifGame('visual studio', 'Code', '#35A6F0');
        ifGame('notepad++', 'Code', '#35A6F0');
        ifGame('vimeworld.ru', 'Minecraft', '#90EE90');
        ifGame('roblox', 'Roblox', '#E2221A');
        ifGame('pubg lite', 'PUBG', '#E7A200');
        ifGame('witcher', 'Witcher', '#91192E');
        ifGame('fallout', 'Fallout', '#9B9C55');
        ifGame('trove', 'Trove', '#FFE106');
        ifGame('team fortress', 'Team Fortress', '#C7913B');
        ifGame('arma', 'Arma', '#495B3F');
        ifGame('starcraft', 'StarCraft', '#063E72');
        ifGame('apex', 'Apex', '#CF3134');
        ifGame('half-life', 'Half-Life', '#FD7302');
        ifGame('rust', 'Rust', '#CD422A');
        ifGame('paladins', 'Paladins', '#76F7F3');
        newMember = null;
        oldMember = null;
    } catch (err) {
        err = null;
    };

});

client.on('guildMemberAdd', (member) => {
    if (!member.guild.me.hasPermission('MANAGE_ROLES')) return;
    let guildid = member.guild.id;
    let msgs = eval('`' + require(`./lang_${lang}.json`).moderation.joinleave + '`').split('<>');
    let ejoin = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`**${msgs[2]}**`)
        .setDescription(`**${member.user.tag}** ${msgs[3]}`)
        .setColor(config.color.green)
        .setFooter(`${msgs[6]} ${member.guild.memberCount}`)
        .setTimestamp();
    let joinChannel = client.channels.get(client.guild.fetch(`joinleave_${guildid}`))
    if (joinChannel) joinChannel.send(ejoin);

    let role = member.guild.roles.get(client.guild.fetch(`autorole_${guildid}`));
    let muteRole = member.guild.roles.find(r => r.name === config.muteRole);
    let muted = client.mutes.fetch(`guild_${member.id}`);
    if (muted && muteRole) member.addRole(muteRole);
    if (member.id == config.dev) return;

    let wmsg = client.guild.fetch(`welcomemessage_${guildid}`);
    if (wmsg) member.send(wmsg);
    if (role) member.addRole(role);

    let totalUsers = guild_$.fetch(`totalUsers_${guildid}`);
    let totalBots = guild_$.fetch(`totalBots_${guildid}`);
    let users = client.channels.get(totalUsers);
    let bots = client.channels.get(totalBots);
    if (users && bots) {
        users.setName(`🤹 Кол-во юзеров: ${member.guild.memberCount}`).catch(err => {
            if (err) {
                member.guild.defaultChannel.send(`Произошла ошибка в **${prefix}serverstats**.\nНапишите команду **${prefix}serverstats** для устранения ошибки!`);
            };
        });
        bots.setName(`🤖 Всего ботов: ${member.guild.members.filter(m => m.user.bot).size}`).catch(err => {
            if (err) {
                member.guild.defaultChannel.send(`Произошла ошибка в **${prefix}serverstats**.\nНапишите команду **${prefix}serverstats** для устранения ошибки!`);
            };
        });
    };
    guildid, ejoin, joinChannel, role, muteRole, muted, wmsg, totalUsers, totalBots, users, bots, msgs, createstats = null;
});

client.on('guildMemberRemove', (member) => {
    if (!member.guild.me.hasPermission('MANAGE_ROLES')) return;
    if (member.id == config.dev) return;
    let guildid = member.guild.id;
    let msgs = eval('`' + require(`./lang_${lang}.json`).moderation.joinleave + '`').split('<>');
    let ejoin = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`**${msgs[4]}**`)
        .setDescription(`**${member.user.tag}** ${msgs[5]}`)
        .setColor(config.color.red)
        .setFooter(`${msgs[6]} ${member.guild.memberCount}`);
    let joinChannel = client.channels.get(client.guild.fetch(`joinleave_${guildid}`));
    if (joinChannel) joinChannel.send(ejoin);
    let totalUsers = guild_$.fetch(`totalUsers_${guildid}`);
    let totalBots = guild_$.fetch(`totalBots_${guildid}`);
    let users = client.channels.get(totalUsers);
    let bots = client.channels.get(totalBots);
    if (users && bots) {
        users.setName(`🤹 Кол-во юзеров: ${member.guild.memberCount}`).catch(err => {
            if (err) {
                member.guild.defaultChannel.send(`Произошла ошибка в **${prefix}serverstats**.\nНапишите команду **${prefix}serverstats** для устранения ошибки!`);
            };
        });
        bots.setName(`🤖 Всего ботов: ${member.guild.members.filter(m => m.user.bot).size}`).catch(err => {
            if (err) {
                member.guild.defaultChannel.send(`Произошла ошибка в **${prefix}serverstats**.\nНапишите команду **${prefix}serverstats** для устранения ошибки!`);
            };
        });
    };
    guildid, ejoin, joinChannel, totalUsers, totalBots, users, bots, msgs, createstats = null;
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (!newMember.guild.me.hasPermission('MANAGE_CHANNELS')) return;
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    let guildid = newMember.guild.id || oldMember.guild.id;
    let vOnlineId = guild_$.fetch(`voiceOnline_${guildid}`);
    let vOnlineText = guild_$.fetch(`voiceOnlineText_${guildid}`);
    let chv = client.channels.get(vOnlineId);
    if (chv) {
        if (newUserChannel && !oldUserChannel) {
            chv.setName(`${vOnlineText} ${newMember.guild.members.filter(m => m.voiceChannel).size}`).catch(err => err);
        };
        if (!newUserChannel && oldUserChannel) {
            chv.setName(`${vOnlineText} ${newMember.guild.members.filter(m => m.voiceChannel).size}`).catch(err => err);
        };
    };
    let bb = client.guild.fetch(`roomCreator_${guildid}`);
    client.bb = bb;
    let ch = client.channels.get(client.guild.fetch(`roomCreator_${guildid}`));
    client.ch = ch;
    if (newMember.voiceChannel && ch && newMember.voiceChannel.id == ch.id) {
        newMember.guild.createChannel(`${newMember.displayName} Room`, {
            type: 'voice'
        }).catch(err => err).then(channel => {
            deleteEmptyChannelAfterDelay(channel);
            channel.setParent(ch.parentID)
                .catch(err => err);
            newMember.setVoiceChannel(channel)
                .catch(err => err);
            channel.setUserLimit(5)
                .catch(err => err);
            channel.overwritePermissions(newMember, {
                MANAGE_CHANNELS: true
            });
        });
        if (!ch.parentID) ch.delete();
    };
    deleteEmptyChannelAfterDelay(oldMember.voiceChannel);
    newUserChannel, oldUserChannel, guildid, vOnlineId, vOnlineText, chv = null;
    return null;
});

function deleteEmptyChannelAfterDelay(voiceChannel, delay = 300) {
    if (!voiceChannel) return;
    if (!voiceChannel.health) voiceChannel.health = 0;
    voiceChannel.health += 1;
    setTimeout(function () {
        if (!voiceChannel) return;
        if (voiceChannel.members.first()) return;
        if (voiceChannel.health >= 2) voiceChannel.health = 1;
        if (client.bb === null) return;
        voiceChannel.health -= 1;
        if (voiceChannel.health > 0) return;
        if (!client.ch) return;
        if (client.ch && voiceChannel.id == client.ch.id) return;
        if (client.ch && voiceChannel.parentID != client.ch.parentID) return;
        voiceChannel.delete()
            .catch(err => err);
    }, delay);
};

function err(err) {
    let config = require('../config.json');
    let a = client.users.get(config.dev);
    let errEmb = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`${err[0]}`)
        .setColor(config.color.red)
        .addField(`**${err.name}**`, `**${err.message}**`)
        .setFooter(`${err[1]} ${a.tag}`, client.user.avatarURL)
        .setTimestamp();
    message.channel.send(errEmb);
    console.log(err.stack);
};

client.login(process.env.DISCORDTOKEN);