//основні компоненти що поставляються діскордом
const Discord = require("discord.js");
const teo = new Discord.Client();

const fs = require("fs");
//секретний ключ
const token = require("./token.json");
//зберігає останні данні про користувача і його повідомлення
let lastInfo = require("./lastInfo.json");

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

    //визначаємо з ким будемо спілкуватись
    let user = message.author;
    //визначаємо де будемо спілкуватись (на каналі чи в приватних повідомленнях)
    let targetSend = message.guild?message.channel:user;

    if(lastInfo[user.id]){
        targetSend.send(`Минулий раз користувач з id ${user.id}(${user.username}) сказав ${lastInfo[user.id].message}`);
    }
    lastInfo[user.id]={"message" : message.content};
    fs.writeFile("./lastInfo.json", JSON.stringify(lastInfo), (err) => {
        if (err) console.error(err)
    });
    console.log(lastInfo);
    targetSend.send(`Користувач з id ${user.id}(${user.username}) сказав ${message.content}`);
    
    //targetSend.send("Вітаю! Я Тео.");

}); 

teo.login(token)