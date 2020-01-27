const Discord = require('discord.js');
const bot = new Discord.Client();
new Discord.RichEmbed();
const newUsers = new Discord.Collection();
const config = require("./config.json")
//const guildMember = message.member;


bot.on('ready', () => {
  bot.user.setActivity('Being Legit~')
})

bot.on('ready', () => {
  console.log('Being Legit');
});



bot.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);


  let args = message.content.split(" ").slice(1);

  var mutedrole = message.guild.roles.find("name", "Muted");


//commands.



if (command === "ping") {
    message.channel.send("pong");
}

//if (command === "role") {
//  guildMember.addRole('bot-added-role');");
//}


if (command === "embed") {
    message.channel.send({embed: {
  color: 15413919,
  description: args.join(" ")
}});
}

if (command === "help") {
  message.channel.send(" \n **Info:** \n  Prefix= ! \n \n **Regular Commands:** \n  ping = Pong \n embed = Embeds any text \n dev = The maker of the bot \n \n **Admin Commands:** \n kick = Kicks user \n ban = bans user \n mute= Mutes user\n ")
}

if (command === "dev") {
    message.channel.send({embed: {
    color: 7506394,
    author: {
    name: "Bot Builders",
    icon_url: bot.user.avatarURL
},
 fields: [
      {
        name: "Bot Dev",
        value: " <@478026812048408581>",
      },

   //   {
   //     name: "other contributers",
   //     value: "",
       ],
    timestamp: new Date(),
    footer: {
      name: "",
      text: "",
    }
  }
});
}
//admin
if(command === "kick") {
    if(!message.member.roles.some(r=>["Administrator", "Head Admin", "perms", "Owner"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please @ a member of the server!");
    if(!member.kickable)
      return message.reply("Unable to kick, Check Roles and Permissions");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please Give A Reason");

     member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

if(command === "ban") {

    if(!message.member.roles.some(r=>["Administrator", "Moderator", "perms", "Admin"].includes(r.name)) )
      return message.reply("Must have the role: Admin, Mod, Administrator, perms, or Moderator");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please @ a member of the server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");

     member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }


  if (command == "mute") { // creates the command mute
         if (!message.member.roles.some(r=>["."].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
         var mutedmember = message.mentions.members.first();
         if (!mutedmember) return message.reply("Please mention a valid member of this server!")
         if (mutedmember.hasPermission("ADMINISTRATOR")) return message.reply("I cannot mute this member!")
         var mutereasondelete = 10 + mutedmember.user.id.length
         var mutereason = message.content.substring(mutereasondelete).split(" ");
         var mutereason = mutereason.join(" ");
         if (!mutereason) return message.reply("Please indicate a reason for the mute!")
         mutedmember.addRole(mutedrole)
             .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`));
         message.reply(`${mutedmember.user} has been muted by ${message.author} because: ${mutereason}`);
     }

     if (command == "unmute") { // creates the command unmute
         if (!message.member.roles.some(r=>["."].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
         var unmutedmember = message.mentions.members.first();
         if (!unmutedmember) return message.reply("Please mention a valid member of this server!")
         unmutedmember.removeRole(mutedrole)
             .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`));
         message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`);
     }





});

bot.login(config.token);
