//основні компоненти що поставляються діскордом
const Discord = require("discord.js");
const teo = new Discord.Client();
//секретний ключ
const token = require("./token.json");

//реакція на запуск 
teo.on("ready", async()=>{
    console.log("Вітаю майстер!");
    //console.log(teo);
    console.log(`Я ${teo.user.username} слідкую за ${teo.guilds.size} гільдіями `);
});

//реакція на повідомлення 
teo.on("message", message => {
    //якщо повідомлення від бота подальша взаємодія непотрібна
    if (message.author.bot) return ;

    //визначаємо з ким і де будемо спілкуватись (з користувачем на каналі чи в приватних повідомленнях)
    let targetSend = message.guild?message.channel:message.author;

    targetSend.send("Вітаю! Я Тео.");

}); 

teo.login(token)