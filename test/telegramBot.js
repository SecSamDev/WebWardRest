const {TelegramBot} = require('../ww_libraries/telegram-notifier/telegram-bot')

var myBot = new TelegramBot("","");
myBot.getMe().then(()=>{
    console.log(myBot)
    
    myBot.getChatId().then((mss)=>{
        myBot.sendMessage("Hi all").then((mss)=>{
            console.log(mss)
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.error(err)
    })
}).catch(err=>{
    console.error(err)
})