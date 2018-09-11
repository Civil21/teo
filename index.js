//основні компоненти що поставляються діскордом
const Discord = require("discord.js");
const teo = new Discord.Client();

const fs = require("fs");
//секретний ключ
const token = require("./token.json");
//управління режимом навчання
let teach = false;
//зберігає останні данні про користувача і його повідомлення
let lastInfo = require("./lastInfo.json");
//зберіграє нібр реплік для спілкування та взаємодії
let local = "./ru/dictionary.json";
let dictionary = require(local); 

//реакція на запуск 
teo.on("ready", async()=>{
    console.log("Вітаю майстер!");
    //console.log(teo);
    console.log(`Я ${teo.user.username} слідкую за ${teo.guilds.size} гільдіями `);
    console.log(`У мене ${teo.users.size} друзів`);
});

//реакція на повідомлення 
teo.on("message", message => {
    //console.log("New message");
    //якщо повідомлення від бота подальша взаємодія непотрібна
    if (message.author.bot) return ;

    //визначаємо з ким будемо спілкуватись
    let user = message.author;
    //визначаємо де будемо спілкуватись (на каналі чи в приватних повідомленнях)
    let targetSend = message.guild?message.channel:user;

    if (message.content.startsWith("Тео")){
        let args = message.content.toLowerCase().split(" ");
        switch(args[1]){
            case "повинен":
                switch(args[2]){
                    case "вчитись":
                        teach = true;
                        targetSend.send("Тео буде!!");
                    break;
                }
            break;
            case "не":
                switch(args[2]){
                    case "повинен" :
                        switch(args[3]){
                            case "вчитись":
                                teach = false;
                                targetSend.send("Тео не буде!!");
                            break;
                        }
                    break;
                }
            break;
        }
        return;
    }
    //обробка тексту для аналізу та зберігання 
    let content=message.content.toLowerCase();
    /*
    console.log(`test 1 ${lastInfo[user.id]!=null}`);
    console.log(`test 2 ${message.createdTimestamp-lastInfo[user.id].time<=60000}`);
    console.log(`test 3 ${lastInfo[user.id].answer != ""}`);
    */
    
    if(lastInfo[user.id]&&teach)
    if(lastInfo[user.id].answer != "" && message.createdTimestamp-lastInfo[user.id].time<=2400000){
        //targetSend.send(`Минулий раз користувач з id ${user.id}(${user.username}) сказав ${lastInfo[user.id].message}`);

        if(dictionary[lastInfo[user.id].answer] && dictionary[lastInfo[user.id].answer].indexOf(content)<0){
            answers = dictionary[lastInfo[user.id].answer];
            //console.log(answers);
        }else{
            answers = []
            //console.log("NEW");
        }
        answers.push(content);
        dictionary[lastInfo[user.id].answer]= answers;
        fs.writeFile(local, JSON.stringify(dictionary), (err) => {
            if (err) console.error(err)
        });
    }
    let answer 
    //console.log(dictionary[content]);
    if(dictionary[content]){
        //console.log(dictionary);
        answers = dictionary[content];
        let r=Math.floor((Math.random(1) * answers.length));
        answer = answers[r];
        targetSend.send(message.author.username+" "+answer);
    }

    lastInfo[user.id]={"time" : message.createdTimestamp, "answer": answer };
    fs.writeFile("./lastInfo.json", JSON.stringify(lastInfo), (err) => {
        if (err) console.error(err)
    });

    //console.log(lastInfo);
    //targetSend.send(`Користувач з id ${user.id}(${user.username}) сказав ${content}`);

    //targetSend.send("Вітаю! Я Тео.");
}); 

teo.login(token)