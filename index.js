//основні компоненти що поставляються діскордом
const Discord = require("discord.js");
const teo = new Discord.Client();

const fs = require("fs");
//секретний ключ
const token = require("./token.json");
//зберігає останні данні про користувача і його повідомлення
let lastInfo = require("./lastInfo.json");
//зберіграє нібр реплік для спілкування та взаємодії
let dictionary = require(".ua/dictionary.json"); 

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


    console.log(`test 1 ${lastInfo[user.id]!=null}`);
    console.log(`test 2 ${message.createdTimestamp-lastInfo[user.id].time<=60000}`);
    console.log(`test 3 ${lastInfo[user.id].answer != ""}`);
    if(lastInfo[user.id] 
        && lastInfo[user.id].answer != "" 
        && message.createdTimestamp-lastInfo[user.id].time<=2400000){
        //targetSend.send(`Минулий раз користувач з id ${user.id}(${user.username}) сказав ${lastInfo[user.id].message}`);

        if(dictionary[lastInfo[user.id].answer] && dictionary[lastInfo[user.id].answer].indexOf(message.content.toLowerCase())<0){
            answers = dictionary[lastInfo[user.id].answer];
            console.log(answers);
        }else{
            answers = []
            console.log("NEW");
        }
        answers.push(message.content.toLowerCase());
        dictionary[lastInfo[user.id].answer]= answers;
        fs.writeFile("./dictionary.json", JSON.stringify(dictionary), (err) => {
            if (err) console.error(err)
        });
    }
    let answer 
    console.log(dictionary[message.content.toLowerCase()]);
    if(dictionary[message.content.toLowerCase()]){
        console.log(dictionary);
        answers = dictionary[message.content.toLowerCase()];
        let r=Math.floor((Math.random(1) * answers.length));
        answer = answers[r];
        targetSend.send(answer);
    }

    lastInfo[user.id]={"message" : message.content, "time" : message.createdTimestamp, "answer": answer };
    fs.writeFile("./lastInfo.json", JSON.stringify(lastInfo), (err) => {
        if (err) console.error(err)
    });
    console.log(lastInfo);
    //targetSend.send(`Користувач з id ${user.id}(${user.username}) сказав ${message.content}`);
    
    //targetSend.send("Вітаю! Я Тео.");

}); 

teo.login(token)