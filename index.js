const Discord = require("discord.js");
const teo = new Discord.Client();
const token = require("./token.json");

teo.on("ready", async()=>{
console.log("Вітаю майстер!");
//console.log(teo);
console.log(`Я ${teo.user.username} слідкую за ${teo.guilds.size} гільдіями `);
});

teo.login(token)